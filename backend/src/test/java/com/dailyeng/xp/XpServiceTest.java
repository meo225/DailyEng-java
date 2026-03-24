package com.dailyeng.xp;

import com.dailyeng.user.ProfileStats;
import com.dailyeng.user.ProfileStatsRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link XpService}.
 */
@ExtendWith(MockitoExtension.class)
class XpServiceTest {

    @Mock private ProfileStatsRepository profileStatsRepo;
    @Mock private UserActivityRepository userActivityRepo;

    @InjectMocks private XpService xpService;

    private static final String USER_ID = "user-xp-123";

    // ========================================================================
    // awardXp
    // ========================================================================

    @Nested
    @DisplayName("awardXp")
    class AwardXp {

        @Test
        @DisplayName("awards base XP and updates profile stats")
        void awardsBaseXp() {
            var stats = ProfileStats.builder().userId(USER_ID).xp(100).streak(0).build();
            stats.setId("ps-1");
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.of(stats));
            when(profileStatsRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var activity = UserActivity.builder().userId(USER_ID).date(LocalDate.now()).build();
            activity.setId("ua-1");
            when(userActivityRepo.findByUserIdAndDate(eq(USER_ID), any())).thenReturn(Optional.of(activity));
            when(userActivityRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = xpService.awardXp(USER_ID, 50);

            assertTrue(result.xpAwarded() >= 50);
            assertTrue(result.totalXp() > 100);
            verify(profileStatsRepo).save(any(ProfileStats.class));
        }

        @Test
        @DisplayName("creates ProfileStats when none exists")
        void createsProfileStatsOnFirstAward() {
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.empty());
            var newStats = ProfileStats.builder().userId(USER_ID).build();
            newStats.setId("ps-new");
            when(profileStatsRepo.save(any())).thenReturn(newStats);

            var activity = UserActivity.builder().userId(USER_ID).date(LocalDate.now()).build();
            activity.setId("ua-1");
            when(userActivityRepo.findByUserIdAndDate(eq(USER_ID), any())).thenReturn(Optional.of(activity));

            var result = xpService.awardXp(USER_ID, 10);

            assertNotNull(result);
            // First day = streak reset to 1 + daily bonus
            assertEquals(1, result.streak());
            assertTrue(result.isNewDay());
        }

        @Test
        @DisplayName("increments streak on consecutive days")
        void incrementsStreak() {
            var yesterday = LocalDateTime.now().minusDays(1);
            var stats = ProfileStats.builder()
                    .userId(USER_ID).xp(200).streak(3)
                    .lastStreakDate(yesterday).build();
            stats.setId("ps-1");
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.of(stats));
            when(profileStatsRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var activity = UserActivity.builder().userId(USER_ID).date(LocalDate.now()).build();
            activity.setId("ua-1");
            when(userActivityRepo.findByUserIdAndDate(eq(USER_ID), any())).thenReturn(Optional.of(activity));
            when(userActivityRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = xpService.awardXp(USER_ID, 50);

            assertEquals(4, result.streak());
            assertTrue(result.streakBonus() > 0);
        }

        @Test
        @DisplayName("resets streak on non-consecutive days")
        void resetsStreak() {
            var twoDaysAgo = LocalDateTime.now().minusDays(3);
            var stats = ProfileStats.builder()
                    .userId(USER_ID).xp(500).streak(10)
                    .lastStreakDate(twoDaysAgo).build();
            stats.setId("ps-1");
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.of(stats));
            when(profileStatsRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var activity = UserActivity.builder().userId(USER_ID).date(LocalDate.now()).build();
            activity.setId("ua-1");
            when(userActivityRepo.findByUserIdAndDate(eq(USER_ID), any())).thenReturn(Optional.of(activity));
            when(userActivityRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = xpService.awardXp(USER_ID, 50);

            assertEquals(1, result.streak());
        }
    }

    // ========================================================================
    // getStats
    // ========================================================================

    @Nested
    @DisplayName("getStats")
    class GetStats {

        @Test
        @DisplayName("returns correct level and XP thresholds")
        void returnsCorrectLevel() {
            var stats = ProfileStats.builder()
                    .userId(USER_ID).xp(500).streak(5).coins(100).build();
            stats.setId("ps-1");
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.of(stats));

            var result = xpService.getStats(USER_ID);

            assertEquals(500, result.totalXp());
            assertEquals(2, result.level()); // sqrt(500/100) = 2.23 → floor = 2
            assertEquals(400, result.xpForCurrentLevel()); // 2² × 100
            assertEquals(900, result.xpForNextLevel()); // 3² × 100
            assertEquals(5, result.streak());
        }
    }

    // ========================================================================
    // getActivityHistory
    // ========================================================================

    @Nested
    @DisplayName("getActivityHistory")
    class GetActivityHistory {

        @Test
        @DisplayName("returns correct totals for date range")
        void correctTotals() {
            var a1 = UserActivity.builder()
                    .userId(USER_ID).date(LocalDate.now().minusDays(1))
                    .xpEarned(50).lessonsCount(2).minutesSpent(30).wordsLearned(10).build();
            a1.setId("ua-1");
            var a2 = UserActivity.builder()
                    .userId(USER_ID).date(LocalDate.now())
                    .xpEarned(75).lessonsCount(1).minutesSpent(15).wordsLearned(5).build();
            a2.setId("ua-2");
            when(userActivityRepo.findByUserIdAndDateBetween(eq(USER_ID), any(), any()))
                    .thenReturn(List.of(a1, a2));

            var result = xpService.getActivityHistory(USER_ID, 7);

            assertEquals(2, result.days().size());
            assertEquals(125, result.totalXp());
            assertEquals(2, result.totalDays());
        }
    }

    // ========================================================================
    // calculateLevel / xpForLevel (static helpers)
    // ========================================================================

    @Nested
    @DisplayName("level calculations")
    class LevelCalculations {

        @Test
        @DisplayName("level formula is correct")
        void levelFormula() {
            assertEquals(0, XpService.calculateLevel(0));
            assertEquals(0, XpService.calculateLevel(99));
            assertEquals(1, XpService.calculateLevel(100));
            assertEquals(2, XpService.calculateLevel(400));
            assertEquals(5, XpService.calculateLevel(2500));
            assertEquals(10, XpService.calculateLevel(10000));
        }

        @Test
        @DisplayName("xpForLevel thresholds are correct")
        void thresholds() {
            assertEquals(0, XpService.xpForLevel(0));
            assertEquals(100, XpService.xpForLevel(1));
            assertEquals(400, XpService.xpForLevel(2));
            assertEquals(2500, XpService.xpForLevel(5));
            assertEquals(10000, XpService.xpForLevel(10));
        }
    }
}
