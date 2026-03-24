package com.dailyeng.grammar;

import com.dailyeng.vocabulary.UserTopicProgressRepository;
import com.dailyeng.vocabulary.QuizItemRepository;
import com.dailyeng.vocabulary.LessonRepository;
import com.dailyeng.vocabulary.TopicGroupRepository;
import com.dailyeng.vocabulary.TopicRepository;

import com.dailyeng.grammar.GrammarDtos.*;
import com.dailyeng.vocabulary.Topic;
import com.dailyeng.common.enums.HubType;
import com.dailyeng.common.enums.Level;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Grammar module service — topic groups, paginated topics with progress,
 * search, single topic detail, and current in-progress topic.
 * <p>
 * Ported from {@code src/actions/grammar.ts}.
 */
@Service
@RequiredArgsConstructor
public class GrammarService {

        private final TopicGroupRepository topicGroupRepo;
        private final TopicRepository topicRepo;
        private final GrammarNoteRepository grammarNoteRepo;
        private final LessonRepository lessonRepo;
        private final QuizItemRepository quizItemRepo;
        private final UserTopicProgressRepository userTopicProgressRepo;

        // ========================================================================
        // 1. getGrammarTopicGroups
        // ========================================================================

        @Cacheable(value = "grammarTopicGroups", key = "#language")
        @Transactional(readOnly = true)
        public List<TopicGroupResponse> getTopicGroups(String language) {
                var groups = topicGroupRepo.findByHubTypeAndLanguageOrderByOrderAsc("grammar", language);
                return groups.stream()
                                .map(g -> new TopicGroupResponse(
                                                g.getId(),
                                                toTitleCase(g.getName()),
                                                g.getSubcategories() != null
                                                                ? g.getSubcategories().stream().map(this::toTitleCase)
                                                                                .toList()
                                                                : List.of()))
                                .toList();
        }

        // ========================================================================
        // 2. getGrammarTopicsWithProgress
        // ========================================================================

        @Transactional(readOnly = true)
        public GrammarTopicListResponse getTopicsWithProgress(
                        String userId, String language, String category, String subcategory,
                        List<String> levels, int page, int limit) {
                Specification<Topic> spec = buildGrammarTopicSpec(language, category, subcategory, levels);

                var pageable = PageRequest.of(page - 1, limit,
                                Sort.by("category", "subcategory", "order"));
                var topicPage = topicRepo.findAll(spec, pageable);

                // Batch user progress lookup
                var topicIds = topicPage.getContent().stream().map(Topic::getId).toList();
                Map<String, Integer> progressMap = Map.of();
                if (userId != null && !topicIds.isEmpty()) {
                        progressMap = userTopicProgressRepo.findByUserIdAndTopicIdIn(userId, topicIds)
                                        .stream()
                                        .collect(Collectors.toMap(
                                                        p -> p.getTopicId(),
                                                        p -> p.getProgress(),
                                                        (a, b) -> a));
                }

                var finalProgressMap = progressMap;
                var items = topicPage.getContent().stream().map(t -> {
                        int progress = finalProgressMap.getOrDefault(t.getId(), 0);
                        int lessonCount = t.getLessons() != null ? t.getLessons().size() : 0;
                        return new GrammarTopicListItem(
                                        t.getId(),
                                        t.getTitle(),
                                        t.getDescription(),
                                        t.getLevel() != null ? t.getLevel().name() : "A1",
                                        t.getCategory() != null ? t.getCategory() : "Tenses",
                                        t.getSubcategory() != null ? t.getSubcategory() : "All",
                                        lessonCount,
                                        t.getEstimatedTime(),
                                        progress,
                                        t.getThumbnail());
                }).toList();

                return new GrammarTopicListResponse(
                                items, topicPage.getTotalElements(),
                                topicPage.getTotalPages(), page);
        }

        // ========================================================================
        // 3. searchGrammarTopics
        // ========================================================================

        @Transactional(readOnly = true)
        public List<GrammarTopicListItem> searchTopics(String query, String language) {
                if (query == null || query.isBlank())
                        return List.of();

                var topics = topicRepo.searchByTitleOrDescription(
                                HubType.grammar, language, query, PageRequest.of(0, 50));

                return topics.stream().map(t -> new GrammarTopicListItem(
                                t.getId(),
                                t.getTitle(),
                                t.getDescription(),
                                t.getLevel() != null ? t.getLevel().name() : "A1",
                                t.getCategory() != null ? t.getCategory() : "Tenses",
                                t.getSubcategory() != null ? t.getSubcategory() : "All",
                                t.getLessons() != null ? t.getLessons().size() : 0,
                                t.getEstimatedTime(),
                                0,
                                t.getThumbnail())).toList();
        }

