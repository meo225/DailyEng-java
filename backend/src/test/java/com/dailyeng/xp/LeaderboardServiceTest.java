package com.dailyeng.xp;

import com.dailyeng.user.User;
import com.dailyeng.user.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link LeaderboardService}.
 */
@ExtendWith(MockitoExtension.class)
class LeaderboardServiceTest {

    @Mock private LeaderboardEntryRepository leaderboardRepo;
    @Mock private UserRepository userRepo;

    @InjectMocks private LeaderboardService leaderboardService;

    private static final String USER_ID = "user-lb-123";

    // ========================================================================
    // getLeaderboard
    // ========================================================================

    @Nested
    @DisplayName("getLeaderboard")
    class GetLeaderboard {

        @Test
        @DisplayName("returns ranked entries with user info")
        void returnsRankedEntries() {
            var entry1 = LeaderboardEntry.builder()
                    .userId("u1").period("weekly").type("xp").xp(500).build();
            entry1.setId("lb-1");
            var entry2 = LeaderboardEntry.builder()
                    .userId("u2").period("weekly").type("xp").xp(300).build();
            entry2.setId("lb-2");

            when(leaderboardRepo.findByPeriodAndTypeOrderByXpDesc(eq("weekly"), eq("xp"), any(Pageable.class)))
                    .thenReturn(List.of(entry1, entry2));

            var user1 = User.builder().name("Alice").image("alice.jpg").build();
            user1.setId("u1");
            var user2 = User.builder().name("Bob").build();
            user2.setId("u2");
            when(userRepo.findAllById(anyList())).thenReturn(List.of(user1, user2));

            var result = leaderboardService.getLeaderboard(null, "weekly", "xp", 20);

            assertEquals(2, result.entries().size());
            assertEquals(1, result.entries().get(0).rank());
            assertEquals("Alice", result.entries().get(0).userName());
            assertEquals(500, result.entries().get(0).xp());
            assertEquals(2, result.entries().get(1).rank());
            assertNull(result.currentUser());
        }

        @Test
        @DisplayName("includes current user when found in top list")
        void includesCurrentUser() {
            var entry = LeaderboardEntry.builder()
                    .userId(USER_ID).period("weekly").type("xp").xp(100).build();
            entry.setId("lb-1");
            when(leaderboardRepo.findByPeriodAndTypeOrderByXpDesc(any(), any(), any()))
                    .thenReturn(List.of(entry));

            var user = User.builder().name("Me").build();
            user.setId(USER_ID);
            when(userRepo.findAllById(anyList())).thenReturn(List.of(user));

            var result = leaderboardService.getLeaderboard(USER_ID, "weekly", "xp", 20);

            assertNotNull(result.currentUser());
            assertEquals(USER_ID, result.currentUser().userId());
        }
    }

    // ========================================================================
    // updateLeaderboard
    // ========================================================================

    @Nested
    @DisplayName("updateLeaderboard")
    class UpdateLeaderboard {

        @Test
        @DisplayName("creates new entry when none exists")
        void createsNewEntry() {
            when(leaderboardRepo.findByUserIdAndPeriodAndType(USER_ID, "weekly", "xp"))
                    .thenReturn(Optional.empty());
            when(leaderboardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            leaderboardService.updateLeaderboard(USER_ID, 50, "weekly", "xp");

            verify(leaderboardRepo).save(argThat(e -> e.getXp() == 50));
        }

        @Test
        @DisplayName("accumulates XP on existing entry")
        void accumulatesXp() {
            var existing = LeaderboardEntry.builder()
                    .userId(USER_ID).period("weekly").type("xp").xp(200).build();
            existing.setId("lb-1");
            when(leaderboardRepo.findByUserIdAndPeriodAndType(USER_ID, "weekly", "xp"))
                    .thenReturn(Optional.of(existing));
            when(leaderboardRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            leaderboardService.updateLeaderboard(USER_ID, 75, "weekly", "xp");

            verify(leaderboardRepo).save(argThat(e -> e.getXp() == 275));
        }
    }
}
