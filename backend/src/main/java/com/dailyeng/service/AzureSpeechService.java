package com.dailyeng.service;

import com.dailyeng.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.*;
import com.microsoft.cognitiveservices.speech.PronunciationAssessmentConfig;
import com.microsoft.cognitiveservices.speech.PronunciationAssessmentGradingSystem;
import com.microsoft.cognitiveservices.speech.PronunciationAssessmentGranularity;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * Azure Speech Service — REST API for STT/TTS + SDK for Pronunciation Assessment.
 * <p>
 * STT: REST API (short audio ≤60s)
 * TTS: REST API (SSML with OGG OPUS output)
 * Pronunciation: Speech SDK with phoneme-level accuracy, prosody, and error types
 * <p>
 * Region: configured via app.azure-speech.region (japaneast).
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
    // STT — Speech-to-Text (short audio ≤60s, REST API)
    // ========================================================================

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

            var nBest = json.path("NBest");
            if (nBest.isArray() && !nBest.isEmpty()) {
                var best = nBest.get(0);
                var displayText = best.path("Display").asText("");
                var confidence = best.path("Confidence").asDouble(0.0);

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

                log.info("🎤 Azure STT: \"{}\" (confidence: {})", displayText, confidence);
                return new TranscriptionResult(displayText, confidence, words, status);
            }

            return TranscriptionResult.empty();

        } catch (Exception e) {
            log.error("Azure STT error: {}", e.getMessage(), e);
            return TranscriptionResult.empty();
        }
    }

    public TranscriptionResult transcribeWav(byte[] wavBytes) {
        return transcribe(wavBytes, "audio/wav; codecs=audio/pcm; samplerate=16000");
    }

    public TranscriptionResult transcribeOgg(byte[] oggBytes) {
        return transcribe(oggBytes, "audio/ogg; codecs=opus");
    }

    // ========================================================================
    // TTS — Text-to-Speech (REST API)
    // ========================================================================

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

    public byte[] synthesize(String text) {
        return synthesize(text, null);
    }

    // ========================================================================
    // Pronunciation Assessment — Azure Speech SDK
    // ========================================================================

    /**
     * Scripted pronunciation assessment (reading mode).
     * User reads a known reference text — gets per-word + per-phoneme accuracy.
     * Includes: AccuracyScore, FluencyScore, CompletenessScore, ProsodyScore, per-word ErrorType.
     *
     * @param wavBytes      WAV PCM 16kHz mono audio data
     * @param referenceText The text the user is supposed to read
     * @return PronunciationResult with detailed per-word and per-phoneme scores
     */
    public PronunciationResult assessPronunciation(byte[] wavBytes, String referenceText) {
        if (!enabled) return PronunciationResult.empty();

        var config = appProperties.getAzureSpeech();

        // Write audio to temp file (SDK requires file or stream input)
        File tempFile = null;
        try {
            tempFile = File.createTempFile("pron_assess_", ".wav");
            try (var fos = new FileOutputStream(tempFile)) {
                fos.write(wavBytes);
            }

            // Configure Speech SDK
            var speechConfig = SpeechConfig.fromSubscription(
                    config.getSubscriptionKey(), config.getRegion());
            speechConfig.setSpeechRecognitionLanguage(config.getSttLanguage());

            // Configure Pronunciation Assessment
            var pronConfig = new PronunciationAssessmentConfig(
                    referenceText,
                    PronunciationAssessmentGradingSystem.HundredMark,
                    PronunciationAssessmentGranularity.Phoneme,
                    true  // enableMiscue: detect omissions and insertions
            );
            pronConfig.enableProsodyAssessment();
            // Request IPA phoneme alphabet for detailed feedback
            pronConfig.setPhonemeAlphabet("IPA");

            // Configure audio input from file
            var audioConfig = AudioConfig.fromWavFileInput(tempFile.getAbsolutePath());

            // Create recognizer and apply pronunciation config
            var recognizer = new SpeechRecognizer(speechConfig, audioConfig);
            pronConfig.applyTo(recognizer);

            // Recognize
            var result = recognizer.recognizeOnceAsync().get();

            if (result.getReason() == ResultReason.RecognizedSpeech) {
                // Get the full JSON result (JRE: phoneme/word details only via JSON)
                var jsonStr = result.getProperties().getProperty(
                        PropertyId.SpeechServiceResponse_JsonResult);
                var json = objectMapper.readTree(jsonStr);

                var pronResult = parsePronunciationJson(json);

                log.info("📝 SDK Pronunciation: accuracy={}, fluency={}, completeness={}, prosody={}, overall={}",
                        pronResult.accuracyScore(), pronResult.fluencyScore(),
                        pronResult.completenessScore(), pronResult.prosodyScore(),
                        pronResult.overallScore());

                // Cleanup SDK resources
                recognizer.close();
                audioConfig.close();
                speechConfig.close();

                return pronResult;

            } else if (result.getReason() == ResultReason.NoMatch) {
                log.warn("Azure Pronunciation Assessment: no speech recognized");
                recognizer.close();
                audioConfig.close();
                speechConfig.close();
                return PronunciationResult.empty();
            } else {
                log.error("Azure Pronunciation Assessment failed: reason={}, errorDetails={}",
                        result.getReason(), result.getProperties().getProperty(
                                PropertyId.CancellationDetails_ReasonDetailedText));
                recognizer.close();
                audioConfig.close();
                speechConfig.close();
                return PronunciationResult.empty();
            }

        } catch (Exception e) {
            log.error("Azure Pronunciation Assessment SDK error: {}", e.getMessage(), e);
            return PronunciationResult.empty();
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }

    /**
     * Unscripted pronunciation assessment (free speaking mode).
     * User speaks freely — no reference text required.
     * Includes: AccuracyScore, FluencyScore, ProsodyScore (no CompletenessScore).
     *
     * @param wavBytes WAV PCM 16kHz mono audio data
     * @return PronunciationResult with per-word scores (no completeness)
     */
    public PronunciationResult assessPronunciationUnscripted(byte[] wavBytes) {
        if (!enabled) return PronunciationResult.empty();

        var config = appProperties.getAzureSpeech();

        File tempFile = null;
        try {
            tempFile = File.createTempFile("pron_assess_unscripted_", ".wav");
            try (var fos = new FileOutputStream(tempFile)) {
                fos.write(wavBytes);
            }

            var speechConfig = SpeechConfig.fromSubscription(
                    config.getSubscriptionKey(), config.getRegion());
            speechConfig.setSpeechRecognitionLanguage(config.getSttLanguage());

            // Unscripted: empty reference text
            var pronConfig = new PronunciationAssessmentConfig(
                    "",
                    PronunciationAssessmentGradingSystem.HundredMark,
                    PronunciationAssessmentGranularity.Phoneme,
                    false  // no miscue for unscripted
            );
            pronConfig.enableProsodyAssessment();
            pronConfig.setPhonemeAlphabet("IPA");

            var audioConfig = AudioConfig.fromWavFileInput(tempFile.getAbsolutePath());
            var recognizer = new SpeechRecognizer(speechConfig, audioConfig);
            pronConfig.applyTo(recognizer);

            var result = recognizer.recognizeOnceAsync().get();

            if (result.getReason() == ResultReason.RecognizedSpeech) {
                var jsonStr = result.getProperties().getProperty(
                        PropertyId.SpeechServiceResponse_JsonResult);
                var json = objectMapper.readTree(jsonStr);
                var pronResult = parsePronunciationJson(json);

                log.info("📝 SDK Unscripted Pronunciation: accuracy={}, fluency={}, prosody={}, overall={}",
                        pronResult.accuracyScore(), pronResult.fluencyScore(),
                        pronResult.prosodyScore(), pronResult.overallScore());

                recognizer.close();
                audioConfig.close();
                speechConfig.close();

                return pronResult;
            } else {
                log.warn("Azure Unscripted Assessment: reason={}", result.getReason());
                recognizer.close();
                audioConfig.close();
                speechConfig.close();
                return PronunciationResult.empty();
            }

        } catch (Exception e) {
            log.error("Azure Unscripted Assessment error: {}", e.getMessage(), e);
            return PronunciationResult.empty();
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }

    /**
     * Parse the SDK JSON result into PronunciationResult with per-word and per-phoneme detail.
     */
    private PronunciationResult parsePronunciationJson(JsonNode json) {
        var nBest = json.path("NBest");
        if (!nBest.isArray() || nBest.isEmpty()) return PronunciationResult.empty();

        var best = nBest.get(0);
        var assessment = best.path("PronunciationAssessment");

        double accuracyScore = assessment.path("AccuracyScore").asDouble(0);
        double fluencyScore = assessment.path("FluencyScore").asDouble(0);
        double completenessScore = assessment.path("CompletenessScore").asDouble(0);
        double prosodyScore = assessment.path("ProsodyScore").asDouble(0);
        double pronScore = assessment.path("PronScore").asDouble(0);

        // Per-word scores with phoneme details
        List<WordPronunciation> wordScores = new ArrayList<>();
        var wordsNode = best.path("Words");
        if (wordsNode.isArray()) {
            for (var w : wordsNode) {
                var wa = w.path("PronunciationAssessment");

                // Per-phoneme scores within each word
                List<PhonemePronunciation> phonemes = new ArrayList<>();
                var phonemesNode = w.path("Phonemes");
                if (phonemesNode.isArray()) {
                    for (var p : phonemesNode) {
                        var pa = p.path("PronunciationAssessment");
                        phonemes.add(new PhonemePronunciation(
                                p.path("Phoneme").asText(),
                                pa.path("AccuracyScore").asDouble(0),
                                pa.path("NBestPhonemes").isArray()
                                        ? parseNBestPhonemes(pa.path("NBestPhonemes"))
                                        : List.of()
                        ));
                    }
                }

                // Per-syllable info
                List<SyllablePronunciation> syllables = new ArrayList<>();
                var syllablesNode = w.path("Syllables");
                if (syllablesNode.isArray()) {
                    for (var s : syllablesNode) {
                        var sa = s.path("PronunciationAssessment");
                        syllables.add(new SyllablePronunciation(
                                s.path("Syllable").asText(),
                                sa.path("AccuracyScore").asDouble(0)
                        ));
                    }
                }

                wordScores.add(new WordPronunciation(
                        w.path("Word").asText(),
                        wa.path("AccuracyScore").asDouble(0),
                        wa.path("ErrorType").asText("None"),
                        phonemes,
                        syllables
                ));
            }
        }

        return new PronunciationResult(
                accuracyScore, fluencyScore, completenessScore, prosodyScore, pronScore,
                best.path("Display").asText(""), wordScores);
    }

    private List<NBestPhoneme> parseNBestPhonemes(JsonNode nBestNode) {
        List<NBestPhoneme> result = new ArrayList<>();
        for (var p : nBestNode) {
            result.add(new NBestPhoneme(
                    p.path("Phoneme").asText(),
                    p.path("Score").asDouble(0)
            ));
        }
        return result;
    }

    // ========================================================================
    // Voice Listing (REST API)
    // ========================================================================

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
            String text, double confidence, List<WordResult> words, String status
    ) {
        public static TranscriptionResult empty() {
            return new TranscriptionResult("", 0.0, List.of(), "NoResult");
        }
    }

    public record WordResult(String word, double confidence, long offset, long duration) {}

    /**
     * Full pronunciation assessment result with phoneme-level detail.
     */
    public record PronunciationResult(
            double accuracyScore,
            double fluencyScore,
            double completenessScore,
            double prosodyScore,
            double overallScore,
            String recognizedText,
            List<WordPronunciation> words
    ) {
        public static PronunciationResult empty() {
            return new PronunciationResult(0, 0, 0, 0, 0, "", List.of());
        }
    }

    /**
     * Per-word pronunciation detail with phonemes and syllables.
     */
    public record WordPronunciation(
            String word,
            double accuracyScore,
            String errorType,      // None, Mispronunciation, Omission, Insertion, UnexpectedBreak, MissingBreak, Monotone
            List<PhonemePronunciation> phonemes,
            List<SyllablePronunciation> syllables
    ) {}

    /**
     * Per-phoneme accuracy with alternative phoneme suggestions (IPA).
     */
    public record PhonemePronunciation(
            String phoneme,         // IPA symbol, e.g. "θ", "ɛ", "l"
            double accuracyScore,
            List<NBestPhoneme> nBestPhonemes  // What the user actually said vs expected
    ) {}

    /** Alternative phoneme candidates with confidence scores. */
    public record NBestPhoneme(String phoneme, double score) {}

    /** Per-syllable accuracy. */
    public record SyllablePronunciation(String syllable, double accuracyScore) {}

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
}
