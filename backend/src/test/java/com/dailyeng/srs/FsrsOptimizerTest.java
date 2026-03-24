package com.dailyeng.service.srs;

import com.dailyeng.entity.ReviewLog;
import com.dailyeng.entity.UserVocabProgress.SrsState;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link FsrsOptimizer} — validates gradient descent convergence.
 */
class FsrsOptimizerTest {

    @Test
    @DisplayName("returns null when review count is below threshold")
    void insufficientReviews() {
        var reviews = generateReviews(50); // below 100 threshold
        assertNull(FsrsOptimizer.optimize(reviews));
    }

    @Test
    @DisplayName("returns null when too few non-NEW reviews")
    void insufficientNonNewReviews() {
        var reviews = new ArrayList<ReviewLog>();
        for (int i = 0; i < 120; i++) {
            var log = ReviewLog.builder()
                    .userId("u1").vocabItemId("v" + i)
                    .rating(3).elapsedDays(0)
                    .stability(0).difficulty(5)
                    .state(SrsState.NEW)
                    .build();
            log.setId("r-" + i);
            reviews.add(log);
        }
        assertNull(FsrsOptimizer.optimize(reviews));
    }

    @Test
    @DisplayName("produces valid 17-element weight array with sufficient data")
    void producesValidWeights() {
        var reviews = generateReviews(200);
        double[] weights = FsrsOptimizer.optimize(reviews);

        assertNotNull(weights, "Should return weights with sufficient reviews");
        assertEquals(17, weights.length);

        // All weights should be within bounds
        for (int i = 0; i < 17; i++) {
            assertTrue(weights[i] > 0, "Weight " + i + " should be positive");
        }
    }

    @Test
    @DisplayName("optimized weights reduce loss compared to random weights")
    void optimizedWeightsBeatRandom() {
        var reviews = generateReviews(200);
        double[] optimized = FsrsOptimizer.optimize(reviews);
        assertNotNull(optimized);

        // Random weights should have higher loss
        double[] random = new double[17];
        for (int i = 0; i < 17; i++) {
            random[i] = ThreadLocalRandom.current().nextDouble(0.5, 5.0);
        }

        double optimizedLoss = FsrsOptimizer.computeLoss(optimized, reviews);
        double randomLoss = FsrsOptimizer.computeLoss(random, reviews);

        assertTrue(optimizedLoss <= randomLoss,
                "Optimized loss (%f) should be <= random loss (%f)"
                        .formatted(optimizedLoss, randomLoss));
    }

    @Test
    @DisplayName("default weights are a valid starting point")
    void defaultWeightsValid() {
        double[] defaults = FsrsAlgorithm.getDefaultWeights();
        assertEquals(17, defaults.length);

        var reviews = generateReviews(200);
        double loss = FsrsOptimizer.computeLoss(defaults, reviews);
        assertTrue(loss >= 0, "Loss should be non-negative");
        assertTrue(Double.isFinite(loss), "Loss should be finite");
    }

    // ========================================================================
    // Helpers
    // ========================================================================

    /**
     * Generate synthetic review logs that simulate realistic learning patterns.
     */
    private List<ReviewLog> generateReviews(int count) {
        var reviews = new ArrayList<ReviewLog>();
        var rng = ThreadLocalRandom.current();

        for (int i = 0; i < count; i++) {
            double stability = rng.nextDouble(0.5, 30.0);
            double difficulty = rng.nextDouble(1.0, 10.0);
            double elapsedDays = rng.nextDouble(0.5, stability * 3);

            // Simulate realistic ratings: harder to recall → more "Again"
            double retrievability = FsrsAlgorithm.retrievability(stability, elapsedDays);
            int rating;
            if (rng.nextDouble() > retrievability) {
                rating = 1; // forgot
            } else {
                rating = rng.nextInt(2, 5); // 2, 3, or 4
            }

            var log = ReviewLog.builder()
                    .userId("u-test")
                    .vocabItemId("v-" + i)
                    .rating(rating)
                    .elapsedDays(elapsedDays)
                    .stability(stability)
                    .difficulty(difficulty)
                    .state(SrsState.REVIEW)
                    .build();
            log.setId("r-" + i);
            reviews.add(log);
        }

        return reviews;
    }
}
