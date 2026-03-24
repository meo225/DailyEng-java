package com.dailyeng.srs;

import com.dailyeng.vocabulary.UserVocabProgress.SrsState;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the FSRS-4.5 algorithm — verifies the ML core math.
 */
class FsrsAlgorithmTest {

    // ========================================================================
    // Retrievability (forgetting curve)
    // ========================================================================

    @Nested
    @DisplayName("retrievability — forgetting curve")
    class Retrievability {

        @Test
        @DisplayName("is 1.0 at time zero")
        void fullRecallAtTimeZero() {
            assertEquals(1.0, FsrsAlgorithm.retrievability(5.0, 0), 0.001);
        }

        @Test
        @DisplayName("is ~0.9 at t = stability (by definition)")
        void ninetyPercentAtStability() {
            // R(S) = (1 + S / (9*S))^(-1) = (1 + 1/9)^(-1) = (10/9)^(-1) = 0.9
            assertEquals(0.9, FsrsAlgorithm.retrievability(5.0, 5.0), 0.001);
        }

        @Test
        @DisplayName("decays over time")
        void decaysOverTime() {
            double s = 3.0;
            double r1 = FsrsAlgorithm.retrievability(s, 1);
            double r5 = FsrsAlgorithm.retrievability(s, 5);
            double r30 = FsrsAlgorithm.retrievability(s, 30);
            assertTrue(r1 > r5);
            assertTrue(r5 > r30);
            assertTrue(r30 > 0);
        }

        @Test
        @DisplayName("returns 0 for zero stability")
        void zeroStability() {
            assertEquals(0.0, FsrsAlgorithm.retrievability(0, 5));
        }

        @Test
        @DisplayName("higher stability decays slower")
        void higherStabilitySlower() {
            double rLow = FsrsAlgorithm.retrievability(2.0, 10);
            double rHigh = FsrsAlgorithm.retrievability(20.0, 10);
            assertTrue(rHigh > rLow);
        }
    }

    // ========================================================================
    // Next interval
    // ========================================================================

    @Nested
    @DisplayName("nextInterval")
    class NextInterval {

        @Test
        @DisplayName("increases with stability")
        void increasesWithStability() {
            double i1 = FsrsAlgorithm.nextInterval(1.0);
            double i5 = FsrsAlgorithm.nextInterval(5.0);
            double i20 = FsrsAlgorithm.nextInterval(20.0);
            assertTrue(i1 < i5);
            assertTrue(i5 < i20);
        }

        @Test
        @DisplayName("returns 0 for zero stability")
        void zeroStabilityZeroInterval() {
            assertEquals(0, FsrsAlgorithm.nextInterval(0));
        }
    }

    // ========================================================================
    // Scheduling — new cards
    // ========================================================================

    @Nested
    @DisplayName("schedule — new card")
    class ScheduleNewCard {

        @Test
        @DisplayName("Again → LEARNING state with short interval")
        void againOnNew() {
            var result = FsrsAlgorithm.schedule(0, 5.0, 0, 1, SrsState.NEW, 0, 0);
            assertEquals(SrsState.LEARNING, result.state());
            assertTrue(result.intervalDays() >= 1);
            assertTrue(result.stability() > 0);
        }

        @Test
        @DisplayName("Good → REVIEW state with longer interval")
        void goodOnNew() {
            var result = FsrsAlgorithm.schedule(0, 5.0, 0, 3, SrsState.NEW, 0, 0);
            assertEquals(SrsState.REVIEW, result.state());
            assertTrue(result.intervalDays() >= 1);
            assertTrue(result.stability() > 1.0);
        }

        @Test
        @DisplayName("Easy → REVIEW state with highest stability")
        void easyOnNew() {
            var result = FsrsAlgorithm.schedule(0, 5.0, 0, 4, SrsState.NEW, 0, 0);
            assertEquals(SrsState.REVIEW, result.state());

            var goodResult = FsrsAlgorithm.schedule(0, 5.0, 0, 3, SrsState.NEW, 0, 0);
            assertTrue(result.stability() > goodResult.stability());
        }

        @Test
        @DisplayName("mastery delta: Again=0, Good=15, Easy=25")
        void masteryDelta() {
            assertEquals(0, FsrsAlgorithm.schedule(0, 5, 0, 1, SrsState.NEW, 0, 0).masteryDelta());
            assertEquals(15, FsrsAlgorithm.schedule(0, 5, 0, 3, SrsState.NEW, 0, 0).masteryDelta());
            assertEquals(25, FsrsAlgorithm.schedule(0, 5, 0, 4, SrsState.NEW, 0, 0).masteryDelta());
        }
    }

    // ========================================================================
    // Scheduling — existing cards
    // ========================================================================

    @Nested
    @DisplayName("schedule — existing card")
    class ScheduleExistingCard {

        @Test
        @DisplayName("Again (lapse) resets to RELEARNING, short interval")
        void lapseResetsToRelearning() {
            var result = FsrsAlgorithm.schedule(10.0, 5.0, 5.0, 1, SrsState.REVIEW, 5, 0);
            assertEquals(SrsState.RELEARNING, result.state());
            assertEquals(1, result.intervalDays());
            assertEquals(1, result.lapses());
            assertEquals(0, result.repetitions());
        }

        @Test
        @DisplayName("Good on REVIEW grows stability")
        void goodGrowsStability() {
            double origStability = 5.0;
            var result = FsrsAlgorithm.schedule(origStability, 5.0, 5.0, 3, SrsState.REVIEW, 3, 0);
            assertTrue(result.stability() > origStability, "Stability should grow after Good review");
            assertEquals(4, result.repetitions());
        }

        @Test
        @DisplayName("Easy gives longer interval than Good")
        void easyLongerThanGood() {
            var good = FsrsAlgorithm.schedule(5.0, 5.0, 5.0, 3, SrsState.REVIEW, 3, 0);
            var easy = FsrsAlgorithm.schedule(5.0, 5.0, 5.0, 4, SrsState.REVIEW, 3, 0);
            assertTrue(easy.intervalDays() >= good.intervalDays());
        }

        @Test
        @DisplayName("Hard gives shorter interval than Good")
        void hardShorterThanGood() {
            var hard = FsrsAlgorithm.schedule(5.0, 5.0, 5.0, 2, SrsState.REVIEW, 3, 0);
            var good = FsrsAlgorithm.schedule(5.0, 5.0, 5.0, 3, SrsState.REVIEW, 3, 0);
            assertTrue(hard.intervalDays() <= good.intervalDays());
        }

        @Test
        @DisplayName("difficulty stays within bounds [1, 10]")
        void difficultyBounds() {
            // Many easy ratings should lower difficulty but stay >= 1
            var result = FsrsAlgorithm.schedule(5.0, 1.5, 5.0, 4, SrsState.REVIEW, 10, 0);
            assertTrue(result.difficulty() >= 1.0);
            assertTrue(result.difficulty() <= 10.0);

            // Many again ratings should raise difficulty but stay <= 10
            var result2 = FsrsAlgorithm.schedule(5.0, 9.5, 5.0, 1, SrsState.REVIEW, 2, 5);
            assertTrue(result2.difficulty() >= 1.0);
            assertTrue(result2.difficulty() <= 10.0);
        }
    }
}
