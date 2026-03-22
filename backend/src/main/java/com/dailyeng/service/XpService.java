package com.dailyeng.service;

import com.dailyeng.dto.xp.XpDtos;
import com.dailyeng.dto.xp.XpDtos.*;
import com.dailyeng.entity.ProfileStats;
import com.dailyeng.entity.UserActivity;
import com.dailyeng.repository.ProfileStatsRepository;
import com.dailyeng.repository.UserActivityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * Centralized XP engine — single entry point for all XP transactions.
 * <p>
 * Atomically updates {@link ProfileStats#getXp()}, records daily
 * {@link UserActivity}, and maintains login streaks.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class XpService {

    private final ProfileStatsRepository profileStatsRepo;
    private final UserActivityRepository userActivityRepo;

    // ========================================================================
    // 1. awardXp — atomic XP transaction
    // ========================================================================

    /**
     * Award XP to a user. Handles streak tracking and daily activity recording.
     *
     * @param userId the user receiving XP
     * @param amount base XP amount to award
     * @return result including streak bonus and updated totals
     */
    @Transactional
    public XpAwardResult awardXp(String userId, int amount) {
        var stats = findOrCreateProfileStats(userId);
        var today = LocalDate.now();

        // Streak logic
        boolean isNewDay = !today.equals(stats.getLastStreakDate() != null
                ? stats.getLastStreakDate().toLocalDate() : null);
        int streakBonus = 0;

        if (isNewDay) {
            boolean isConsecutive = stats.getLastStreakDate() != null
                    && ChronoUnit.DAYS.between(stats.getLastStreakDate().toLocalDate(), today) == 1;

            if (isConsecutive) {
                stats.setStreak(stats.getStreak() + 1);
            } else {
                stats.setStreak(1);
            }
            stats.setLastStreakDate(today.atStartOfDay());

            // Daily login bonus + streak bonus
            streakBonus = XpDtos.XP_DAILY_LOGIN + (stats.getStreak() * 2);
        }

        int totalAwarded = amount + streakBonus;
        stats.setXp(stats.getXp() + totalAwarded);
        profileStatsRepo.save(stats);

        // Record in daily activity
        recordDailyXp(userId, today, totalAwarded);

        log.info("🏆 XP awarded: userId={}, base={}, streakBonus={}, total={}, newXp={}",
                userId, amount, streakBonus, totalAwarded, stats.getXp());

        return new XpAwardResult(totalAwarded, stats.getXp(), stats.getStreak(), streakBonus, isNewDay);
    }

    // ========================================================================
    // 2. getStats — user XP overview
    // ========================================================================

    @Transactional(readOnly = true)
    public XpStatsResponse getStats(String userId) {
        var stats = findOrCreateProfileStats(userId);
        int level = calculateLevel(stats.getXp());

        return new XpStatsResponse(
                stats.getXp(),
                level,
                xpForLevel(level),
                xpForLevel(level + 1),
                stats.getStreak(),
                stats.getCoins(),
                stats.getVocabScore(),
                stats.getGrammarScore(),
                stats.getSpeakingScore(),
                stats.getListeningScore(),
                stats.getReadingScore(),
                stats.getWritingScore(),
                stats.getBadges() != null ? stats.getBadges() : List.of());
    }

    // ========================================================================
    // 3. getActivityHistory — daily activity for a date range
    // ========================================================================

    @Transactional(readOnly = true)
    public ActivityHistoryResponse getActivityHistory(String userId, int days) {
        var end = LocalDate.now();
        var start = end.minusDays(days - 1);

        var activities = userActivityRepo.findByUserIdAndDateBetween(userId, start, end);
        var activityDays = activities.stream()
                .map(a -> new ActivityDay(
                        a.getDate().toString(),
                        a.getXpEarned(),
                        a.getLessonsCount(),
                        a.getMinutesSpent(),
                        a.getWordsLearned()))
                .toList();

        int totalXp = activities.stream().mapToInt(UserActivity::getXpEarned).sum();

        return new ActivityHistoryResponse(activityDays, totalXp, activityDays.size());
    }

    // ========================================================================
    // 4. recordActivity — update daily counters
    // ========================================================================

    @Transactional
    public void recordActivity(String userId, int lessonsCount, int minutesSpent, int wordsLearned) {
        var activity = findOrCreateTodayActivity(userId);
        activity.setLessonsCount(activity.getLessonsCount() + lessonsCount);
        activity.setMinutesSpent(activity.getMinutesSpent() + minutesSpent);
        activity.setWordsLearned(activity.getWordsLearned() + wordsLearned);
        userActivityRepo.save(activity);
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    private ProfileStats findOrCreateProfileStats(String userId) {
        return profileStatsRepo.findByUserId(userId)
                .orElseGet(() -> profileStatsRepo.save(
                        ProfileStats.builder().userId(userId).build()));
    }

    private UserActivity findOrCreateTodayActivity(String userId) {
        var today = LocalDate.now();
        return userActivityRepo.findByUserIdAndDate(userId, today)
                .orElseGet(() -> userActivityRepo.save(
                        UserActivity.builder().userId(userId).date(today).build()));
    }

    private void recordDailyXp(String userId, LocalDate date, int xp) {
        var activity = userActivityRepo.findByUserIdAndDate(userId, date)
                .orElseGet(() -> userActivityRepo.save(
                        UserActivity.builder().userId(userId).date(date).build()));
        activity.setXpEarned(activity.getXpEarned() + xp);
        userActivityRepo.save(activity);
    }

    /**
     * Level formula: level = floor(sqrt(xp / 100)).
     * Level 0: 0 XP, Level 1: 100 XP, Level 2: 400 XP, Level 5: 2500 XP, Level 10: 10000 XP.
     */
    static int calculateLevel(int xp) {
        return (int) Math.floor(Math.sqrt((double) xp / 100));
    }

    /**
     * XP threshold for a given level.
     */
    static int xpForLevel(int level) {
        return level * level * 100;
    }
}
