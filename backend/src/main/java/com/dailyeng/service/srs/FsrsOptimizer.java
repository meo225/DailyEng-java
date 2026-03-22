package com.dailyeng.service.srs;

import com.dailyeng.entity.ReviewLog;
import com.dailyeng.entity.UserVocabProgress.SrsState;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;

/**
 * FSRS per-user weight optimizer using <b>gradient descent</b>.
 * <p>
 * Learns personalized forgetting curve parameters from a user's review
 * history by minimizing the <b>binary cross-entropy loss</b> between
 * predicted retrievability and actual recall outcome.
 * <p>
 * Loss function: {@code L = -Σ [y·log(R) + (1-y)·log(1-R)]}
 * where {@code y = 1 if rating >= 2 (recalled), 0 if rating == 1 (forgot)}
 * and {@code R = (1 + t / (9·S))^(-1)} is the predicted retrievability.
 * <p>
 * This is a pure Java implementation — no external ML libraries required.
 *
 * @see FsrsAlgorithm
 */
@Slf4j
public final class FsrsOptimizer {

    private FsrsOptimizer() {}

    /** Minimum review logs needed before optimization can run. */
    public static final int MIN_REVIEWS_FOR_OPTIMIZATION = 100;

    private static final int NUM_WEIGHTS = 17;
    private static final double LEARNING_RATE = 0.01;
    private static final int MAX_EPOCHS = 500;
    private static final double CONVERGENCE_THRESHOLD = 1e-6;
    private static final double CLIP_GRAD = 1.0;
    private static final double EPSILON = 1e-10;

    // Weight bounds to prevent divergence
    private static final double[] LOWER_BOUNDS = {
        0.01, 0.01, 0.01, 0.01, 1.0, 0.01, 0.01, 0.001, 0.01, 0.01,
        0.01, 0.01, 0.001, 0.001, 0.5, 0.0001, 0.5
    };
    private static final double[] UPPER_BOUNDS = {
        5.0, 10.0, 50.0, 200.0, 15.0, 5.0, 10.0, 1.0, 5.0, 5.0,
        5.0, 10.0, 1.0, 1.0, 10.0, 1.0, 10.0
    };

    // ========================================================================
    // Public API
    // ========================================================================

    /**
     * Optimize FSRS weights for a specific user based on their review history.
     *
     * @param reviewLogs user's review history, ordered by createdAt ascending
     * @return optimized 17-element weight array, or null if insufficient data
     */
    public static double[] optimize(List<ReviewLog> reviewLogs) {
        if (reviewLogs.size() < MIN_REVIEWS_FOR_OPTIMIZATION) {
            log.info("⏳ Insufficient reviews for optimization: {}/{}", 
                     reviewLogs.size(), MIN_REVIEWS_FOR_OPTIMIZATION);
            return null;
        }

        // Start from FSRS-4.5 defaults
        double[] weights = FsrsAlgorithm.getDefaultWeights();

        // Prepare training data
        var trainingData = reviewLogs.stream()
                .filter(r -> r.getState() != SrsState.NEW) // only non-first reviews
                .filter(r -> r.getStability() > 0)
                .toList();

        if (trainingData.size() < 50) {
            log.info("⏳ Insufficient non-new reviews for optimization: {}", trainingData.size());
            return null;
        }

        log.info("🧠 Starting FSRS optimization with {} training samples", trainingData.size());

        double prevLoss = Double.MAX_VALUE;

        for (int epoch = 0; epoch < MAX_EPOCHS; epoch++) {
            double[] gradients = new double[NUM_WEIGHTS];
            double totalLoss = 0;

            // Forward pass + loss computation
            for (var review : trainingData) {
                boolean recalled = review.getRating() >= 2;
                double predicted = predictRetrievability(
                        weights, review.getStability(), review.getElapsedDays());

                // Binary cross-entropy loss
                predicted = clamp(predicted, EPSILON, 1 - EPSILON);
                double loss = recalled
                        ? -Math.log(predicted)
                        : -Math.log(1 - predicted);
                totalLoss += loss;

                // Compute gradient (∂L/∂R · ∂R/∂weights via numerical diff)
                computeGradients(weights, review, recalled, predicted, gradients);
            }

            totalLoss /= trainingData.size();

            // Check convergence
            if (Math.abs(prevLoss - totalLoss) < CONVERGENCE_THRESHOLD) {
                log.info("✅ Optimizer converged at epoch {} with loss={}", epoch, totalLoss);
                break;
            }

            if (epoch % 100 == 0) {
                log.debug("📉 Epoch {}: loss={}", epoch, totalLoss);
            }

            // Update weights with clipped gradients
            for (int i = 0; i < NUM_WEIGHTS; i++) {
                double grad = gradients[i] / trainingData.size();
                grad = clamp(grad, -CLIP_GRAD, CLIP_GRAD);
                weights[i] -= LEARNING_RATE * grad;
                weights[i] = clamp(weights[i], LOWER_BOUNDS[i], UPPER_BOUNDS[i]);
            }

            prevLoss = totalLoss;
        }

        log.info("🧠 Optimization complete. Final loss={}", prevLoss);
        return weights;
    }

