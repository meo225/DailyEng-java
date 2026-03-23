package com.dailyeng.controller;

import com.dailyeng.dto.speaking.SpeakingDtos.*;
import com.dailyeng.service.AudioConversionService;
import com.dailyeng.service.AzureSpeechService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * REST controller for Azure Speech operations (STT, TTS, pronunciation assessment).
 * Extracted from SpeakingController for Single Responsibility.
 */
@Slf4j
@RestController
@RequestMapping("/speaking/speech")
@RequiredArgsConstructor
public class SpeechController extends BaseController {

    private final AzureSpeechService azureSpeechService;
    private final AudioConversionService audioConversionService;

    /** POST /speaking/speech/transcribe — Transcribe audio to text */
    @PostMapping("/transcribe")
    public ResponseEntity<AzureSpeechService.TranscriptionResult> transcribeAudio(
            @RequestParam("audio") MultipartFile audioFile
    ) {
        requireUserId();
        try {
            log.info("🎤 STT Request: contentType={}, filename={}, size={} bytes",
                    audioFile.getContentType(), audioFile.getOriginalFilename(), audioFile.getSize());

            byte[] wavBytes = audioConversionService.convertToWav(audioFile.getBytes());
            log.info("🎤 Converted to WAV: {} bytes", wavBytes.length);

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
     * POST /speaking/speech/transcribe-assess — Transcribe + Pronunciation Assessment.
     * Scripted (with referenceText) or unscripted (without).
     */
    @PostMapping("/transcribe-assess")
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

            byte[] wavBytes = audioConversionService.convertToWav(audioFile.getBytes());

            var pronResult = isScripted
                    ? azureSpeechService.assessPronunciation(wavBytes, referenceText)
                    : azureSpeechService.assessPronunciationUnscripted(wavBytes);

            if (pronResult.recognizedText() == null || pronResult.recognizedText().isBlank()) {
                log.info("🎤 Transcribe+Assess: no speech detected");
                return ResponseEntity.ok(new TranscribeAssessResponse(
                        "", 0, 0, 0, 0, 0, List.of()));
            }

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

            log.info("🎤 Transcribe+Assess OK: accuracy={}, fluency={}, overall={}",
                    pronResult.accuracyScore(), pronResult.fluencyScore(), pronResult.overallScore());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("🎤 Transcribe+Assess Error: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /** POST /speaking/speech/synthesize — Text to speech */
    @PostMapping("/synthesize")
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

    /** POST /speaking/speech/pronunciation — Pronunciation assessment (SDK) */
    @PostMapping("/pronunciation")
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
            log.error("🎤 Pronunciation Error: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /** GET /speaking/speech/voices — List available TTS voices */
    @GetMapping("/voices")
    public ResponseEntity<?> listVoices() {
        return ResponseEntity.ok(azureSpeechService.listVoices());
    }
}
