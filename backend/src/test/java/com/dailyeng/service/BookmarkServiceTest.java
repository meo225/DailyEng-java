package com.dailyeng.service;

import com.dailyeng.entity.GrammarBookmark;
import com.dailyeng.entity.Topic;
import com.dailyeng.entity.VocabBookmark;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.exception.ResourceNotFoundException;
import com.dailyeng.repository.GrammarBookmarkRepository;
import com.dailyeng.repository.TopicRepository;
import com.dailyeng.repository.VocabBookmarkRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link BookmarkService}.
 */
@ExtendWith(MockitoExtension.class)
class BookmarkServiceTest {

    @Mock private VocabBookmarkRepository vocabBookmarkRepo;
    @Mock private GrammarBookmarkRepository grammarBookmarkRepo;
    @Mock private TopicRepository topicRepo;

    @InjectMocks private BookmarkService bookmarkService;

    private static final String USER_ID = "user-123";
    private static final String TOPIC_ID = "topic-456";

    // ========================================================================
    // Vocab Bookmarks
    // ========================================================================

    @Nested
    @DisplayName("toggleVocabBookmark")
    class ToggleVocabBookmark {

        @Test
        @DisplayName("adds bookmark when it does not exist")
        void addBookmark() {
            when(vocabBookmarkRepo.findByUserIdAndTopicId(USER_ID, TOPIC_ID))
                    .thenReturn(Optional.empty());

            var topic = Topic.builder().title("Animals").description("Learn animal names").level(Level.A1).build();
            topic.setId(TOPIC_ID);
            when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.of(topic));
            when(vocabBookmarkRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = bookmarkService.toggleVocabBookmark(USER_ID, TOPIC_ID);

            assertTrue(result.bookmarked());
            verify(vocabBookmarkRepo).save(any(VocabBookmark.class));
        }

        @Test
        @DisplayName("removes bookmark when it already exists")
        void removeBookmark() {
            var existing = VocabBookmark.builder().userId(USER_ID).topicId(TOPIC_ID).build();
            existing.setId("bm-1");
            when(vocabBookmarkRepo.findByUserIdAndTopicId(USER_ID, TOPIC_ID))
                    .thenReturn(Optional.of(existing));

            var result = bookmarkService.toggleVocabBookmark(USER_ID, TOPIC_ID);

            assertFalse(result.bookmarked());
            verify(vocabBookmarkRepo).delete(existing);
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when topic does not exist")
        void topicNotFound() {
            when(vocabBookmarkRepo.findByUserIdAndTopicId(USER_ID, TOPIC_ID))
                    .thenReturn(Optional.empty());
            when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class,
                    () -> bookmarkService.toggleVocabBookmark(USER_ID, TOPIC_ID));
        }
    }

    // ========================================================================
    // Vocab Bookmark List
    // ========================================================================

    @Test
    @DisplayName("getVocabBookmarks maps topic data correctly")
    void getVocabBookmarks() {
        var bookmark = VocabBookmark.builder().userId(USER_ID).topicId(TOPIC_ID)
                .createdAt(LocalDateTime.now()).build();
        bookmark.setId("bm-1");
        when(vocabBookmarkRepo.findByUserId(USER_ID)).thenReturn(List.of(bookmark));

        var topic = Topic.builder().title("Animals").description("Animal vocab")
                .level(Level.B1).thumbnail("img.jpg").category("Nature").build();
        topic.setId(TOPIC_ID);
        when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.of(topic));

        var result = bookmarkService.getVocabBookmarks(USER_ID);

        assertEquals(1, result.size());
        assertEquals("Animals", result.get(0).title());
        assertEquals("B1", result.get(0).level());
    }

    @Test
    @DisplayName("getVocabBookmarks handles missing topic gracefully")
    void getVocabBookmarksNullTopic() {
        var bookmark = VocabBookmark.builder().userId(USER_ID).topicId("deleted-topic").build();
        bookmark.setId("bm-1");
        when(vocabBookmarkRepo.findByUserId(USER_ID)).thenReturn(List.of(bookmark));
        when(topicRepo.findById("deleted-topic")).thenReturn(Optional.empty());

        var result = bookmarkService.getVocabBookmarks(USER_ID);

        assertEquals(1, result.size());
        assertEquals("Unknown", result.get(0).title());
    }

    @Test
    @DisplayName("getVocabBookmarkIds returns topic IDs only")
    void getVocabBookmarkIds() {
        var bm1 = VocabBookmark.builder().userId(USER_ID).topicId("t1").build();
        bm1.setId("bm1");
        var bm2 = VocabBookmark.builder().userId(USER_ID).topicId("t2").build();
        bm2.setId("bm2");
        when(vocabBookmarkRepo.findByUserId(USER_ID)).thenReturn(List.of(bm1, bm2));

        var result = bookmarkService.getVocabBookmarkIds(USER_ID);

        assertEquals(List.of("t1", "t2"), result);
    }

    // ========================================================================
    // Grammar Bookmarks (mirrors vocab logic)
    // ========================================================================

    @Nested
    @DisplayName("toggleGrammarBookmark")
    class ToggleGrammarBookmark {

        @Test
        @DisplayName("adds grammar bookmark when it does not exist")
        void addGrammarBookmark() {
            when(grammarBookmarkRepo.findByUserIdAndTopicId(USER_ID, TOPIC_ID))
                    .thenReturn(Optional.empty());
            var topic = Topic.builder().title("Tenses").description("Verb tenses").level(Level.A2).build();
            topic.setId(TOPIC_ID);
            when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.of(topic));
            when(grammarBookmarkRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = bookmarkService.toggleGrammarBookmark(USER_ID, TOPIC_ID);

            assertTrue(result.bookmarked());
            verify(grammarBookmarkRepo).save(any(GrammarBookmark.class));
        }

        @Test
        @DisplayName("removes grammar bookmark when it already exists")
        void removeGrammarBookmark() {
            var existing = GrammarBookmark.builder().userId(USER_ID).topicId(TOPIC_ID).build();
            existing.setId("gbm-1");
            when(grammarBookmarkRepo.findByUserIdAndTopicId(USER_ID, TOPIC_ID))
                    .thenReturn(Optional.of(existing));

            var result = bookmarkService.toggleGrammarBookmark(USER_ID, TOPIC_ID);

            assertFalse(result.bookmarked());
            verify(grammarBookmarkRepo).delete(existing);
        }
    }
}
