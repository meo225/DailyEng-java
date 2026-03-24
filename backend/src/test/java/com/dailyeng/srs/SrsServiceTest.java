package com.dailyeng.srs;
import com.dailyeng.xp.XpService;

import com.dailyeng.user.ProfileStats;
import com.dailyeng.vocabulary.UserVocabProgress;
import com.dailyeng.vocabulary.UserVocabProgress.SrsState;
import com.dailyeng.vocabulary.VocabItem;
import com.dailyeng.user.ProfileStatsRepository;
import com.dailyeng.vocabulary.UserVocabProgressRepository;
import com.dailyeng.vocabulary.VocabItemRepository;
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
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link SrsService}.
 */
@ExtendWith(MockitoExtension.class)
class SrsServiceTest {

    @Mock private UserVocabProgressRepository progressRepo;
    @Mock private VocabItemRepository vocabItemRepo;
    @Mock private ProfileStatsRepository profileStatsRepo;
    @Mock private ReviewLogRepository reviewLogRepo;
    @Mock private XpService xpService;

    @InjectMocks private SrsService srsService;

    private static final String USER_ID = "user-srs-123";
    private static final String VOCAB_ID = "vocab-abc";

    // ========================================================================
    // reviewVocabItem
    // ========================================================================

    @Nested
    @DisplayName("reviewVocabItem")
    class ReviewVocabItem {

        @Test
        @DisplayName("creates new progress on first review and logs it")
        void createsNewProgress() {
            when(progressRepo.findByUserIdAndVocabItemId(USER_ID, VOCAB_ID))
                    .thenReturn(Optional.empty());
            var newProgress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId(VOCAB_ID).build();
            newProgress.setId("p-1");
            when(progressRepo.save(any(UserVocabProgress.class))).thenReturn(newProgress);
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.empty());
            when(reviewLogRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewVocabItem(USER_ID, VOCAB_ID, 3);

            assertNotNull(result);
            assertTrue(result.stability() > 0);
            assertEquals("REVIEW", result.srsState());
            assertEquals(0, result.xpAwarded());
            verify(reviewLogRepo).save(any()); // review logged
        }

        @Test
        @DisplayName("runs FSRS algorithm on existing progress")
        void runsAlgorithm() {
            var progress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId(VOCAB_ID)
                    .stability(3.0).difficulty(5.0).repetitions(2)
                    .srsState(SrsState.REVIEW)
                    .lastReviewed(LocalDateTime.now().minusDays(3))
                    .build();
            progress.setId("p-1");
            when(progressRepo.findByUserIdAndVocabItemId(USER_ID, VOCAB_ID))
                    .thenReturn(Optional.of(progress));
            when(progressRepo.save(any())).thenAnswer(i -> i.getArgument(0));
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.empty());
            when(reviewLogRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewVocabItem(USER_ID, VOCAB_ID, 3);

            assertTrue(result.stability() > 3.0, "Stability should grow after Good");
            assertTrue(result.intervalDays() >= 1);
            verify(progressRepo).save(any(UserVocabProgress.class));
        }

        @Test
        @DisplayName("uses personalized weights when available")
        void usesPersonalizedWeights() {
            var stats = ProfileStats.builder().userId(USER_ID)
                    .fsrsWeights(new double[]{
                        0.5, 1.5, 4.0, 20.0, 7.0, 0.5, 1.0, 0.005, 1.5, 0.15,
                        1.0, 2.0, 0.1, 0.05, 2.0, 0.0001, 3.0
                    }).build();
            stats.setId("ps-1");
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.of(stats));

            var progress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId(VOCAB_ID)
                    .stability(3.0).difficulty(5.0).repetitions(2)
                    .srsState(SrsState.REVIEW)
                    .lastReviewed(LocalDateTime.now().minusDays(3))
                    .build();
            progress.setId("p-1");
            when(progressRepo.findByUserIdAndVocabItemId(USER_ID, VOCAB_ID))
                    .thenReturn(Optional.of(progress));
            when(progressRepo.save(any())).thenAnswer(i -> i.getArgument(0));
            when(reviewLogRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = srsService.reviewVocabItem(USER_ID, VOCAB_ID, 3);

            assertNotNull(result);
            assertTrue(result.stability() > 0);
        }

