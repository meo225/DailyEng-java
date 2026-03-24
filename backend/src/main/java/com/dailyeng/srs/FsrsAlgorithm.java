package com.dailyeng.srs;

import com.dailyeng.vocabulary.UserVocabProgress.SrsState;

import java.util.Arrays;

/**
 * FSRS-4.5 (Free Spaced Repetition Scheduler) — pure Java ML engine.
 * <p>
 * Models human memory with a <b>power-law forgetting curve</b>:
 * {@code R(t) = (1 + t / (9 * S))^(-1)}
 * where {@code R} = retrievability (recall probability), {@code t} = elapsed days,
 * and {@code S} = stability (days until R drops to 90%).
 * <p>
 * Based on the open-source FSRS algorithm (peer-reviewed, optimized on 20B+ reviews).
 * All 17 weights are the FSRS-4.5 defaults. The algorithm is stateless — all state
 * lives in {@link com.dailyeng.vocabulary.UserVocabProgress}.
 *
 * @see <a href="https://github.com/open-spaced-repetition/fsrs4anki">FSRS on GitHub</a>
 */
public final class FsrsAlgorithm {

    private FsrsAlgorithm() {}

    /** Desired probability of recall at review time. */
    public static final double DESIRED_RETENTION = 0.9;

    // FSRS-4.5 default weights (w0..w16), optimized on massive review data
    private static final double[] W = {
        0.4072, 1.1829, 3.1262, 15.4722,  // w0-w3: initial stability per rating (Again/Hard/Good/Easy)
        7.2102,                             // w4: initial difficulty offset
        0.5316,                             // w5: difficulty gravity towards mean
        1.0651,                             // w6: stability growth after successful review
        0.0046,                             // w7: stability modulation by difficulty
        1.5071,                             // w8: stability growth exponent
        0.1574,                             // w9: stability modulation by retrievability
        1.0070,                             // w10: stability penalty after lapse
        1.9265,                             // w11: lapse stability base modifier
        0.1160,                             // w12: lapse stability difficulty modifier
        0.0500,                             // w13: short-term stability minimum
        2.0000,                             // w14: hard rating penalty
        0.0001,                             // w15: easy bonus factor
        3.0000                              // w16: easy bonus scaling
    };

    /** Rating scale: 1=Again (forgot), 2=Hard, 3=Good, 4=Easy. */
    public static final int AGAIN = 1, HARD = 2, GOOD = 3, EASY = 4;

    /** Returns a copy of the default FSRS-4.5 weights for optimizer initialization. */
    public static double[] getDefaultWeights() {
        return Arrays.copyOf(W, W.length);
    }

    // ========================================================================
    // Public API
    // ========================================================================

    /**
     * Schedule the next review based on current card state and user rating.
     *
     * @param stability   current memory stability (days)
     * @param difficulty  current difficulty (1-10)
     * @param elapsedDays days since last review
     * @param rating      user rating (1-4)
     * @param state       current card state
     * @param repetitions successful review count
     * @param lapses      lapse count
     * @return scheduling result with updated parameters
     */
    public static ScheduleResult schedule(
            double stability, double difficulty, double elapsedDays,
            int rating, SrsState state, int repetitions, int lapses
    ) {
        return schedule(stability, difficulty, elapsedDays, rating, state, repetitions, lapses, null);
    }

    /**
     * Schedule with per-user optimized weights.
     *
     * @param customWeights 17-element array of optimized weights, or null for defaults
     */
    public static ScheduleResult schedule(
            double stability, double difficulty, double elapsedDays,
            int rating, SrsState state, int repetitions, int lapses,
            double[] customWeights
    ) {
        double[] w = (customWeights != null && customWeights.length == 17) ? customWeights : W;
        if (state == SrsState.NEW) {
            return scheduleNewCard(rating, w);
        }
        return scheduleExistingCard(stability, difficulty, elapsedDays, rating, state, repetitions, lapses, w);
    }

    /**
     * Calculate the probability of recalling an item after {@code elapsedDays}.
     * Uses the power-law forgetting curve: R(t) = (1 + t / (9 * S))^(-1)
     */
    public static double retrievability(double stability, double elapsedDays) {
        if (stability <= 0) return 0.0;
        return Math.pow(1 + elapsedDays / (9.0 * stability), -1);
    }

    /**
     * Calculate the interval (in days) to achieve the desired retention.
     */
    public static double nextInterval(double stability) {
        if (stability <= 0) return 0;
        return 9.0 * stability * (1.0 / DESIRED_RETENTION - 1);
    }

    // ========================================================================
    // Scheduling logic
    // ========================================================================

