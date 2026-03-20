package com.dailyeng.dto.srs;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.util.List;

/**
 * All SRS (Spaced Repetition System) module DTOs as Java 21 records.
 * Compact and immutable request/response types.
 */
public final class SrsDtos {

    private SrsDtos() {}

    // ============================== Requests ==============================

    public record ReviewCardRequest(
            @Min(0) @Max(5) int quality
    ) {}

    // ============================== Responses ==============================

    public record FlashcardResponse(
            String id, String front, String back,
            String topicId, int interval, double easeFactor,
            int repetitions, String nextReviewDate, String lastReviewed,
            String createdAt
    ) {}

    public record ReviewResultResponse(
            FlashcardResponse card, int newInterval,
            double newEaseFactor, int newRepetitions
    ) {}

    public record ReviewStatsResponse(
            int due, int newCards, int learning,
            int review, int total
    ) {}

    public record DueCardsResponse(
            List<FlashcardResponse> cards, int totalDue
    ) {}
}