        @Test
        @DisplayName("awards XP when mastery threshold crossed")
        void awardsXpOnMastery() {
            var progress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId(VOCAB_ID)
                    .stability(10.0).difficulty(3.0).repetitions(8)
                    .srsState(SrsState.REVIEW).masteryLevel(95)
                    .lastReviewed(LocalDateTime.now().minusDays(10))
                    .build();
            progress.setId("p-1");
            when(progressRepo.findByUserIdAndVocabItemId(USER_ID, VOCAB_ID))
                    .thenReturn(Optional.of(progress));
            when(progressRepo.save(any())).thenAnswer(i -> i.getArgument(0));
            when(profileStatsRepo.findByUserId(USER_ID)).thenReturn(Optional.empty());
            when(reviewLogRepo.save(any())).thenAnswer(i -> i.getArgument(0));
            when(xpService.awardXp(eq(USER_ID), anyInt()))
                    .thenReturn(new com.dailyeng.xp.XpDtos.XpAwardResult(10, 310, 1, 0, false));

            var result = srsService.reviewVocabItem(USER_ID, VOCAB_ID, 3);

            assertEquals(100, result.masteryLevel());
            assertEquals(10, result.xpAwarded());
            verify(xpService).awardXp(USER_ID, 10);
        }
    }

    // ========================================================================
    // optimizeWeights
    // ========================================================================

    @Nested
    @DisplayName("optimizeWeights")
    class OptimizeWeights {

        @Test
        @DisplayName("returns null when insufficient reviews")
        void insufficientReviews() {
            when(reviewLogRepo.countByUserId(USER_ID)).thenReturn(50L);

            assertNull(srsService.optimizeWeights(USER_ID));
            verify(reviewLogRepo, never()).findByUserIdOrderByCreatedAtAsc(any());
        }
    }

    // ========================================================================
    // getReviewStats
    // ========================================================================

    @Nested
    @DisplayName("getReviewStats")
    class GetReviewStats {

        @Test
        @DisplayName("returns empty stats for new user")
        void emptyForNewUser() {
            when(progressRepo.findByUserId(USER_ID)).thenReturn(List.of());

            var result = srsService.getReviewStats(USER_ID);

            assertEquals(0, result.dueToday());
            assertEquals(0, result.totalReviewed());
        }
    }

    // ========================================================================
    // getStudySession
    // ========================================================================

    @Nested
    @DisplayName("getStudySession")
    class GetStudySession {

        @Test
        @DisplayName("mixes due items and new items")
        void mixesDueAndNew() {
            var vocab1 = VocabItem.builder().build(); vocab1.setId("v1");
            var vocab2 = VocabItem.builder().build(); vocab2.setId("v2");
            var vocab3 = VocabItem.builder().build(); vocab3.setId("v3");
            when(vocabItemRepo.findByTopicId("topic-1"))
                    .thenReturn(List.of(vocab1, vocab2, vocab3));

            var dueProgress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId("v1")
                    .srsState(SrsState.REVIEW).stability(2.0)
                    .lastReviewed(LocalDateTime.now().minusDays(5))
                    .nextReview(LocalDateTime.now().minusDays(1))
                    .build();
            dueProgress.setId("p-1");
            when(progressRepo.findByUserIdAndVocabItemIdIn(eq(USER_ID), anyList()))
                    .thenReturn(List.of(dueProgress));
            when(vocabItemRepo.findById("v1")).thenReturn(Optional.of(vocab1));

            var result = srsService.getStudySession(USER_ID, "topic-1", 20);

            assertEquals(1, result.reviewCount());
            assertEquals(2, result.newCount());
            assertEquals(3, result.totalCount());
        }
    }
}