    private static ScheduleResult scheduleNewCard(int rating, double[] w) {
        double initStability = w[rating - 1]; // w0..w3 per rating
        double initDifficulty = clampDifficulty(
                w[4] - Math.exp(w[5] * (rating - 3)) + 1);

        SrsState newState = switch (rating) {
            case AGAIN -> SrsState.LEARNING;
            case HARD  -> SrsState.LEARNING;
            case GOOD  -> SrsState.REVIEW;
            case EASY  -> SrsState.REVIEW;
            default -> SrsState.LEARNING;
        };

        double interval = nextInterval(initStability);
        int masteryDelta = switch (rating) {
            case AGAIN -> 0;
            case HARD -> 5;
            case GOOD -> 15;
            case EASY -> 25;
            default -> 0;
        };

        return new ScheduleResult(
                Math.max(1, (int) Math.round(interval)),
                initStability, initDifficulty,
                newState, 1, 0, masteryDelta);
    }

    private static ScheduleResult scheduleExistingCard(
            double stability, double difficulty, double elapsedDays,
            int rating, SrsState state, int repetitions, int lapses, double[] w
    ) {
        double retrievability = retrievability(stability, elapsedDays);

        if (rating == AGAIN) {
            double newStability = calculateLapseStability(stability, difficulty, w);
            double newDifficulty = nextDifficulty(difficulty, rating, w);

            return new ScheduleResult(
                    1,
                    newStability, newDifficulty,
                    SrsState.RELEARNING, 0, lapses + 1,
                    Math.max(0, -20));
        }

        double newStability = calculateSuccessStability(
                stability, difficulty, retrievability, rating, w);
        double newDifficulty = nextDifficulty(difficulty, rating, w);

        double interval = nextInterval(newStability);

        if (rating == HARD) {
            interval = Math.max(1, interval * 0.8);
        } else if (rating == EASY) {
            interval = interval * 1.3;
        }

        int masteryDelta = switch (rating) {
            case HARD -> 5;
            case GOOD -> 10;
            case EASY -> 20;
            default -> 0;
        };

        SrsState newState = (state == SrsState.RELEARNING || state == SrsState.LEARNING)
                ? SrsState.REVIEW : state;

        return new ScheduleResult(
                Math.max(1, (int) Math.round(interval)),
                newStability, newDifficulty,
                newState, repetitions + 1, lapses, masteryDelta);
    }

    // ========================================================================
    // FSRS core formulas
    // ========================================================================

    /**
     * Calculate new stability after a SUCCESSFUL review (rating >= 2).
     * S'(S, D, R, G) = S · (e^(w6) · (11-D) · S^(-w8) · (e^(w9·(1-R)) - 1) · hardPenalty · easyBonus + 1)
     */
    private static double calculateSuccessStability(
            double stability, double difficulty, double retrievability, int rating, double[] w
    ) {
        double hardPenalty = (rating == HARD) ? w[14] : 1.0;
        double easyBonus = (rating == EASY) ? w[15] * w[16] + 1 : 1.0;

        double sinr = Math.exp(w[6])
                * (11 - difficulty)
                * Math.pow(stability, -w[8])
                * (Math.exp(w[9] * (1 - retrievability)) - 1)
                * hardPenalty
                * easyBonus;

        return stability * (sinr + 1);
    }

    /**
     * Calculate new stability after a LAPSE (rating = Again).
     * S'_fail = w10 · D^(-w11) · ((S+1)^w12 - 1) · e^(w13)
     */
    private static double calculateLapseStability(double stability, double difficulty, double[] w) {
        return Math.max(w[13],
                w[10] * Math.pow(difficulty, -w[11])
                     * (Math.pow(stability + 1, w[12]) - 1)
                     * Math.exp(w[13]));
    }

    /**
     * Update difficulty after a review.
     * D' = w5 · D_0(3) + (1 - w5) · (D - w6 · (rating - 3))
     */
    private static double nextDifficulty(double difficulty, int rating, double[] w) {
        double d0Mean = w[4] - Math.exp(w[5] * (3 - 3)) + 1;
        double newD = w[5] * d0Mean + (1 - w[5]) * (difficulty - w[6] * (rating - 3));
        return clampDifficulty(newD);
    }

    private static double clampDifficulty(double d) {
        return Math.max(1.0, Math.min(10.0, d));
    }

    // ========================================================================
    // Result record
    // ========================================================================

    /**
     * Result of scheduling a card review.
     *
     * @param intervalDays   days until next review
     * @param stability      updated memory stability
     * @param difficulty     updated item difficulty
     * @param state          new card state
     * @param repetitions    updated successful review count
     * @param lapses         updated lapse count
     * @param masteryDelta   change to apply to masteryLevel
     */
    public record ScheduleResult(
            int intervalDays,
            double stability,
            double difficulty,
            SrsState state,
            int repetitions,
            int lapses,
            int masteryDelta
    ) {}
}
