package com.dailyeng.ai;

import com.dailyeng.config.AppProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Azure Translator Service — REST API v3 for text translation.
 * <p>
 * Supports translation between English and Japanese with auto-detection.
 * Endpoint: POST https://api.cognitive.microsofttranslator.com/translate?api-version=3.0
 * Auth: Ocp-Apim-Subscription-Key header.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AzureTranslatorService {

    private final AppProperties appProperties;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private boolean enabled = false;

    @PostConstruct
    void init() {
        var config = appProperties.getAzureTranslator();
        if (config.getSubscriptionKey() != null && !config.getSubscriptionKey().isBlank()) {
            enabled = true;
            log.info("Azure Translator initialized — region: {}", config.getRegion());
        } else {
            log.warn("Azure Translator disabled — AZURE_TRANSLATOR_KEY not set");
        }
    }

    /**
     * Translate text from one language to another.
     *
     * @param text the source text (max 5000 chars)
     * @param from source language code (e.g. "en", "ja") — null for auto-detect
     * @param to   target language code (e.g. "ja", "en")
     * @return TranslationResult with translated text and detected language
     */
    @CircuitBreaker(name = "azureTranslator", fallbackMethod = "translateFallback")
    @Retry(name = "azureTranslator")
    public TranslationResult translate(String text, String from, String to) {
        if (!enabled) {
            log.warn("Azure Translator not enabled — returning empty result");
            return TranslationResult.empty();
        }

        if (text == null || text.isBlank()) {
            return TranslationResult.empty();
        }

        // Truncate to Azure limit (5000 chars per request)
        if (text.length() > 5000) {
            text = text.substring(0, 5000);
        }

        var config = appProperties.getAzureTranslator();

        // Build URL with query params
        var urlBuilder = new StringBuilder(
                "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0");
        urlBuilder.append("&to=").append(to);
        if (from != null && !from.isBlank()) {
            urlBuilder.append("&from=").append(from);
        }

        try {
            // Build JSON body: [{"Text": "..."}]
            var bodyJson = objectMapper.writeValueAsString(
                    new Object[]{new TextBody(text)});

            var requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(urlBuilder.toString()))
                    .timeout(Duration.ofSeconds(15))
                    .header("Ocp-Apim-Subscription-Key", config.getSubscriptionKey())
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .header("X-ClientTraceId", UUID.randomUUID().toString())
                    .POST(HttpRequest.BodyPublishers.ofString(bodyJson));

            // Add region header if specified (required for regional endpoints)
            if (config.getRegion() != null && !config.getRegion().isBlank()) {
                requestBuilder.header("Ocp-Apim-Subscription-Region", config.getRegion());
            }

            var response = httpClient.send(requestBuilder.build(),
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Azure Translator failed — status: {}, body: {}",
                        response.statusCode(), response.body());
                return TranslationResult.empty();
            }

            // Parse response: [{"detectedLanguage":{"language":"en","score":1.0},"translations":[{"text":"...","to":"ja"}]}]
            var json = objectMapper.readTree(response.body());
            if (!json.isArray() || json.isEmpty()) {
                return TranslationResult.empty();
            }

            var firstResult = json.get(0);
            var translations = firstResult.path("translations");
            if (!translations.isArray() || translations.isEmpty()) {
                return TranslationResult.empty();
            }

            var translatedText = translations.get(0).path("text").asText("");
            var targetLang = translations.get(0).path("to").asText(to);

            // Detected language (only present when 'from' is omitted)
            String detectedLanguage = null;
            double detectionScore = 0;
            var detected = firstResult.path("detectedLanguage");
            if (!detected.isMissingNode()) {
                detectedLanguage = detected.path("language").asText(null);
                detectionScore = detected.path("score").asDouble(0);
            }

            log.info("🌐 Azure Translator: '{}' → '{}' (from={}, to={}, detected={})",
                    text.length() > 50 ? text.substring(0, 50) + "..." : text,
                    translatedText.length() > 50 ? translatedText.substring(0, 50) + "..." : translatedText,
                    from, targetLang, detectedLanguage);

            return new TranslationResult(translatedText, targetLang, detectedLanguage, detectionScore);

        } catch (Exception e) {
            log.error("Azure Translator error: {}", e.getMessage(), e);
            return TranslationResult.empty();
        }
    }

    /**
     * Translate multiple texts in a single API call.
     * Each text is translated independently (no cross-line context mixing).
     *
     * @param texts list of source texts to translate
     * @param from  source language code — null for auto-detect
     * @param to    target language code
     * @return list of translated texts (same order as input)
     */
    @CircuitBreaker(name = "azureTranslator", fallbackMethod = "translateBatchFallback")
    @Retry(name = "azureTranslator")
    public List<String> translateBatch(List<String> texts, String from, String to) {
        if (!enabled || texts == null || texts.isEmpty()) {
            return texts != null ? texts.stream().map(t -> "").toList() : List.of();
        }

        var config = appProperties.getAzureTranslator();

        var urlBuilder = new StringBuilder(
                "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0");
        urlBuilder.append("&to=").append(to);
        if (from != null && !from.isBlank()) {
            urlBuilder.append("&from=").append(from);
        }

        try {
            // Build JSON body: [{"Text": "line1"}, {"Text": "line2"}, ...]
            var bodyArray = texts.stream()
                    .map(t -> new TextBody(t != null ? t : ""))
                    .toArray();
            var bodyJson = objectMapper.writeValueAsString(bodyArray);

            var requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(urlBuilder.toString()))
                    .timeout(Duration.ofSeconds(20))
                    .header("Ocp-Apim-Subscription-Key", config.getSubscriptionKey())
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .header("X-ClientTraceId", UUID.randomUUID().toString())
                    .POST(HttpRequest.BodyPublishers.ofString(bodyJson));

            if (config.getRegion() != null && !config.getRegion().isBlank()) {
                requestBuilder.header("Ocp-Apim-Subscription-Region", config.getRegion());
            }

            var response = httpClient.send(requestBuilder.build(),
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Azure Translator batch failed — status: {}, body: {}",
                        response.statusCode(), response.body());
                return texts.stream().map(t -> "").toList();
            }

            // Parse response: [{translations:[{text:"..."}]}, {translations:[{text:"..."}]}, ...]
            var json = objectMapper.readTree(response.body());
            var results = new ArrayList<String>();
            for (int i = 0; i < json.size(); i++) {
                var translations = json.get(i).path("translations");
                if (translations.isArray() && !translations.isEmpty()) {
                    results.add(translations.get(0).path("text").asText(""));
                } else {
                    results.add("");
                }
            }

            log.info("🌐 Azure Translator batch: {} texts translated to '{}'", results.size(), to);
            return results;

        } catch (Exception e) {
            log.error("Azure Translator batch error: {}", e.getMessage(), e);
            return texts.stream().map(t -> "").toList();
        }
    }

    /**
     * Fallback for batch circuit breaker.
     */
    @SuppressWarnings("unused")
    private List<String> translateBatchFallback(List<String> texts, String from, String to, Throwable t) {
        log.warn("Azure Translator batch circuit breaker open — fallback: {}", t.getMessage());
        return texts != null ? texts.stream().map(x -> "").toList() : List.of();
    }

    /**
     * Fallback for circuit breaker.
     */
    @SuppressWarnings("unused")
    private TranslationResult translateFallback(String text, String from, String to, Throwable t) {
        log.warn("Azure Translator circuit breaker open — fallback: {}", t.getMessage());
        return TranslationResult.empty();
    }

    // ── Request body record ──

    private record TextBody(String Text) {
    }

    // ── Result record ──

    public record TranslationResult(
            String translatedText,
            String targetLanguage,
            String detectedLanguage,
            double detectionScore) {

        public static TranslationResult empty() {
            return new TranslationResult("", "", null, 0);
        }

        public boolean isEmpty() {
            return translatedText == null || translatedText.isBlank();
        }
    }
}
