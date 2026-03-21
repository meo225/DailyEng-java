package com.dailyeng.service;

import com.dailyeng.entity.Flashcard;
import com.dailyeng.exception.ResourceNotFoundException;
import com.dailyeng.repository.FlashcardRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link SrsService} — SM-2 spaced repetition algorithm.
 */
@ExtendWith(MockitoExtension.class)
class SrsServiceTest {

    @Mock
    private FlashcardRepository flashcardRepo;

    @InjectMocks
    private SrsService srsService;

    private static final String USER_ID = "user-123";
    private static final String CARD_ID = "card-456";

    private Flashcard createCard(int interval, double easeFactor, int repetitions) {
        var card = Flashcard.builder()
                .userId(USER_ID)
                .front("hello")
                .back("xin chào")
                .interval(interval)
                .easeFactor(easeFactor)
                .repetitions(repetitions)
                .nextReviewDate(LocalDateTime.now().minusDays(1))
                .build();
        card.setId(CARD_ID);
        return card;
    }

    // ========================================================================
    // reviewCard — SM-2 algorithm
    // ========================================================================

    @Nested
    @DisplayName("reviewCard — SM-2 algorithm")
    class ReviewCard {

        @Test
        @DisplayName("incorrect answer (quality < 3) resets repetitions and interval")
        void incorrectReset() {
            var card = createCard(6, 2.5, 5);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));
            when(flashcardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewCard(USER_ID, CARD_ID, 2);

            assertEquals(1, result.newInterval());
            assertEquals(0, result.newRepetitions());
            assertTrue(result.newEaseFactor() <= 2.5);
            verify(flashcardRepo).save(card);
        }

        @Test
        @DisplayName("first correct answer sets interval to 1 day")
        void firstCorrect() {
            var card = createCard(0, 2.5, 0);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));
            when(flashcardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewCard(USER_ID, CARD_ID, 4);

            assertEquals(1, result.newInterval());
            assertEquals(1, result.newRepetitions());
        }

        @Test
        @DisplayName("second correct answer sets interval to 3 days")
        void secondCorrect() {
            var card = createCard(1, 2.5, 1);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));
            when(flashcardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewCard(USER_ID, CARD_ID, 4);

            assertEquals(3, result.newInterval());
            assertEquals(2, result.newRepetitions());
        }

        @Test
        @DisplayName("third+ correct answer multiplies interval by ease factor")
        void thirdCorrect() {
            var card = createCard(3, 2.5, 2);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));
            when(flashcardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewCard(USER_ID, CARD_ID, 4);

            assertEquals(8, result.newInterval()); // round(3 * 2.5) = 8
            assertEquals(3, result.newRepetitions());
        }

        @Test
        @DisplayName("ease factor never goes below 1.3")
        void easeFactorFloor() {
            var card = createCard(1, 1.3, 3);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));
            when(flashcardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            // quality=0 causes max ease factor drop
            var result = srsService.reviewCard(USER_ID, CARD_ID, 0);

            assertTrue(result.newEaseFactor() >= 1.3,
                    "Ease factor should not go below 1.3, got " + result.newEaseFactor());
        }

        @Test
        @DisplayName("ease factor never exceeds 2.5")
        void easeFactorCeiling() {
            var card = createCard(3, 2.5, 3);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));
            when(flashcardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            // quality=5 is max, could push ease factor upward
            var result = srsService.reviewCard(USER_ID, CARD_ID, 5);

            assertTrue(result.newEaseFactor() <= 2.5,
                    "Ease factor should not exceed 2.5, got " + result.newEaseFactor());
        }

        @Test
        @DisplayName("throws when card not found")
        void cardNotFound() {
            when(flashcardRepo.findById("nonexistent")).thenReturn(Optional.empty());
            assertThrows(ResourceNotFoundException.class,
                    () -> srsService.reviewCard(USER_ID, "nonexistent", 4));
        }

        @Test
        @DisplayName("throws when card belongs to different user")
        void cardOwnershipMismatch() {
            var card = createCard(1, 2.5, 0);
            when(flashcardRepo.findById(CARD_ID)).thenReturn(Optional.of(card));

            assertThrows(ResourceNotFoundException.class,
                    () -> srsService.reviewCard("other-user", CARD_ID, 4));
        }
    }

    // ========================================================================
    // getCardsDue
    // ========================================================================

    @Test
    @DisplayName("getCardsDue returns due cards with count")
    void getCardsDue() {
        var card = createCard(1, 2.5, 1);
        card.setCreatedAt(LocalDateTime.now());
        when(flashcardRepo.findByUserIdAndNextReviewDateBefore(eq(USER_ID), any()))
                .thenReturn(List.of(card));

        var result = srsService.getCardsDue(USER_ID);

        assertEquals(1, result.totalDue());
        assertEquals(1, result.cards().size());
    }

    // ========================================================================
    // getReviewStats — categorization
    // ========================================================================

    @Test
    @DisplayName("getReviewStats categorizes cards: new, learning, review")
    void reviewStatsCategorization() {
        var newCard = createCard(0, 2.5, 0);       // reps=0 → new
        var learningCard = createCard(1, 2.5, 2);   // reps<3 → learning
        var reviewCard = createCard(6, 2.5, 5);     // reps>=3 → review

        when(flashcardRepo.findByUserIdAndNextReviewDateBefore(eq(USER_ID), any()))
                .thenReturn(List.of(newCard, learningCard, reviewCard));
        when(flashcardRepo.countByUserId(USER_ID)).thenReturn(10L);

        var stats = srsService.getReviewStats(USER_ID);

        assertEquals(3, stats.due());
        assertEquals(1, stats.newCards());
        assertEquals(1, stats.learning());
        assertEquals(1, stats.review());
        assertEquals(10, stats.total());
    }
}
