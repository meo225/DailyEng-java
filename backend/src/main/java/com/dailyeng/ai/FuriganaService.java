package com.dailyeng.ai;

import com.atilika.kuromoji.ipadic.Token;
import com.atilika.kuromoji.ipadic.Tokenizer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

/**
 * Annotates Japanese text with furigana using Kuromoji morphological analyzer.
 * Produces [Kanji](reading) format that the frontend FuriganaText component renders as ruby tags.
 */
@Service
@Slf4j
public class FuriganaService {

    private static final Tokenizer tokenizer = new Tokenizer();

    /** Regex to detect if a string contains at least one kanji character (CJK Unified Ideographs) */
    private static final Pattern KANJI_PATTERN = Pattern.compile("[\\u4E00-\\u9FFF\\u3400-\\u4DBF]");

    /** Regex to detect if a string is entirely katakana (no kanji) */
    private static final Pattern ALL_KATAKANA = Pattern.compile("^[\\u30A0-\\u30FF]+$");

    /**
     * Annotates kanji in the given Japanese text with furigana readings.
     * Example: "駅はここからまっすぐ行って右に曲がります" →
     *          "[駅](えき)はここからまっすぐ[行](い)って[右](みぎ)に[曲](ま)がります"
     *
     * Only kanji-containing tokens are annotated. Hiragana, katakana, and punctuation are left as-is.
     * Okurigana (trailing hiragana in a kanji word) is handled by comparing the surface form
     * with the reading to extract only the kanji portion's reading.
     */
    public String annotate(String text) {
        if (text == null || text.isBlank()) return text;

        List<Token> tokens = tokenizer.tokenize(text);
        var sb = new StringBuilder();

        for (Token token : tokens) {
            String surface = token.getSurface();
            String reading = token.getReading();

            // If no reading available or no kanji in this token, output as-is
            if (reading == null || reading.equals("*") || !KANJI_PATTERN.matcher(surface).find()) {
                sb.append(surface);
                continue;
            }

            // If the surface is all katakana (e.g. borrowed words), skip furigana
            if (ALL_KATAKANA.matcher(surface).matches()) {
                sb.append(surface);
                continue;
            }

            // Convert katakana reading to hiragana for furigana display
            String hiraganaReading = katakanaToHiragana(reading);

            // Handle okurigana: if surface has trailing hiragana that matches reading suffix,
            // annotate only the kanji stem
            String kanjiPart = surface;
            String okurigana = "";
            String kanjiReading = hiraganaReading;

            // Find where trailing hiragana starts in the surface
            int okuriganaStart = surface.length();
            while (okuriganaStart > 0) {
                char c = surface.charAt(okuriganaStart - 1);
                if (isHiragana(c)) {
                    okuriganaStart--;
                } else {
                    break;
                }
            }

            if (okuriganaStart < surface.length() && okuriganaStart > 0) {
                okurigana = surface.substring(okuriganaStart);
                kanjiPart = surface.substring(0, okuriganaStart);

                // Try to trim the matching okurigana from the reading
                if (hiraganaReading.endsWith(okurigana)) {
                    kanjiReading = hiraganaReading.substring(0, hiraganaReading.length() - okurigana.length());
                }
            }

            // Also handle leading hiragana (e.g. お母さん)
            String leadingHiragana = "";
            int kanjiStart = 0;
            for (int i = 0; i < kanjiPart.length(); i++) {
                if (isHiragana(kanjiPart.charAt(i))) {
                    kanjiStart = i + 1;
                } else {
                    break;
                }
            }
            if (kanjiStart > 0 && kanjiStart < kanjiPart.length()) {
                leadingHiragana = kanjiPart.substring(0, kanjiStart);
                kanjiPart = kanjiPart.substring(kanjiStart);
                // Trim leading matching hiragana from reading
                if (kanjiReading.startsWith(leadingHiragana)) {
                    kanjiReading = kanjiReading.substring(leadingHiragana.length());
                }
            }

            // Build the annotated output
            sb.append(leadingHiragana);
            if (!kanjiPart.isEmpty() && !kanjiReading.isEmpty()) {
                sb.append("[").append(kanjiPart).append("](").append(kanjiReading).append(")");
            } else {
                sb.append(kanjiPart);
            }
            sb.append(okurigana);
        }

        return sb.toString();
    }

    /**
     * Annotates Japanese text only — returns text unchanged if it doesn't appear to be Japanese.
     */
    public String annotateIfJapanese(String text, String language) {
        if (!"ja".equals(language) || text == null || text.isBlank()) return text;
        return annotate(text);
    }

    /** Converts a katakana string to hiragana by shifting Unicode code points. */
    private static String katakanaToHiragana(String katakana) {
        var sb = new StringBuilder();
        for (char c : katakana.toCharArray()) {
            if (c >= '\u30A1' && c <= '\u30F6') {
                sb.append((char) (c - 0x60)); // Katakana → Hiragana offset
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    /** Checks if a character is hiragana. */
    private static boolean isHiragana(char c) {
        return c >= '\u3040' && c <= '\u309F';
    }
}
