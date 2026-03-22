package com.dailyeng.dto.grammar;

import java.util.List;

/**
 * All Grammar module DTOs as Java 21 records.
 * Mirrors the response shapes from grammar.ts Server Actions.
 */
public final class GrammarDtos {

    private GrammarDtos() {}

    // ============================== Responses ==============================

    /** Topic group with subcategories. */
    public record TopicGroupResponse(String id, String name, List<String> subcategories) {}

    /** Single grammar topic in a paginated list. */
    public record GrammarTopicListItem(
            String id, String title, String description,
            String level, String category, String subcategory,
            int lessonCount, int estimatedTime,
            int progress, String thumbnail
    ) {}

    /** Paginated grammar topic list response. */
    public record GrammarTopicListResponse(
            List<GrammarTopicListItem> topics,
            long total,
            int totalPages,
            int currentPage
    ) {}

    /** Grammar note with bilingual examples. */
    public record GrammarNoteResponse(
            String id, String title, String explanation, Object examples
    ) {}

    /** Lesson summary within a grammar topic. */
    public record LessonResponse(
            String id, String title, String description,
            String duration, String type, int order
    ) {}

    /** Quiz item within a grammar topic. */
    public record QuizItemResponse(
            String id, String question, String type,
            List<String> options, String correctAnswer, String explanation
    ) {}

    /** Full grammar topic detail with notes, lessons, and quizzes. */
    public record GrammarTopicDetailResponse(
            String id, String title, String description,
            String level, String category, String subcategory,
            int lessonCount, int estimatedTime, String thumbnail,
            List<GrammarNoteResponse> grammarNotes,
            List<LessonResponse> lessons,
            List<QuizItemResponse> quizItems
    ) {}

    /** Current in-progress grammar topic summary. */
    public record CurrentGrammarTopicResponse(String id, String title, String subtitle) {}
}
