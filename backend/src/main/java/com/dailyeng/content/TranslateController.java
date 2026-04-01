package com.dailyeng.content;

import com.dailyeng.ai.AzureTranslatorService;
import com.dailyeng.ai.AzureTranslatorService.TranslationResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * REST controller for text translation using Azure Translator.
 * Public endpoint — no authentication required.
 */
@Slf4j
@RestController
@RequestMapping("/translate")
@RequiredArgsConstructor
public class TranslateController {

    private final AzureTranslatorService translatorService;

    /**
     * Translate text between languages.
     *
     * @param request { text: string, from?: string, to: string }
     * @return { translatedText, detectedLanguage, targetLanguage }
     */
    @PostMapping
    public ResponseEntity<?> translate(@RequestBody Map<String, String> request) {
        var text = request.get("text");
        var from = request.get("from");
        var to = request.get("to");

        if (text == null || text.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Text is required"));
        }
        if (to == null || to.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Target language (to) is required"));
        }

        // 🛡️ Sentinel: Prevent Memory Exhaustion / DoS from massive language codes
        if ((from != null && from.length() > 50) || to.length() > 50) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Language code exceeds maximum length of 50 characters"));
        }

        if (text.length() > 5000) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Text exceeds maximum length of 5000 characters"));
        }

        TranslationResult result = translatorService.translate(text, from, to);

        if (result.isEmpty()) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "Translation service unavailable"));
        }

        return ResponseEntity.ok(Map.of(
                "translatedText", result.translatedText(),
                "targetLanguage", result.targetLanguage(),
                "detectedLanguage", result.detectedLanguage() != null ? result.detectedLanguage() : ""
        ));
    }
}
