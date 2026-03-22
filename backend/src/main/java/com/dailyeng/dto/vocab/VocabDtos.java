package com.dailyeng.dto.vocab;

import java.util.List;

/**
 * All Vocabulary module DTOs as Java 21 records.
 * Mirrors the response shapes from vocab.ts Server Actions.
 */
public final class VocabDtos {

    private VocabDtos() {}

    // ============================== Responses ==============================

    /** Topic group with subcategories — shared by vocab and grammar hubs. */
    public record TopicGroupResponse(String id, String name, List<String> subcategories) {}

    /** Single vocab topic in a paginated list. */
    public record VocabTopicListItem(
            String id, String title, String description,
            String level, String category, String subcategory,
            int wordCount, int estimatedTime, String thumbnail,
            int progress
    ) {}

    /** Paginated vocab topic list response. */
    public record VocabTopicListResponse(
            List<VocabTopicListItem> topics,
            long total,
            int totalPages,
            int currentPage
    ) {}

    /** Single vocab item within a topic detail view. */
    public record VocabItemResponse(
            String id, String word, String type, String partOfSpeech,
            String phonBr, String phonNAm, String pronunciation,
            String meaning, String vietnameseMeaning,
            String exampleSentence, String exampleTranslation,
            Object definitions,
            List<String> synonyms, List<String> antonyms, List<String> collocations,
            int masteryLevel
    ) {}

    /** Full topic detail with embedded vocab items. */
    public record VocabTopicDetailResponse(
            String id, String title, String subtitle, String description,
            String level, int wordCount, int estimatedTime,
            String thumbnail, String category, String subcategory,
            List<VocabItemResponse> vocab
    ) {}
}
