package com.dailyeng.service;

import com.dailyeng.entity.*;
import com.dailyeng.entity.enums.HubType;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.entity.enums.LessonType;
import com.dailyeng.entity.enums.QuizType;
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
 * Unit tests for {@link GrammarService}.
 */
@ExtendWith(MockitoExtension.class)
class GrammarServiceTest {

    @Mock private TopicGroupRepository topicGroupRepo;
    @Mock private TopicRepository topicRepo;
    @Mock private GrammarNoteRepository grammarNoteRepo;
    @Mock private LessonRepository lessonRepo;
    @Mock private QuizItemRepository quizItemRepo;
    @Mock private UserTopicProgressRepository userTopicProgressRepo;

    @InjectMocks private GrammarService grammarService;

    private static final String USER_ID = "user-123";
    private static final String TOPIC_ID = "topic-789";

    // ========================================================================
    // getTopicGroups
    // ========================================================================

    @Nested
    @DisplayName("getTopicGroups")
    class GetTopicGroups {

        @Test
        @DisplayName("returns title-cased grammar topic groups")
        void returnsTitleCased() {
            var group = TopicGroup.builder()
                    .name("verb tenses")
                    .hubType(HubType.grammar)
                    .order(1)
                    .subcategories(List.of("present", "past"))
                    .build();
            group.setId("g1");

            when(topicGroupRepo.findByHubTypeOrderByOrderAsc("grammar"))
                    .thenReturn(List.of(group));

            var result = grammarService.getTopicGroups();

            assertEquals(1, result.size());
            assertEquals("Verb Tenses", result.get(0).name());
            assertEquals(List.of("Present", "Past"), result.get(0).subcategories());
        }
    }

    // ========================================================================
    // getTopicsWithProgress
    // ========================================================================

    @Nested
    @DisplayName("getTopicsWithProgress")
    class GetTopicsWithProgress {

        @Test
        @DisplayName("merges topics with user progress")
        @SuppressWarnings("unchecked")
        void mergesWithProgress() {
            var topic = buildTopic(TOPIC_ID, "Present Simple", Level.A1);
            var page = new PageImpl<>(List.of(topic));
            when(topicRepo.findAll(any(Specification.class), any(Pageable.class))).thenReturn(page);

            var progress = UserTopicProgress.builder()
                    .userId(USER_ID).topicId(TOPIC_ID).progress(65).build();
            progress.setId("utp-1");
            when(userTopicProgressRepo.findByUserIdAndTopicIdIn(eq(USER_ID), anyList()))
                    .thenReturn(List.of(progress));

            var result = grammarService.getTopicsWithProgress(USER_ID, null, null, null, 1, 100);

            assertEquals(1, result.topics().size());
            assertEquals(65, result.topics().get(0).progress());
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
        void emptyQuery() {
            assertEquals(List.of(), grammarService.searchTopics(""));
            assertEquals(List.of(), grammarService.searchTopics(null));
        }

        @Test
        @DisplayName("returns mapped results for valid query")
        void validQuery() {
            var topic = buildTopic(TOPIC_ID, "Present Simple", Level.A2);
            when(topicRepo.searchByTitleOrDescription(eq(HubType.grammar), eq("present"), any()))
                    .thenReturn(List.of(topic));

            var result = grammarService.searchTopics("present");

            assertEquals(1, result.size());
            assertEquals("Present Simple", result.get(0).title());
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
            assertNull(grammarService.getTopicById("missing"));
        }

        @Test
        @DisplayName("returns topic detail with notes, lessons, and quizzes")
        void returnDetail() {
            var topic = buildTopic(TOPIC_ID, "Present Simple", Level.A1);
            when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.of(topic));

            var note = GrammarNote.builder()
                    .topicId(TOPIC_ID).title("Form").explanation("S + V(s/es)")
                    .examples(List.of()).build();
            note.setId("gn-1");
            when(grammarNoteRepo.findByTopicId(TOPIC_ID)).thenReturn(List.of(note));

            var lesson = Lesson.builder()
                    .topicId(TOPIC_ID).title("Introduction").type(LessonType.vocabulary)
                    .order(1).build();
            lesson.setId("l-1");
            when(lessonRepo.findByTopicIdOrderByOrderAsc(TOPIC_ID)).thenReturn(List.of(lesson));

            var quiz = QuizItem.builder()
                    .topicId(TOPIC_ID).question("She ___ every day.")
                    .type(QuizType.fill_blank).correctAnswer("runs")
                    .explanation("Present simple for habits").build();
            quiz.setId("q-1");
            when(quizItemRepo.findByTopicId(TOPIC_ID)).thenReturn(List.of(quiz));

            var result = grammarService.getTopicById(TOPIC_ID);

            assertNotNull(result);
            assertEquals("Present Simple", result.title());
            assertEquals(1, result.grammarNotes().size());
            assertEquals(1, result.lessons().size());
            assertEquals(1, result.quizItems().size());
            assertEquals("fill-blank", result.quizItems().get(0).type());
        }
    }

    // ========================================================================
    // getCurrentTopic
    // ========================================================================

    @Nested
    @DisplayName("getCurrentTopic")
    class GetCurrentTopic {

        @Test
        @DisplayName("returns null when no in-progress topic")
        void noProgress() {
            when(userTopicProgressRepo.findCurrentGrammarTopic(USER_ID))
                    .thenReturn(Optional.empty());
            assertNull(grammarService.getCurrentTopic(USER_ID));
        }

        @Test
        @DisplayName("calculates correct lesson position")
        void calculatesPosition() {
            var progress = UserTopicProgress.builder()
                    .userId(USER_ID).topicId(TOPIC_ID).progress(50).build();
            progress.setId("utp-1");
            when(userTopicProgressRepo.findCurrentGrammarTopic(USER_ID))
                    .thenReturn(Optional.of(progress));

            var topic = buildTopic(TOPIC_ID, "Present Simple", Level.A1);
            when(topicRepo.findById(TOPIC_ID)).thenReturn(Optional.of(topic));

            // 4 total lessons, 50% progress → floor(0.5 * 4) = 2 → "Lesson 3 of 4"
            var lessons = List.of(
                    buildLesson("l1"), buildLesson("l2"),
                    buildLesson("l3"), buildLesson("l4"));
            when(lessonRepo.findByTopicIdOrderByOrderAsc(TOPIC_ID)).thenReturn(lessons);

            var result = grammarService.getCurrentTopic(USER_ID);

            assertNotNull(result);
            assertEquals("Present Simple", result.title());
            assertEquals("Lesson 3 of 4", result.subtitle());
        }
    }

    // ========================================================================
    // Test helpers
    // ========================================================================

    private Topic buildTopic(String id, String title, Level level) {
        var topicGroup = TopicGroup.builder().name("tenses").hubType(HubType.grammar).build();
        topicGroup.setId("tg-1");
        var topic = Topic.builder()
                .title(title).description("Test grammar topic").level(level)
                .estimatedTime(45).category("Tenses").subcategory("Present")
                .build();
        topic.setId(id);
        topic.setTopicGroup(topicGroup);
        return topic;
    }

    private Lesson buildLesson(String id) {
        var lesson = Lesson.builder()
                .topicId(TOPIC_ID).title("Lesson " + id)
                .type(LessonType.vocabulary).order(0).build();
        lesson.setId(id);
        return lesson;
    }
}
