package com.dailyeng.service;

import com.dailyeng.dto.vocab.VocabDtos.*;
import com.dailyeng.entity.Topic;
import com.dailyeng.entity.UserVocabProgress;
import com.dailyeng.entity.VocabItem;
import com.dailyeng.entity.enums.HubType;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.repository.TopicGroupRepository;
import com.dailyeng.repository.TopicRepository;
import com.dailyeng.repository.UserVocabProgressRepository;
import com.dailyeng.repository.VocabItemRepository;
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
 * Vocabulary module service — topic groups, paginated topics with progress,
 * search, and single topic detail.
 * <p>
 * Ported from {@code src/actions/vocab.ts}.
 */
@Service
@RequiredArgsConstructor
public class VocabService {

    private final TopicGroupRepository topicGroupRepo;
    private final TopicRepository topicRepo;
    private final VocabItemRepository vocabItemRepo;
    private final UserVocabProgressRepository userVocabProgressRepo;

    // ========================================================================
    // 1. getVocabTopicGroups
    // ========================================================================

    @Cacheable("vocabTopicGroups")
    @Transactional(readOnly = true)
    public List<TopicGroupResponse> getTopicGroups() {
        var groups = topicGroupRepo.findByHubTypeOrderByOrderAsc("vocab");
        return groups.stream()
                .map(g -> new TopicGroupResponse(
                        g.getId(),
                        toTitleCase(g.getName()),
                        g.getSubcategories() != null
                                ? g.getSubcategories().stream().map(this::toTitleCase).toList()
                                : List.of()))
                .toList();
    }

    // ========================================================================
    // 2. getVocabTopicsWithProgress
    // ========================================================================

    @Transactional(readOnly = true)
    public VocabTopicListResponse getTopicsWithProgress(
            String userId, String category, String subcategory,
            List<String> levels, int page, int limit
    ) {
        // Dynamic specification for filtering
        Specification<Topic> spec = buildVocabTopicSpec(category, subcategory, levels);

        var pageable = PageRequest.of(page - 1, limit,
                Sort.by("topicGroup.order", "order"));
        var topicPage = topicRepo.findAll(spec, pageable);

        // Batch-load user progress per topic
        var topicIds = topicPage.getContent().stream().map(Topic::getId).toList();
        Map<String, Integer> progressMap = userId != null
                ? calculateTopicProgress(userId, topicIds)
                : Map.of();

        var items = topicPage.getContent().stream().map(t -> {
            int progress = progressMap.getOrDefault(t.getId(), 0);
            return new VocabTopicListItem(
                    t.getId(),
                    t.getTitle(),
                    t.getDescription() != null ? t.getDescription() : "",
                    t.getLevel() != null ? t.getLevel().name() : "A1",
                    t.getTopicGroup() != null ? toTitleCase(t.getTopicGroup().getName()) : "General",
                    t.getSubcategory() != null ? toTitleCase(t.getSubcategory()) : "",
                    t.getVocabItems() != null ? t.getVocabItems().size() : t.getWordCount(),
                    t.getEstimatedTime() > 0 ? t.getEstimatedTime() : 30,
                    t.getThumbnail() != null ? t.getThumbnail() : "/learning.png",
                    progress);
        }).toList();

        return new VocabTopicListResponse(
                items, topicPage.getTotalElements(),
                topicPage.getTotalPages(), page);
    }

    // ========================================================================
    // 3. searchVocabTopics
    // ========================================================================

    @Transactional(readOnly = true)
    public List<VocabTopicListItem> searchTopics(String query) {
        if (query == null || query.isBlank()) return List.of();

        var topics = topicRepo.searchByTitleOrDescription(
                HubType.vocab, query, PageRequest.of(0, 50));

        return topics.stream().map(t -> new VocabTopicListItem(
                t.getId(),
                t.getTitle(),
                t.getDescription() != null ? t.getDescription() : "",
                t.getLevel() != null ? t.getLevel().name() : "A1",
                t.getTopicGroup() != null ? toTitleCase(t.getTopicGroup().getName()) : "General",
                t.getSubcategory() != null ? toTitleCase(t.getSubcategory()) : "",
                t.getVocabItems() != null ? t.getVocabItems().size() : t.getWordCount(),
                t.getEstimatedTime() > 0 ? t.getEstimatedTime() : 30,
                t.getThumbnail() != null ? t.getThumbnail() : "/learning.png",
                0)
        ).toList();
    }

    // ========================================================================
    // 4. getVocabTopicById
    // ========================================================================

