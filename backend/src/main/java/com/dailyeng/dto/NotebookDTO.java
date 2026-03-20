package com.dailyeng.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class NotebookDTO {

    // --- Notebook DTOs ---
    public record NotebookResponse(
            String id, String name, String type, String color, 
            int count, int mastered
    ) {}

    public record CreateNotebookRequest(
            @NotBlank String name, 
            @NotBlank String type, 
            String color
    ) {}

    public record UpdateNotebookRequest(
            String name, 
            String color
    ) {}

    // --- Notebook Item DTOs ---
    public record NotebookItemResponse(
            String id, String word, String pronunciation, List<String> meaning,
            List<String> vietnamese, Object examples, String partOfSpeech,
            String level, String note, List<String> tags, String notebookId,
            int masteryLevel, String lastReviewed, String nextReview
    ) {}

    public record ExampleDTO(String en, String vi) {}

    public record CreateItemRequest(
            @NotBlank String notebookId, @NotBlank String word, String pronunciation,
            @NotNull List<String> meaning, @NotNull List<String> vietnamese,
            @NotNull List<ExampleDTO> examples, String partOfSpeech, String level,
            String note, List<String> tags
    ) {}

    public record UpdateMasteryRequest(
            int masteryLevel
    ) {}
}