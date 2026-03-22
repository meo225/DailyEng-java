package com.dailyeng.dto.xp;

import java.util.List;

/**
 * All XP system DTOs as Java 21 records.
 */
public final class XpDtos {

    private XpDtos() {}

    // ============================== XP Rewards ==============================

    /** Configurable XP reward values for each activity type. */
    public static final int XP_SPEAKING_SESSION = 50;
    public static final int XP_VOCAB_MASTERY = 10;
    public static final int XP_GRAMMAR_COMPLETE = 30;
    public static final int XP_DAILY_LOGIN = 5;

    // ============================== Responses ==============================

    /** Result returned after awarding XP. */
    public record XpAwardResult(
            int xpAwarded,
            int totalXp,
            int streak,
            int streakBonus,
            boolean isNewDay
    ) {}

    /** User's XP stats overview. */
    public record XpStatsResponse(
            int totalXp,
            int level,
            int xpForCurrentLevel,
            int xpForNextLevel,
            int streak,
            int coins,
            int vocabScore,
            int grammarScore,
            int speakingScore,
            int listeningScore,
            int readingScore,
            int writingScore,
            List<String> badges
    ) {}

    /** Activity history for a date range. */
    public record ActivityDay(
            String date,
            int xpEarned,
            int lessonsCount,
            int minutesSpent,
            int wordsLearned
    ) {}

    public record ActivityHistoryResponse(
            List<ActivityDay> days,
            int totalXp,
            int totalDays
    ) {}

    /** Single leaderboard entry. */
    public record LeaderboardItem(
            int rank,
            String userId,
            String userName,
            String userImage,
            int xp
    ) {}

    /** Leaderboard response with user's own position. */
    public record LeaderboardResponse(
            List<LeaderboardItem> entries,
            LeaderboardItem currentUser,
            String period,
            String type
    ) {}
}
