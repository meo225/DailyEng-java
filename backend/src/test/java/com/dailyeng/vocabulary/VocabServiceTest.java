package com.dailyeng.service;

import com.dailyeng.entity.*;
import com.dailyeng.entity.enums.HubType;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.entity.enums.PartOfSpeech;
import com.dailyeng.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link VocabService}.
 */
@ExtendWith(MockitoExtension.class)
class VocabServiceTest {

    @Mock private TopicGroupRepository topicGroupRepo;
    @Mock private TopicRepository topicRepo;
    @Mock private VocabItemRepository vocabItemRepo;
    @Mock private UserVocabProgressRepository userVocabProgressRepo;

    @InjectMocks private VocabService vocabService;

    private static final String USER_ID = "user-123";
    private static final String TOPIC_ID = "topic-456";

    // ========================================================================
    // getTopicGroups
    // ========================================================================

    @Nested
    @DisplayName("getTopicGroups")
    class GetTopicGroups {

        @Test
        @DisplayName("returns title-cased topic groups for vocab hub")
        void returnsTitleCasedGroups() {
            var group = TopicGroup.builder()
                    .name("daily life")
                    .hubType(HubType.vocab)
                    .order(1)
                    .subcategories(List.of("food", "health"))
                    .build();
            group.setId("g1");

            when(topicGroupRepo.findByHubTypeOrderByOrderAsc("vocab"))
                    .thenReturn(List.of(group));

            var result = vocabService.getTopicGroups();

            assertEquals(1, result.size());
            assertEquals("Daily Life", result.get(0).name());
            assertEquals(List.of("Food", "Health"), result.get(0).subcategories());
        }
    }

    // ========================================================================
    // getTopicsWithProgress
    // ========================================================================

    @Nested
    @DisplayName("getTopicsWithProgress")
    class GetTopicsWithProgress {

        @Test
        @DisplayName("merges paginated topics with user mastery progress")
        @SuppressWarnings("unchecked")
        void mergesWithProgress() {
            var topic = buildTopic(TOPIC_ID, "Animals", Level.A1);
            var page = new PageImpl<>(List.of(topic));
            when(topicRepo.findAll(any(Specification.class), any(Pageable.class))).thenReturn(page);

            var vocabItem = buildVocabItem("vi-1", TOPIC_ID);
            when(vocabItemRepo.findByTopicId(TOPIC_ID)).thenReturn(List.of(vocabItem));

            var progress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId("vi-1").masteryLevel(100).build();
            progress.setId("uvp-1");
            when(userVocabProgressRepo.findByUserIdAndVocabItemIdIn(eq(USER_ID), anyList()))
                    .thenReturn(List.of(progress));

            var result = vocabService.getTopicsWithProgress(USER_ID, null, null, null, 1, 12);

            assertEquals(1, result.topics().size());
            assertEquals(100, result.topics().get(0).progress());
        }

        @Test
        @DisplayName("returns zero progress when userId is null")
        @SuppressWarnings("unchecked")
        void noProgressWhenNoUser() {
            var topic = buildTopic(TOPIC_ID, "Animals", Level.A1);
            var page = new PageImpl<>(List.of(topic));
            when(topicRepo.findAll(any(Specification.class), any(Pageable.class))).thenReturn(page);

            var result = vocabService.getTopicsWithProgress(null, null, null, null, 1, 12);

            assertEquals(1, result.topics().size());
            assertEquals(0, result.topics().get(0).progress());
        }
    }

    // ========================================================================
    // searchTopics
    // ========================================================================

    @Nested
    @DisplayName("searchTopics")
    class SearchTopics {

        @Test
        @DisplayName("returns empty list for blank query")
        void emptyQueryReturnsEmpty() {
            assertEquals(List.of(), vocabService.searchTopics(""));
            assertEquals(List.of(), vocabService.searchTopics(null));
        }

        @Test
        @DisplayName("returns mapped results for valid query")
        void validQueryReturnsResults() {
            var topic = buildTopic(TOPIC_ID, "Animals", Level.B1);
            when(topicRepo.searchByTitleOrDescription(eq(HubType.vocab), eq("animal"), any()))
                    .thenReturn(List.of(topic));

            var result = vocabService.searchTopics("animal");

            assertEquals(1, result.size());
            assertEquals("Animals", result.get(0).title());
        }
    }

    // ========================================================================
    // getTopicById
    // ========================================================================

    @Nested
    @DisplayName("getTopicById")
    class GetTopicById {

        @Test
        @DisplayName("returns null for non-existent topic")
        void notFound() {
            when(topicRepo.findById("missing")).thenReturn(Optional.empty());
            assertNull(vocabService.getTopicById("missing", null));
        }

        @Test
        @DisplayName("returns topic detail with vocab items and mastery")
        void returnDetail() {
            var topic = buildTopic(TOPIC_ID, "Animals", Level.A1);
            when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.of(topic));

            var vocabItem = buildVocabItem("vi-1", TOPIC_ID);
            when(vocabItemRepo.findByTopicId(TOPIC_ID)).thenReturn(List.of(vocabItem));

            var progress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId("vi-1").masteryLevel(75).build();
            progress.setId("uvp-1");
            when(userVocabProgressRepo.findByUserIdAndVocabItemIdIn(eq(USER_ID), anyList()))
                    .thenReturn(List.of(progress));

            var result = vocabService.getTopicById(TOPIC_ID, USER_ID);

            assertNotNull(result);
            assertEquals("Animals", result.title());
            assertEquals(1, result.vocab().size());
            assertEquals(75, result.vocab().get(0).masteryLevel());
        }
    }

    // ========================================================================
    // Test helpers
    // ========================================================================

    private Topic buildTopic(String id, String title, Level level) {
        var topicGroup = TopicGroup.builder().name("general").hubType(HubType.vocab).build();
        topicGroup.setId("tg-1");
        var topic = Topic.builder()
                .title(title).description("Test topic").level(level)
                .wordCount(10).estimatedTime(30)
                .build();
        topic.setId(id);
        topic.setTopicGroup(topicGroup);
        return topic;
    }

    private VocabItem buildVocabItem(String id, String topicId) {
        var item = VocabItem.builder()
                .topicId(topicId).word("cat").pronunciation("/kæt/")
                .meaning("a small animal").vietnameseMeaning("con mèo")
                .partOfSpeech(PartOfSpeech.noun)
                .exampleSentence("I have a cat.").exampleTranslation("Tôi có một con mèo.")
                .build();
        item.setId(id);
        return item;
    }
}