    /**
     * Compute the loss for a set of weights on review data.
     * Used for evaluation and testing.
     */
    public static double computeLoss(double[] weights, List<ReviewLog> reviews) {
        double totalLoss = 0;
        int count = 0;
        for (var review : reviews) {
            if (review.getState() == SrsState.NEW || review.getStability() <= 0) continue;
            boolean recalled = review.getRating() >= 2;
            double predicted = clamp(
                    predictRetrievability(weights, review.getStability(), review.getElapsedDays()),
                    EPSILON, 1 - EPSILON);
            totalLoss += recalled ? -Math.log(predicted) : -Math.log(1 - predicted);
            count++;
        }
        return count > 0 ? totalLoss / count : 0;
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    /**
     * Predict retrievability using given weights.
     * R(t) = (1 + t / (9 * S))^(-1), but S itself depends on weights.
     */
    private static double predictRetrievability(double[] weights, double stability, double elapsedDays) {
        if (stability <= 0) return 0;
        return Math.pow(1 + elapsedDays / (9.0 * stability), -1);
    }

    /**
     * Compute gradients for all weights using numerical differentiation.
     * ∂L/∂w_i ≈ (L(w_i + ε) - L(w_i - ε)) / (2ε)
     */
    private static void computeGradients(
            double[] weights, ReviewLog review, boolean recalled,
            double currentPred, double[] gradients
    ) {
        double delta = 1e-5;
        for (int i = 0; i < NUM_WEIGHTS; i++) {
            double origWeight = weights[i];

            // Perturb forward
            weights[i] = origWeight + delta;
            double predPlus = clamp(
                    predictWithUpdatedStability(weights, review),
                    EPSILON, 1 - EPSILON);
            double lossPlus = recalled ? -Math.log(predPlus) : -Math.log(1 - predPlus);

            // Perturb backward
            weights[i] = origWeight - delta;
            double predMinus = clamp(
                    predictWithUpdatedStability(weights, review),
                    EPSILON, 1 - EPSILON);
            double lossMinus = recalled ? -Math.log(predMinus) : -Math.log(1 - predMinus);

            // Central difference
            gradients[i] += (lossPlus - lossMinus) / (2 * delta);

            // Restore
            weights[i] = origWeight;
        }
    }

    /**
     * Simulate what retrievability would be if the card's stability were
     * recalculated using the given weights at review time.
     */
    private static double predictWithUpdatedStability(double[] weights, ReviewLog review) {
        double stability = review.getStability();
        double difficulty = review.getDifficulty();
        double elapsedDays = review.getElapsedDays();
        int rating = review.getRating();

        // Recalculate what the stability would have been entering this review
        // using the current weight estimates
        double retrievability = predictRetrievability(weights, stability, elapsedDays);

        if (rating == 1) {
            // Lapse formula with weights
            double newStab = Math.max(weights[13],
                    weights[10] * Math.pow(difficulty, -weights[11])
                              * (Math.pow(stability + 1, weights[12]) - 1)
                              * Math.exp(weights[13]));
            return predictRetrievability(weights, newStab, 0);
        }

        // Success formula with weights
        double hardPenalty = (rating == 2) ? weights[14] : 1.0;
        double easyBonus = (rating == 4) ? weights[15] * weights[16] + 1 : 1.0;

        double sinr = Math.exp(weights[6])
                * (11 - difficulty)
                * Math.pow(Math.max(0.1, stability), -weights[8])
                * (Math.exp(weights[9] * (1 - retrievability)) - 1)
                * hardPenalty
                * easyBonus;

        double newStab = stability * (sinr + 1);
        return predictRetrievability(weights, newStab, 0);
    }

    private static double clamp(double value, double min, double max) {
        return Math.max(min, Math.min(max, value));
    }
}
