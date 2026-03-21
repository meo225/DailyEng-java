package com.dailyeng.service;

import com.dailyeng.dto.srs.SrsDtos.*;
import com.dailyeng.entity.Flashcard;
import com.dailyeng.exception.ResourceNotFoundException;
import com.dailyeng.repository.FlashcardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * SRS (Spaced Repetition System) service — manages flashcard review scheduling.
 * Uses the SM-2 algorithm for spaced repetition intervals.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SrsService {

    /** Minimum ease factor to prevent intervals from shrinking too aggressively. */
    private static final double MIN_EASE_FACTOR = 1.3;

    /** Maximum ease factor cap. */
    private static final double MAX_EASE_FACTOR = 2.5;

    /** Quality threshold: values below this are considered incorrect. */
    private static final int CORRECT_THRESHOLD = 3;

    /** Repetition count threshold to distinguish "learning" from "review". */
    private static final int LEARNING_REPS_THRESHOLD = 3;

    private final FlashcardRepository flashcardRepo;

    // ========================================================================
    // 1. getCardsDue — fetch cards due for review
    // ========================================================================

    @Transactional(readOnly = true)
    public DueCardsResponse getCardsDue(String userId) {
        var now = LocalDateTime.now();
        var dueCards = flashcardRepo.findByUserIdAndNextReviewDateBefore(userId, now);
        var responses = dueCards.stream().map(this::toFlashcardResponse).toList();
        log.info("📚 Found {} due cards for user {}", responses.size(), userId);
        return new DueCardsResponse(responses, responses.size());
    }

    // ========================================================================
    // 2. getAllCards — paginated list of all user flashcards
    // ========================================================================

    @Transactional(readOnly = true)
    public List<FlashcardResponse> getAllCards(String userId, int page, int limit) {
        var pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.ASC, "nextReviewDate"));
        var cardPage = flashcardRepo.findByUserId(userId, pageable);
        return cardPage.getContent().stream().map(this::toFlashcardResponse).toList();
    }

    // ========================================================================
    // 3. reviewCard — apply SM-2 algorithm and persist
    // ========================================================================

    @Transactional
    public ReviewResultResponse reviewCard(String userId, String cardId, int quality) {
        if (quality < 0 || quality > 5) {
            throw new com.dailyeng.exception.BadRequestException(
                    "Quality must be between 0 and 5, got: " + quality);
        }

        var card = flashcardRepo.findById(cardId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard not found: " + cardId));

        if (!userId.equals(card.getUserId())) {
            throw new ResourceNotFoundException("Flashcard not found: " + cardId);
        }

        int interval = card.getInterval();
        double easeFactor = card.getEaseFactor();
        int repetitions = card.getRepetitions();

        if (quality < CORRECT_THRESHOLD) {
            // Incorrect — reset progress
            interval = 1;
            repetitions = 0;
            easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
        } else {
            // Correct — advance
            repetitions += 1;
            if (repetitions == 1) {
                interval = 1;
            } else if (repetitions == 2) {
                interval = 3;
            } else {
                interval = (int) Math.round(interval * easeFactor);
            }
            // SM-2 ease factor adjustment
            easeFactor = Math.max(MIN_EASE_FACTOR,
                    easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        }

        easeFactor = Math.min(MAX_EASE_FACTOR, easeFactor);
        var nextReviewDate = LocalDateTime.now().plusDays(interval);

        // Persist updated card
        card.setInterval(interval);
        card.setEaseFactor(easeFactor);
        card.setRepetitions(repetitions);
        card.setNextReviewDate(nextReviewDate);
        card.setLastReviewed(LocalDateTime.now());
        flashcardRepo.save(card);

        log.info("📚 Reviewed card {} (quality={}): interval={} days, ef={}, reps={}",
                cardId, quality, interval, String.format("%.2f", easeFactor), repetitions);

        return new ReviewResultResponse(toFlashcardResponse(card), interval, easeFactor, repetitions);
    }

    // ========================================================================
    // 4. getReviewStats — summary statistics for user's flashcards
    // ========================================================================

    @Transactional(readOnly = true)
    public ReviewStatsResponse getReviewStats(String userId) {
        var now = LocalDateTime.now();
        var dueCards = flashcardRepo.findByUserIdAndNextReviewDateBefore(userId, now);
        long totalCards = flashcardRepo.countByUserId(userId);

        int due = dueCards.size();
        int newCards = 0;
        int learning = 0;
        int review = 0;

        for (var card : dueCards) {
            int reps = card.getRepetitions();
            if (reps == 0) {
                newCards++;
            } else if (reps < LEARNING_REPS_THRESHOLD) {
                learning++;
            } else {
                review++;
            }
        }

        return new ReviewStatsResponse(due, newCards, learning, review, (int) totalCards);
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    private FlashcardResponse toFlashcardResponse(Flashcard card) {
        return new FlashcardResponse(
                card.getId(), card.getFront(), card.getBack(),
                card.getTopicId(), card.getInterval(), card.getEaseFactor(),
                card.getRepetitions(),
                card.getNextReviewDate() != null ? card.getNextReviewDate().toString() : null,
                card.getLastReviewed() != null ? card.getLastReviewed().toString() : null,
                card.getCreatedAt() != null ? card.getCreatedAt().toString() : null);
    }
}
