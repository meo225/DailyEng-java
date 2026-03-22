package com.dailyeng.dto.srs;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

/**
 * All SRS (Spaced Repetition System) DTOs as Java 21 records.
 */
public final class SrsDtos {

    private SrsDtos() {}

    // ============================== Requests ==============================

    public record ReviewRequest(
            @NotBlank String vocabItemId,
            @Min(1) @Max(4) int rating
    ) {}

    // ============================== Responses ==============================

    public record ReviewResponse(
            String nextReviewDate,
            int intervalDays,
            double stability,
            double difficulty,
            double retrievability,
            int masteryLevel,
            String srsState,
            int xpAwarded
    ) {}

    public record DueItemResponse(
            String vocabItemId,
            String word,
            String meaning,
            String pronunciation,
            String partOfSpeech,
            String exampleSentence,
            double retrievability,
            long daysSinceReview,
            int masteryLevel,
            String srsState
    ) {}

    public record ReviewStatsResponse(
            int dueToday,
            int dueThisWeek,
            int totalReviewed,
            int masteredCount,
            double retentionRate,
            int newCount
    ) {}

    public record StudySessionResponse(
            List<DueItemResponse> items,
            int newCount,
            int reviewCount,
            int totalCount
    ) {}
}
