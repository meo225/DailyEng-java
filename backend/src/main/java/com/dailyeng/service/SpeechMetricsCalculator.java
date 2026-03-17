package com.dailyeng.service;

import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Speech metrics calculator for pronunciation, fluency, and intonation scoring.
 * Ports scoring logic from speaking.ts lines 744-1009.
 *
 * <p>Scoring is based on:
 * <ul>
 *   <li>Fluency: WPM (words per minute) + pause penalty</li>
 *   <li>Pronunciation: Web Speech API confidence scores (or estimated from fluency)</li>
 *   <li>Intonation: Pitch variance from audio analysis</li>
 * </ul>
 */
@Component
public class SpeechMetricsCalculator {

    /**
     * Calculate fluency score from WPM and pause data.
     * Target WPM: 120-150 for fluent English.
     *
     * @return 0-100 score
     */
    public int calculateFluencyScore(int wordCount, long speakingDurationMs, int pauseCount) {
        if (wordCount <= 0 || speakingDurationMs <= 0) return 0;

        double wpm = (wordCount / (double) speakingDurationMs) * 60000.0;

        // WPM score: optimal at 120-150, decreases outside 80-180 range
        double wpmScore = 100.0;
        if (wpm < 80) {
            wpmScore = Math.max(0, 40 + (wpm / 80.0) * 60);
        } else if (wpm > 180) {
            wpmScore = Math.max(0, 100 - (wpm - 180) * 0.8);
        }

        // Pause penalty: -7 points per pause beyond the first
        int pausePenalty = Math.max(0, (pauseCount - 1) * 7);

        return (int) Math.round(Math.max(0, Math.min(100, wpmScore - pausePenalty)));
    }

    /**
     * Calculate pronunciation score from confidence scores.
     * Falls back to estimation from fluency if no confidence data.
     *
     * @return 0-100 score
     */
    public int calculatePronunciationScore(List<Double> confidenceScores, int fluencyScore,
                                           int wordCount, long speakingDurationMs) {
        // Filter out zero/invalid confidence values
        var validConfidences = confidenceScores != null
                ? confidenceScores.stream().filter(c -> c > 0).toList()
                : List.<Double>of();

        if (!validConfidences.isEmpty()) {
            double avgConfidence = validConfidences.stream()
                    .mapToDouble(Double::doubleValue).average().orElse(0);
            return (int) Math.round(avgConfidence * 100);
        }

        // Estimate from fluency when Chrome doesn't return confidence
        double wpm = speakingDurationMs > 0
                ? (wordCount / (double) speakingDurationMs) * 60000.0 : 0;

        if (wpm >= 80 && wpm <= 180) {
            return (int) Math.round(65 + (fluencyScore / 100.0) * 20); // 65-85 range
        } else {
            return (int) Math.round(55 + (fluencyScore / 100.0) * 20); // 55-75 range
        }
    }

    /**
     * Calculate intonation score from pitch variance.
     * Higher variance = more expressive speech = better intonation.
     *
     * @return 0-100 score
     */
    public int calculateIntonationScore(Double pitchVariance) {
        if (pitchVariance == null || pitchVariance <= 0) return 65; // Default fallback

        if (pitchVariance < 15) {
            return 45 + (int) Math.round(pitchVariance);           // 45-60
        } else if (pitchVariance < 30) {
            return 60 + (int) Math.round((pitchVariance - 15) * 0.8);  // 60-72
        } else if (pitchVariance < 50) {
            return 72 + (int) Math.round((pitchVariance - 30) * 0.65); // 72-85
        } else if (pitchVariance < 70) {
            return 85 + (int) Math.round((pitchVariance - 50) * 0.35); // 85-92
        } else {
            return Math.min(92, 85 + (int) Math.round((pitchVariance - 50) * 0.35));
        }
    }

    /**
     * Calculate overall score as average of 5 criteria.
     */
    public int calculateOverallScore(int grammar, int relevance, int fluency,
                                     int pronunciation, int intonation) {
        return Math.round((grammar + relevance + fluency + pronunciation + intonation) / 5.0f);
    }
}
