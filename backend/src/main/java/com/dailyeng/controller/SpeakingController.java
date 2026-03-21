package com.dailyeng.controller;

import com.dailyeng.dto.speaking.SpeakingDtos.*;
import com.dailyeng.service.AzureSpeechService;
import com.dailyeng.service.SpeakingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * REST controller for the Speaking module — 15 endpoints.
 * Maps from speaking.ts Server Actions to REST API.
 */
@Slf4j
@RestController
@RequestMapping("/speaking")
@RequiredArgsConstructor
public class SpeakingController extends BaseController {

    private final SpeakingService speakingService;
    private final AzureSpeechService azureSpeechService;

    // ======================== Topic Groups ========================

    /** GET /speaking/topic-groups — getSpeakingTopicGroups() */
    @GetMapping("/topic-groups")
    public ResponseEntity<List<TopicGroupResponse>> getTopicGroups() {
        return ResponseEntity.ok(speakingService.getTopicGroups());
    }

    // ======================== Scenarios ========================

    /** GET /speaking/scenarios — getSpeakingScenariosWithProgress() */
    @GetMapping("/scenarios")
    public ResponseEntity<ScenarioListResponse> getScenarios(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) List<String> levels,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit
    ) {
        var userId = extractUserId();
        return ResponseEntity.ok(speakingService.getScenariosWithProgress(
                userId, category, subcategory, levels, page, limit));
    }

    /** GET /speaking/scenarios/search — searchSpeakingScenarios() */
    @GetMapping("/scenarios/search")
    public ResponseEntity<List<ScenarioListItem>> searchScenarios(@RequestParam String q) {
        return ResponseEntity.ok(speakingService.searchScenarios(q));
    }

    /** GET /speaking/scenarios/{id} — getScenarioById() */
    @GetMapping("/scenarios/{id}")
    public ResponseEntity<ScenarioDetailResponse> getScenario(@PathVariable String id) {
        return ResponseEntity.ok(speakingService.getScenarioById(id));
    }

    /** DELETE /speaking/scenarios/{id} — deleteCustomScenario() */
    @DeleteMapping("/scenarios/{id}")
    public ResponseEntity<Void> deleteScenario(@PathVariable String id) {
        var userId = requireUserId();
        speakingService.deleteCustomScenario(id, userId);
        return ResponseEntity.noContent().build();
    }

    /** POST /speaking/scenarios/custom — createCustomScenario() */
    @PostMapping("/scenarios/custom")
    public ResponseEntity<CustomScenarioResponse> createCustomScenario(
            @RequestBody CreateCustomScenarioRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.createCustomScenario(userId, req.topicPrompt()));
    }

    /** POST /speaking/scenarios/random — createRandomScenario() */
    @PostMapping("/scenarios/random")
    public ResponseEntity<CustomScenarioResponse> createRandomScenario() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.createRandomScenario(userId));
    }

    /** POST /speaking/scenarios/free-talk — createFreeTalkScenario() */
    @PostMapping("/scenarios/free-talk")
    public ResponseEntity<CustomScenarioResponse> createFreeTalkScenario() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.createFreeTalkScenario(userId));
    }

    // ======================== Sessions ========================

    /** POST /speaking/sessions — startSessionWithGreeting() */
    @PostMapping("/sessions")
    public ResponseEntity<SessionStartResponse> startSession(
            @RequestBody StartSessionRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.startSession(userId, req.scenarioId()));
    }

    /** POST /speaking/sessions/{id}/turns — submitTurn() */
    @PostMapping("/sessions/{id}/turns")
    public ResponseEntity<SubmitTurnResponse> submitTurn(
            @PathVariable String id,
            @RequestBody SubmitTurnRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.submitTurn(userId, id, req));
    }

    /** POST /speaking/sessions/{id}/end — analyzeAndScoreSession() */
    @PostMapping("/sessions/{id}/end")
    public ResponseEntity<SessionAnalysisResponse> endSession(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.analyzeAndScoreSession(userId, id));
    }

    /** POST /speaking/sessions/{id}/hint — generate a sample response hint */
    @PostMapping("/sessions/{id}/hint")
    public ResponseEntity<Map<String, String>> getHint(@PathVariable String id) {
        var userId = requireUserId();
        var hint = speakingService.generateHint(userId, id);
        return ResponseEntity.ok(Map.of("hint", hint));
    }

    /** GET /speaking/sessions/{id} — getSessionDetailsById() */
    @GetMapping("/sessions/{id}")
    public ResponseEntity<SessionDetailResponse> getSessionDetails(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getSessionDetails(userId, id));
    }

    /** DELETE /speaking/sessions/{id} — deleteSession() */
    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        var userId = requireUserId();
        speakingService.deleteSession(id, userId);
        return ResponseEntity.noContent().build();
    }

    // ======================== History ========================

    /** GET /speaking/history — getUserSpeakingHistory() */
    @GetMapping("/history")
    public ResponseEntity<HistoryResponse> getHistory() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getUserHistory(userId));
    }

    /** GET /speaking/history/sessions — getSpeakingHistorySessions() */
    @GetMapping("/history/sessions")
    public ResponseEntity<HistorySessionsResponse> getHistorySessions(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String rating
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getHistorySessions(userId, page, limit, rating));
    }

    /** GET /speaking/history/stats — getSpeakingHistoryStats() */
    @GetMapping("/history/stats")
    public ResponseEntity<HistoryStatsResponse> getHistoryStats() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getHistoryStats(userId));
    }

    // ======================== Custom Topics ========================

    /** GET /speaking/custom-topics — getCustomTopics() */
    @GetMapping("/custom-topics")
    public ResponseEntity<List<ScenarioListItem>> getCustomTopics() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getCustomTopics(userId));
    }

    // ======================== Learning Records ========================

    /** GET /speaking/scenarios/{id}/records — getLearningRecordsForScenario() */
    @GetMapping("/scenarios/{id}/records")
    public ResponseEntity<List<LearningRecordItem>> getLearningRecords(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getLearningRecords(userId, id));
    }

    // ======================== Bookmarks ========================

    /** POST /speaking/bookmarks/toggle — toggleSpeakingBookmark() */
    @PostMapping("/bookmarks/toggle")
    public ResponseEntity<ToggleBookmarkResponse> toggleBookmark(
            @RequestBody ToggleBookmarkRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.toggleBookmark(userId, req.scenarioId()));
    }

    /** GET /speaking/bookmarks — getSpeakingBookmarks() */
    @GetMapping("/bookmarks")
    public ResponseEntity<BookmarkListResponse> getBookmarks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int limit
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getBookmarks(userId, page, limit));
    }

    /** GET /speaking/bookmarks/ids — getSpeakingBookmarkIds() */
    @GetMapping("/bookmarks/ids")
    public ResponseEntity<List<String>> getBookmarkIds() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getBookmarkIds(userId));
    }

    // ======================== Speech (Azure STT/TTS) ========================

    /** POST /speaking/speech/transcribe — Transcribe audio to text */
    @PostMapping("/speech/transcribe")
    public ResponseEntity<AzureSpeechService.TranscriptionResult> transcribeAudio(
            @RequestParam("audio") MultipartFile audioFile
    ) {
        requireUserId();
        try {
            var contentType = audioFile.getContentType();
            var originalFilename = audioFile.getOriginalFilename();
            var size = audioFile.getSize();

            log.info("🎤 STT Request: contentType={}, filename={}, size={} bytes",
                    contentType, originalFilename, size);

            // Always convert to WAV PCM 16kHz mono via ffmpeg (handles WebM, OGG, etc.)
            byte[] wavBytes = convertToWav(audioFile.getBytes());
            log.info("🎤 Converted to WAV: {} bytes", wavBytes.length);

            // Use Azure Speech SDK (higher accuracy than REST API)
            var result = azureSpeechService.transcribeSdk(wavBytes);

            log.info("🎤 STT Result: text='{}', confidence={}, status={}",
                    result.text(), result.confidence(), result.status());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("🎤 STT Error: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * POST /speaking/speech/transcribe-assess — Transcribe + Pronunciation Assessment in one call.
     * Supports both scripted (with referenceText) and unscripted (without) modes.
     * - Scripted: uses Azure Speech SDK scripted assessment → includes CompletenessScore, Omission/Insertion errors
     * - Unscripted: uses Azure Speech SDK unscripted assessment → no CompletenessScore, 4 error types
     */
    @PostMapping("/speech/transcribe-assess")
    public ResponseEntity<TranscribeAssessResponse> transcribeAndAssess(
            @RequestParam("audio") MultipartFile audioFile,
            @RequestParam(value = "referenceText", required = false) String referenceText
    ) {
        requireUserId();
        boolean isScripted = referenceText != null && !referenceText.isBlank();
        try {
            log.info("🎤 Transcribe+Assess [{}]: contentType={}, size={} bytes",
                    isScripted ? "scripted" : "unscripted",
                    audioFile.getContentType(), audioFile.getSize());

            // Convert to WAV PCM 16kHz mono
            byte[] wavBytes = convertToWav(audioFile.getBytes());

            // Run scripted or unscripted pronunciation assessment
            var pronResult = isScripted
                    ? azureSpeechService.assessPronunciation(wavBytes, referenceText)
                    : azureSpeechService.assessPronunciationUnscripted(wavBytes);

            if (pronResult.recognizedText() == null || pronResult.recognizedText().isBlank()) {
                log.info("🎤 Transcribe+Assess: no speech detected");
                return ResponseEntity.ok(new TranscribeAssessResponse(
                        "", 0, 0, 0, 0, 0, List.of()));
            }

            // Map per-word results to simplified response
            var wordResults = pronResult.words().stream()
                    .map(w -> new WordAssessResult(
                            w.word(),
                            w.accuracyScore(),
                            w.errorType(),
                            w.phonemes().stream()
                                    .map(p -> new PhonemeResult(p.phoneme(), p.accuracyScore()))
                                    .toList(),
                            w.syllables() != null ? w.syllables().stream()
                                    .map(s -> new SyllableResult(s.syllable(), s.accuracyScore()))
                                    .toList() : List.of()))
                    .toList();

            var response = new TranscribeAssessResponse(
                    pronResult.recognizedText(),
                    pronResult.accuracyScore(),
                    pronResult.fluencyScore(),
                    pronResult.prosodyScore(),
                    pronResult.overallScore(),
                    pronResult.completenessScore(),
                    wordResults);

            log.info("🎤 Transcribe+Assess OK [{}]: text='{}', accuracy={}, fluency={}, prosody={}, completeness={}, overall={}",
                    isScripted ? "scripted" : "unscripted",
                    pronResult.recognizedText(),
                    pronResult.accuracyScore(), pronResult.fluencyScore(),
                    pronResult.prosodyScore(), pronResult.completenessScore(),
                    pronResult.overallScore());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("🎤 Transcribe+Assess Error: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /** Response DTO for combined transcribe + pronunciation assessment. */
    public record TranscribeAssessResponse(
            String text,
            double accuracyScore,
            double fluencyScore,
            double prosodyScore,
            double overallScore,
            double completenessScore,
            List<WordAssessResult> words
    ) {}

    /** Per-word pronunciation result with IPA phonemes. */
    public record WordAssessResult(
            String word,
            double accuracyScore,
            String errorType,  // None, Mispronunciation, UnexpectedBreak, MissingBreak, Monotone
            List<PhonemeResult> phonemes,
            List<SyllableResult> syllables
    ) {}

    /** Per-phoneme IPA result. */
    public record PhonemeResult(
            String phoneme,       // IPA symbol, e.g. "θ", "ɛ"
            double accuracyScore
    ) {}

    /** Per-syllable result. */
    public record SyllableResult(
            String syllable,
            double accuracyScore
    ) {}

    /**
     * Convert any audio format to WAV PCM 16kHz mono via ffmpeg.
     * This ensures Azure STT always gets a format it can decode.
     *
     * Safeguards:
     * - Rejects uploads larger than 20 MB
     * - Enforces a 30-second timeout on ffmpeg
     * - Provides a clear error when ffmpeg is not installed
     */
    private static final int MAX_AUDIO_BYTES = 20 * 1024 * 1024; // 20 MB
    private static final long FFMPEG_TIMEOUT_SECONDS = 30L;

    private byte[] convertToWav(byte[] inputAudio) throws java.io.IOException, InterruptedException {
        if (inputAudio == null || inputAudio.length == 0) {
            throw new java.io.IOException("Input audio is empty.");
        }
        if (inputAudio.length > MAX_AUDIO_BYTES) {
            throw new java.io.IOException("Input audio is too large; maximum supported size is 20 MB.");
        }

        // Write input to temp file
        var inputFile = java.io.File.createTempFile("stt_input_", ".audio");
        var outputFile = java.io.File.createTempFile("stt_output_", ".wav");
        try {
            java.nio.file.Files.write(inputFile.toPath(), inputAudio);

            // ffmpeg: convert to WAV PCM 16kHz mono (Azure STT optimal format)
            Process process;
            try {
                process = new ProcessBuilder(
                        "ffmpeg", "-y",
                        "-i", inputFile.getAbsolutePath(),
                        "-ar", "16000",     // 16kHz sample rate
                        "-ac", "1",         // mono
                        "-f", "wav",        // WAV format
                        outputFile.getAbsolutePath()
                )
                        .redirectErrorStream(true)
                        .start();
            } catch (java.io.IOException e) {
                throw new java.io.IOException(
                        "Failed to execute ffmpeg. Ensure ffmpeg is installed and available on the system PATH.", e);
            }

            // Read ffmpeg output for debugging
            var ffmpegOutput = new String(process.getInputStream().readAllBytes());

            // Enforce timeout to avoid hanging conversions
            boolean finished = process.waitFor(FFMPEG_TIMEOUT_SECONDS, java.util.concurrent.TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                throw new java.io.IOException("ffmpeg conversion timed out after " + FFMPEG_TIMEOUT_SECONDS + " seconds.");
            }

            var exitCode = process.exitValue();
            if (exitCode != 0) {
                log.error("🎤 ffmpeg failed (exit {}): {}", exitCode, ffmpegOutput);
                throw new java.io.IOException("ffmpeg conversion failed with exit code " + exitCode);
            }

            return java.nio.file.Files.readAllBytes(outputFile.toPath());
        } finally {
            inputFile.delete();
            outputFile.delete();
        }
    }

    /** POST /speaking/speech/synthesize — Text to speech */
    @PostMapping("/speech/synthesize")
    public ResponseEntity<byte[]> synthesizeSpeech(@RequestBody Map<String, String> body) {
        var text = body.get("text");
        var voice = body.getOrDefault("voice", null);
        if (text == null || text.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        var audioBytes = azureSpeechService.synthesize(text, voice);
        if (audioBytes.length == 0) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "audio/ogg")
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"speech.ogg\"")
                .body(audioBytes);
    }

    /** POST /speaking/speech/pronunciation — Pronunciation assessment (SDK)
     *  With referenceText → scripted (reading), without → unscripted (free speaking) */
    @PostMapping("/speech/pronunciation")
    public ResponseEntity<AzureSpeechService.PronunciationResult> assessPronunciation(
            @RequestParam("audio") MultipartFile audioFile,
            @RequestParam(value = "referenceText", required = false) String referenceText
    ) {
        requireUserId();
        try {
            AzureSpeechService.PronunciationResult result;
            if (referenceText != null && !referenceText.isBlank()) {
                result = azureSpeechService.assessPronunciation(audioFile.getBytes(), referenceText);
            } else {
                result = azureSpeechService.assessPronunciationUnscripted(audioFile.getBytes());
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /** GET /speaking/speech/voices — List available TTS voices */
    @GetMapping("/speech/voices")
    public ResponseEntity<?> listVoices() {
        return ResponseEntity.ok(azureSpeechService.listVoices());
    }

}
