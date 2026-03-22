package com.dailyeng.dto.notebook;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * All Notebook module DTOs as Java 21 records.
 * Compact and immutable request/response types.
 */
public final class NotebookDtos {

    private NotebookDtos() {}

    // ============================== Requests ==============================

    public record CreateNotebookRequest(
            @NotBlank String name,
            @NotBlank String type,
            String color
    ) {}

    public record UpdateNotebookRequest(
            String name,
            String color
    ) {}

    public record CreateItemRequest(
            @NotBlank String notebookId,
            @NotBlank String word,
            String pronunciation,
            @NotNull List<String> meaning,
            @NotNull List<String> vietnamese,
            @NotNull List<ExampleDto> examples,
            String partOfSpeech,
            String level,
            String note,
            List<String> tags
    ) {}

    public record ExampleDto(String en, String vi) {}

    public record UpdateItemRequest(
            String pronunciation,
            List<String> meaning,
            List<String> vietnamese,
            List<ExampleDto> examples,
            String partOfSpeech,
            String level,
            String note,
            List<String> tags
    ) {}

    public record UpdateMasteryRequest(int masteryLevel) {}

    // ============================== Responses ==============================

    public record NotebookResponse(
            String id, String name, String type, String color,
            int itemCount, int masteredCount
    ) {}

    public record NotebookItemResponse(
            String id, String word, String pronunciation,
            List<String> meaning, List<String> vietnamese,
            Object examples, String partOfSpeech, String level,
            String note, List<String> tags, String notebookId,
            String notebookName, String notebookColor,
            int masteryLevel, boolean isStarred,
            String lastReviewed, String nextReview,
            String createdAt
    ) {}

    public record NotebookListResponse(
            List<NotebookResponse> notebooks, int total
    ) {}
}
