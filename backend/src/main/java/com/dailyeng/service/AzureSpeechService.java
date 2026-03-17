package com.dailyeng.service;

import com.dailyeng.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

/**
 * Azure Speech Service — REST API integration for STT and TTS.
 * <p>
 * STT: Speech-to-Text via Azure Cognitive Services REST API (short audio ≤60s).
 * TTS: Text-to-Speech via Azure Cognitive Services REST API (SSML-based).
 * <p>
 * Uses subscription key auth. Region: configured via app.azure-speech.region.
 * Reference: @azure-speech-to-text-rest-py and @voice-ai-engine-development skills.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AzureSpeechService {

    private final AppProperties appProperties;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private boolean enabled = false;

    @PostConstruct
    void init() {
        var config = appProperties.getAzureSpeech();
        if (config.getSubscriptionKey() != null && !config.getSubscriptionKey().isBlank()) {
            enabled = true;
            log.info("Azure Speech initialized — region: {}, language: {}, voice: {}",
                    config.getRegion(), config.getSttLanguage(), config.getTtsVoice());
        } else {
            log.warn("Azure Speech disabled — AZURE_SPEECH_KEY not set");
        }
    }

    // ========================================================================
    // STT — Speech-to-Text (short audio ≤60s)
    // ========================================================================

    /**
     * Transcribe audio bytes to text using Azure STT REST API.
     *
     * @param audioBytes  Raw audio data (WAV PCM 16kHz mono recommended)
     * @param contentType Content-Type header, e.g. "audio/wav; codecs=audio/pcm; samplerate=16000"
     * @return TranscriptionResult with text, confidence, and per-word details
     */
    public TranscriptionResult transcribe(byte[] audioBytes, String contentType) {
        if (!enabled) {
            log.warn("Azure Speech not enabled — returning empty transcription");
            return TranscriptionResult.empty();
        }

        var config = appProperties.getAzureSpeech();
        var url = String.format(
                "https://%s.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=%s&format=detailed",
                config.getRegion(), config.getSttLanguage());

        try {
            var request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("Ocp-Apim-Subscription-Key", config.getSubscriptionKey())
                    .header("Content-Type", contentType)
                    .header("Accept", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofByteArray(audioBytes))
                    .build();

            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Azure STT failed — status: {}, body: {}", response.statusCode(), response.body());
                return TranscriptionResult.empty();
            }

            var json = objectMapper.readTree(response.body());
            var status = json.path("RecognitionStatus").asText();

            if (!"Success".equals(status)) {
                log.warn("Azure STT recognition status: {}", status);
                return TranscriptionResult.empty();
            }

            // Extract best result
            var nBest = json.path("NBest");
            if (nBest.isArray() && !nBest.isEmpty()) {
                var best = nBest.get(0);
                var displayText = best.path("Display").asText("");
                var confidence = best.path("Confidence").asDouble(0.0);

                // Extract per-word confidence if available
                List<WordResult> words = new ArrayList<>();
                var wordsNode = best.path("Words");
                if (wordsNode.isArray()) {
                    for (var w : wordsNode) {
                        words.add(new WordResult(
                                w.path("Word").asText(),
                                w.path("Confidence").asDouble(0.0),
                                w.path("Offset").asLong(0),
                                w.path("Duration").asLong(0)));
                    }
                }

                log.info("🎤 Azure STT: \"{}\" (confidence: {:.2f})", displayText, confidence);
                return new TranscriptionResult(displayText, confidence, words, status);
            }

            return TranscriptionResult.empty();

        } catch (Exception e) {
            log.error("Azure STT error: {}", e.getMessage(), e);
            return TranscriptionResult.empty();
        }
    }

    /**
     * Convenience: transcribe WAV PCM 16kHz mono audio.
     */
    public TranscriptionResult transcribeWav(byte[] wavBytes) {
        return transcribe(wavBytes, "audio/wav; codecs=audio/pcm; samplerate=16000");
    }

    /**
     * Convenience: transcribe OGG OPUS audio.
     */
    public TranscriptionResult transcribeOgg(byte[] oggBytes) {
        return transcribe(oggBytes, "audio/ogg; codecs=opus");
    }

    // ========================================================================
    // TTS — Text-to-Speech
    // ========================================================================

    /**
     * Synthesize speech from text using Azure TTS REST API.
     * Returns audio bytes in OGG OPUS format (smaller size for web).
     *
     * @param text      Text to synthesize
     * @param voiceName Optional voice override (null = use config default)
     * @return Audio bytes (OGG OPUS), or empty array on failure
     */
    public byte[] synthesize(String text, String voiceName) {
        if (!enabled) {
            log.warn("Azure Speech not enabled — returning empty audio");
            return new byte[0];
        }

        var config = appProperties.getAzureSpeech();
        var voice = voiceName != null ? voiceName : config.getTtsVoice();
        var url = String.format(
                "https://%s.tts.speech.microsoft.com/cognitiveservices/v1",
                config.getRegion());

        // Build SSML — Speech Synthesis Markup Language
        var ssml = String.format("""
                <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='%s'>
                    <voice name='%s'>
                        <prosody rate='0.95'>%s</prosody>
                    </voice>
                </speak>
                """, config.getSttLanguage(), voice, escapeXml(text));

        try {
            var request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("Ocp-Apim-Subscription-Key", config.getSubscriptionKey())
                    .header("Content-Type", "application/ssml+xml")
                    .header("X-Microsoft-OutputFormat", "ogg-48khz-16bit-mono-opus")
                    .header("User-Agent", "DailyEng-Java")
                    .POST(HttpRequest.BodyPublishers.ofString(ssml))
                    .build();

            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofByteArray());

            if (response.statusCode() != 200) {
                log.error("Azure TTS failed — status: {}, body length: {}",
                        response.statusCode(), response.body().length);
                return new byte[0];
            }

            log.info("🔊 Azure TTS: synthesized {} chars → {} bytes audio",
                    text.length(), response.body().length);
            return response.body();

        } catch (Exception e) {
            log.error("Azure TTS error: {}", e.getMessage(), e);
            return new byte[0];
        }
    }

    /**
     * Synthesize with default voice from config.
     */
    public byte[] synthesize(String text) {
        return synthesize(text, null);
    }

    // ========================================================================
    // Pronunciation Assessment
    // ========================================================================

    /**
     * Transcribe audio with pronunciation assessment scoring.
     * Returns detailed per-word pronunciation scores.
     *
     * @param audioBytes   Audio data (WAV PCM 16kHz mono)
     * @param referenceText The expected text to compare against
     * @return PronunciationResult with overall and per-word scores
     */
    public PronunciationResult assessPronunciation(byte[] audioBytes, String referenceText) {
        if (!enabled) {
            return PronunciationResult.empty();
        }

        var config = appProperties.getAzureSpeech();
        var url = String.format(
                "https://%s.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1" +
                "?language=%s&format=detailed",
                config.getRegion(), config.getSttLanguage());

        // Build pronunciation assessment config (Base64 encoded JSON)
        var assessmentConfig = String.format("""
                {"ReferenceText":"%s","GradingSystem":"HundredMark","Granularity":"Phoneme","Dimension":"Comprehensive"}
                """, escapeJson(referenceText)).trim();
        var assessmentHeader = java.util.Base64.getEncoder()
                .encodeToString(assessmentConfig.getBytes(java.nio.charset.StandardCharsets.UTF_8));

        try {
            var request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("Ocp-Apim-Subscription-Key", config.getSubscriptionKey())
                    .header("Content-Type", "audio/wav; codecs=audio/pcm; samplerate=16000")
                    .header("Accept", "application/json")
                    .header("Pronunciation-Assessment", assessmentHeader)
                    .POST(HttpRequest.BodyPublishers.ofByteArray(audioBytes))
                    .build();

            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Azure Pronunciation Assessment failed — status: {}", response.statusCode());
                return PronunciationResult.empty();
            }

            var json = objectMapper.readTree(response.body());
            var nBest = json.path("NBest");
            if (!nBest.isArray() || nBest.isEmpty()) {
                return PronunciationResult.empty();
            }

            var best = nBest.get(0);
            var assessment = best.path("PronunciationAssessment");

            double accuracyScore = assessment.path("AccuracyScore").asDouble(0);
            double fluencyScore = assessment.path("FluencyScore").asDouble(0);
            double completenessScore = assessment.path("CompletenessScore").asDouble(0);
            double pronScore = assessment.path("PronScore").asDouble(0);

            // Per-word scores
            List<WordPronunciation> wordScores = new ArrayList<>();
            var wordsNode = best.path("Words");
            if (wordsNode.isArray()) {
                for (var w : wordsNode) {
                    var wa = w.path("PronunciationAssessment");
                    wordScores.add(new WordPronunciation(
                            w.path("Word").asText(),
                            wa.path("AccuracyScore").asDouble(0),
                            wa.path("ErrorType").asText("None")));
                }
            }

            log.info("📝 Pronunciation: accuracy={}, fluency={}, completeness={}, overall={}",
                    accuracyScore, fluencyScore, completenessScore, pronScore);

            return new PronunciationResult(
                    accuracyScore, fluencyScore, completenessScore, pronScore,
                    best.path("Display").asText(""), wordScores);

        } catch (Exception e) {
            log.error("Azure Pronunciation Assessment error: {}", e.getMessage(), e);
            return PronunciationResult.empty();
        }
    }

    // ========================================================================
    // Voice Listing
    // ========================================================================

    /**
     * List available TTS voices for the configured region.
     */
    public JsonNode listVoices() {
        if (!enabled) return objectMapper.createArrayNode();

        var config = appProperties.getAzureSpeech();
        var url = String.format(
                "https://%s.tts.speech.microsoft.com/cognitiveservices/voices/list",
                config.getRegion());

        try {
            var request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Ocp-Apim-Subscription-Key", config.getSubscriptionKey())
                    .GET().build();
            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return objectMapper.readTree(response.body());
        } catch (Exception e) {
            log.error("Failed to list voices: {}", e.getMessage());
            return objectMapper.createArrayNode();
        }
    }

    // ========================================================================
    // DTOs
    // ========================================================================

    public record TranscriptionResult(
            String text,
            double confidence,
            List<WordResult> words,
            String status
    ) {
        public static TranscriptionResult empty() {
            return new TranscriptionResult("", 0.0, List.of(), "NoResult");
        }
    }

    public record WordResult(String word, double confidence, long offset, long duration) {}

    public record PronunciationResult(
            double accuracyScore,
            double fluencyScore,
            double completenessScore,
            double overallScore,
            String recognizedText,
            List<WordPronunciation> words
    ) {
        public static PronunciationResult empty() {
            return new PronunciationResult(0, 0, 0, 0, "", List.of());
        }
    }

    public record WordPronunciation(String word, double accuracyScore, String errorType) {}

    // ========================================================================
    // Helpers
    // ========================================================================

    private String escapeXml(String text) {
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&apos;");
    }

    private String escapeJson(String text) {
        return text.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n");
    }
}