        // ========================================================================
        // 4. getGrammarTopicById
        // ========================================================================

        @Cacheable(value = "grammarTopicDetail", key = "#topicId")
        @Transactional(readOnly = true)
        public GrammarTopicDetailResponse getTopicById(String topicId) {
                var topic = topicRepo.findById(topicId).orElse(null);
                if (topic == null)
                        return null;

                var grammarNotes = grammarNoteRepo.findByTopicId(topicId).stream()
                                .map(n -> new GrammarNoteResponse(
                                                n.getId(), n.getTitle(), n.getExplanation(), n.getExamples()))
                                .toList();

                var lessons = lessonRepo.findByTopicIdOrderByOrderAsc(topicId).stream()
                                .map(l -> new LessonResponse(
                                                l.getId(), l.getTitle(), l.getDescription(),
                                                l.getDuration(),
                                                l.getType() != null ? l.getType().name() : null,
                                                l.getOrder()))
                                .toList();

                var quizItems = quizItemRepo.findByTopicId(topicId).stream()
                                .map(q -> new QuizItemResponse(
                                                q.getId(), q.getQuestion(),
                                                q.getType() != null ? q.getType().getDbValue() : null,
                                                q.getOptions() != null ? q.getOptions() : List.of(),
                                                q.getCorrectAnswer(), q.getExplanation()))
                                .toList();

                return new GrammarTopicDetailResponse(
                                topic.getId(),
                                topic.getTitle(),
                                topic.getDescription(),
                                topic.getLevel() != null ? topic.getLevel().name() : "A1",
                                topic.getCategory() != null ? topic.getCategory() : "Grammar",
                                topic.getSubcategory() != null ? topic.getSubcategory() : "",
                                lessons.size(),
                                topic.getEstimatedTime(),
                                topic.getThumbnail(),
                                grammarNotes, lessons, quizItems);
        }

        // ========================================================================
        // 5. getCurrentGrammarTopic
        // ========================================================================

        @Transactional(readOnly = true)
        public CurrentGrammarTopicResponse getCurrentTopic(String userId) {
                var progressOpt = userTopicProgressRepo.findCurrentGrammarTopic(userId);
                if (progressOpt.isEmpty())
                        return null;

                var progress = progressOpt.get();
                var topic = topicRepo.findById(progress.getTopicId()).orElse(null);
                if (topic == null)
                        return null;

                int totalLessons = lessonRepo.findByTopicIdOrderByOrderAsc(topic.getId()).size();
                int completedLessons = (int) Math.floor((double) progress.getProgress() / 100 * totalLessons);

                String subtitle = "Lesson " + (completedLessons + 1) + " of " + totalLessons;
                return new CurrentGrammarTopicResponse(topic.getId(), topic.getTitle(), subtitle);
        }

        // ========================================================================
        // Private helpers
        // ========================================================================

        private Specification<Topic> buildGrammarTopicSpec(
                        String language, String category, String subcategory, List<String> levels) {
                Specification<Topic> spec = (root, query, cb) -> cb.and(
                                cb.equal(root.get("topicGroup").get("hubType"), HubType.grammar),
                                cb.equal(root.get("topicGroup").get("language"), language));

                if (category != null && !category.isBlank()) {
                        spec = spec.and((root, query, cb) -> cb.equal(root.get("category"), category));
                }
                if (subcategory != null && !subcategory.isBlank() && !"All".equals(subcategory)) {
                        spec = spec.and((root, query, cb) -> cb.equal(root.get("subcategory"), subcategory));
                }
                if (levels != null && !levels.isEmpty()) {
                        var levelEnums = levels.stream()
                                        .map(l -> Level.valueOf(l.toUpperCase()))
                                        .toList();
                        spec = spec.and((root, query, cb) -> root.get("level").in(levelEnums));
                }
                return spec;
        }

        private String toTitleCase(String str) {
                if (str == null || str.isBlank())
                        return str;
                return Arrays.stream(str.split(" "))
                                .map(w -> w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1))
                                .collect(Collectors.joining(" "));
        }
}