    @Transactional(readOnly = true)
    public VocabTopicDetailResponse getTopicById(String topicId, String userId) {
        var topic = topicRepo.findById(topicId).orElse(null);
        if (topic == null) return null;

        // Get user mastery per vocab item
        var vocabItems = vocabItemRepo.findByTopicId(topicId);
        Map<String, Integer> masteryMap = Map.of();
        if (userId != null && !vocabItems.isEmpty()) {
            var itemIds = vocabItems.stream().map(VocabItem::getId).toList();
            masteryMap = userVocabProgressRepo.findByUserIdAndVocabItemIdIn(userId, itemIds)
                    .stream()
                    .collect(Collectors.toMap(
                            UserVocabProgress::getVocabItemId,
                            UserVocabProgress::getMasteryLevel));
        }

        var finalMasteryMap = masteryMap;
        var vocabDtos = vocabItems.stream().map(item -> new VocabItemResponse(
                item.getId(),
                item.getWord(),
                item.getPartOfSpeech() != null ? item.getPartOfSpeech().name() : null,
                item.getPartOfSpeech() != null ? item.getPartOfSpeech().name() : null,
                item.getPhonBr(),
                item.getPhonNAm(),
                item.getPronunciation(),
                item.getMeaning(),
                item.getVietnameseMeaning(),
                item.getExampleSentence(),
                item.getExampleTranslation(),
                item.getDefinitions(),
                item.getSynonyms() != null ? item.getSynonyms() : List.of(),
                item.getAntonyms() != null ? item.getAntonyms() : List.of(),
                item.getCollocations() != null ? item.getCollocations() : List.of(),
                finalMasteryMap.getOrDefault(item.getId(), 0)
        )).toList();

        return new VocabTopicDetailResponse(
                topic.getId(),
                topic.getTitle(),
                topic.getSubtitle() != null ? topic.getSubtitle() : "",
                topic.getDescription(),
                topic.getLevel() != null ? topic.getLevel().name() : "A1",
                topic.getWordCount(),
                topic.getEstimatedTime(),
                topic.getThumbnail(),
                topic.getCategory(),
                topic.getSubcategory(),
                vocabDtos);
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    /**
     * Build dynamic Specification for filtering vocab topics by category,
     * subcategory, levels, and hubType = vocab.
     */
    private Specification<Topic> buildVocabTopicSpec(
            String category, String subcategory, List<String> levels
    ) {
        Specification<Topic> spec = (root, query, cb) ->
                cb.equal(root.get("topicGroup").get("hubType"), HubType.vocab);

        if (category != null && !category.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("topicGroup").get("name")), category.toLowerCase()));
        }
        if (subcategory != null && !subcategory.isBlank() && !"All".equals(subcategory)) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("subcategory")), subcategory.toLowerCase()));
        }
        if (levels != null && !levels.isEmpty()) {
            var levelEnums = levels.stream()
                    .map(l -> Level.valueOf(l.toUpperCase()))
                    .toList();
            spec = spec.and((root, query, cb) -> root.get("level").in(levelEnums));
        }
        return spec;
    }

    /**
     * Calculate per-topic vocab mastery percentage.
     * A vocab item is "mastered" when masteryLevel >= 100.
     */
    private Map<String, Integer> calculateTopicProgress(String userId, List<String> topicIds) {
        if (topicIds.isEmpty()) return Map.of();

        // Batch-load all vocab items for these topics
        var allVocabItems = topicIds.stream()
                .flatMap(id -> vocabItemRepo.findByTopicId(id).stream())
                .toList();
        if (allVocabItems.isEmpty()) return Map.of();

        // Batch-load user progress
        var vocabItemIds = allVocabItems.stream().map(VocabItem::getId).toList();
        var progressList = userVocabProgressRepo.findByUserIdAndVocabItemIdIn(userId, vocabItemIds);
        var masteryMap = progressList.stream()
                .collect(Collectors.toMap(UserVocabProgress::getVocabItemId, UserVocabProgress::getMasteryLevel));

        // Group by topic and calculate percentage
        Map<String, Integer> result = new HashMap<>();
        var byTopic = allVocabItems.stream().collect(Collectors.groupingBy(VocabItem::getTopicId));
        for (var entry : byTopic.entrySet()) {
            int total = entry.getValue().size();
            long mastered = entry.getValue().stream()
                    .filter(v -> masteryMap.getOrDefault(v.getId(), 0) >= 100)
                    .count();
            result.put(entry.getKey(), total > 0 ? (int) Math.round((double) mastered / total * 100) : 0);
        }
        return result;
    }

    private String toTitleCase(String str) {
        if (str == null || str.isBlank()) return str;
        return Arrays.stream(str.split(" "))
                .map(w -> w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1))
                .collect(Collectors.joining(" "));
    }
}
