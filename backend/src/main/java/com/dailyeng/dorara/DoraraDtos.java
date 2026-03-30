package com.dailyeng.dorara;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public final class DoraraDtos {

    private DoraraDtos() {}

    // ── Request DTOs ────────────────────────────────────────────────────

    public record DoraraChatMessage(
            String id,
            @Pattern(regexp = "user|tutor") String role,
            @NotBlank @Size(max = 2000) String content
    ) {}

    public record DoraraChatRequest(
            @NotNull @Valid List<DoraraChatMessage> messages,
            @NotBlank @Size(max = 2000) String userMessage,
            String currentPage
    ) {}

    // ── Structured AI sub-types ─────────────────────────────────────────

    /** Vocabulary highlight embedded in a response — rendered as an inline card. */
    public record VocabHighlight(
            String word,
            String phonetic,
            String meaning,
            String example
    ) {}

    /** Interactive mini-quiz question embedded in a response. */
    public record QuizQuestion(
            String question,
            List<String> options,
            int correctIndex,
            String explanation
    ) {}

    // ── Response DTO ────────────────────────────────────────────────────

    public record DoraraChatResponse(
            String response,
            List<String> suggestedActions,
            List<VocabHighlight> vocabHighlights,
            QuizQuestion quizQuestion,
            String error
    ) {
        /** Convenience: error-only response. */
        public static DoraraChatResponse error(String error) {
            return new DoraraChatResponse("", List.of(), List.of(), null, error);
        }
    }
}
