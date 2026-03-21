package com.dailyeng.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link SpeechMetricsCalculator}.
 * Pure logic — no Spring context or mocks needed.
 */
class SpeechMetricsCalculatorTest {

    private SpeechMetricsCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new SpeechMetricsCalculator();
    }

    // ========================================================================
    // Fluency Score
    // ========================================================================

    @Nested
    @DisplayName("calculateFluencyScore")
    class FluencyScore {

        @Test
        @DisplayName("returns 0 when wordCount is zero")
        void zeroWords() {
            assertEquals(0, calculator.calculateFluencyScore(0, 60000, 1));
        }

        @Test
        @DisplayName("returns 0 when duration is zero")
        void zeroDuration() {
            assertEquals(0, calculator.calculateFluencyScore(10, 0, 1));
        }

        @Test
        @DisplayName("returns high score for optimal WPM (120-150 range)")
        void optimalWpm() {
            // 130 words in 60 seconds = 130 WPM (optimal range)
            int score = calculator.calculateFluencyScore(130, 60000, 1);
            assertTrue(score >= 90, "Optimal WPM should yield score >= 90, got " + score);
        }

        @Test
        @DisplayName("penalizes slow speech (< 80 WPM)")
        void slowSpeech() {
            // 50 words in 60 seconds = 50 WPM (below 80)
            int score = calculator.calculateFluencyScore(50, 60000, 1);
            assertTrue(score < 90, "Slow speech should yield lower score, got " + score);
            assertTrue(score > 0, "Slow speech should still yield positive score");
        }

        @Test
        @DisplayName("penalizes fast speech (> 180 WPM)")
        void fastSpeech() {
            // 200 words in 60 seconds = 200 WPM (above 180)
            int score = calculator.calculateFluencyScore(200, 60000, 1);
            assertTrue(score < 100, "Fast speech should be penalized, got " + score);
        }

        @Test
        @DisplayName("applies pause penalty beyond first pause")
        void pausePenalty() {
            int noPause = calculator.calculateFluencyScore(130, 60000, 1);
            int threePauses = calculator.calculateFluencyScore(130, 60000, 3);
            assertTrue(noPause > threePauses,
                    "More pauses should reduce score: noPause=" + noPause + " threePauses=" + threePauses);
        }

        @Test
        @DisplayName("score never goes below 0")
        void floorAtZero() {
            // Many pauses with slow speech
            int score = calculator.calculateFluencyScore(10, 60000, 20);
            assertTrue(score >= 0, "Score should never go below 0, got " + score);
        }
    }

    // ========================================================================
    // Pronunciation Score
    // ========================================================================

    @Nested
    @DisplayName("calculatePronunciationScore")
    class PronunciationScore {

        @Test
        @DisplayName("uses average confidence when valid scores are available")
        void withConfidenceScores() {
            var scores = List.of(0.9, 0.85, 0.8);
            int result = calculator.calculatePronunciationScore(scores, 80, 100, 60000);
            assertEquals(85, result); // avg 0.85 * 100 = 85
        }

        @Test
        @DisplayName("filters out zero confidence scores")
        void filtersZeroConfidence() {
            var scores = List.of(0.0, 0.9, 0.0, 0.8);
            int result = calculator.calculatePronunciationScore(scores, 80, 100, 60000);
            assertEquals(85, result); // avg of [0.9, 0.8] = 0.85 * 100 = 85
        }

        @Test
        @DisplayName("estimates from fluency when no confidence data (optimal WPM)")
        void estimatesFromFluencyOptimalWpm() {
            // WPM in 80-180 range: 65 + (fluency/100) * 20
            int result = calculator.calculatePronunciationScore(List.of(), 80, 120, 60000);
            assertEquals(81, result); // 65 + (80/100.0) * 20 = 81
        }

        @Test
        @DisplayName("estimates from fluency when no confidence data (non-optimal WPM)")
        void estimatesFromFluencyNonOptimalWpm() {
            // WPM outside 80-180 range: 55 + (fluency/100) * 20
            int result = calculator.calculatePronunciationScore(List.of(), 60, 50, 60000);
            assertEquals(67, result); // 55 + (60/100.0) * 20 = 67
        }

        @Test
        @DisplayName("handles null confidence list")
        void nullConfidenceList() {
            int result = calculator.calculatePronunciationScore(null, 70, 130, 60000);
            assertTrue(result > 0, "Should not crash with null list");
        }
    }

    // ========================================================================
    // Intonation Score
    // ========================================================================

    @Nested
    @DisplayName("calculateIntonationScore")
    class IntonationScore {

        @Test
        @DisplayName("returns 65 for null pitch variance")
        void nullVariance() {
            assertEquals(65, calculator.calculateIntonationScore(null));
        }

        @Test
        @DisplayName("returns 65 for zero pitch variance")
        void zeroVariance() {
            assertEquals(65, calculator.calculateIntonationScore(0.0));
        }

        @Test
        @DisplayName("low variance (< 15) yields 45-60 range")
        void lowVariance() {
            int score = calculator.calculateIntonationScore(10.0);
            assertTrue(score >= 45 && score <= 60, "Low variance should be 45-60, got " + score);
        }

        @Test
        @DisplayName("moderate variance (15-30) yields 60-72 range")
        void moderateVariance() {
            int score = calculator.calculateIntonationScore(20.0);
            assertTrue(score >= 60 && score <= 72, "Moderate variance should be 60-72, got " + score);
        }

        @Test
        @DisplayName("good variance (30-50) yields 72-85 range")
        void goodVariance() {
            int score = calculator.calculateIntonationScore(40.0);
            assertTrue(score >= 72 && score <= 85, "Good variance should be 72-85, got " + score);
        }

        @Test
        @DisplayName("high variance (50-70) yields 85-92 range")
        void highVariance() {
            int score = calculator.calculateIntonationScore(60.0);
            assertTrue(score >= 85 && score <= 92, "High variance should be 85-92, got " + score);
        }

        @Test
        @DisplayName("very high variance (≥70) is capped at 92")
        void cappedAtMax() {
            int score = calculator.calculateIntonationScore(100.0);
            assertTrue(score <= 92, "Score should be capped at 92, got " + score);
        }
    }

    // ========================================================================
    // Overall Score
    // ========================================================================

    @Nested
    @DisplayName("calculateOverallScore")
    class OverallScore {

        @Test
        @DisplayName("returns average of 5 criteria")
        void averageOfFive() {
            assertEquals(60, calculator.calculateOverallScore(50, 60, 70, 80, 40));
        }

        @Test
        @DisplayName("rounds correctly")
        void rounding() {
            // (91 + 92 + 93 + 94 + 95) / 5 = 93.0
            assertEquals(93, calculator.calculateOverallScore(91, 92, 93, 94, 95));
        }

        @Test
        @DisplayName("handles all zeros")
        void allZeros() {
            assertEquals(0, calculator.calculateOverallScore(0, 0, 0, 0, 0));
        }

        @Test
        @DisplayName("handles all perfect scores")
        void allPerfect() {
            assertEquals(100, calculator.calculateOverallScore(100, 100, 100, 100, 100));
        }
    }
}
