package com.dailyeng.dorara;

import java.util.List;

/**
 * Nơi chứa các cấu trúc dữ liệu giao tiếp với Frontend.
 */
public final class DoraraDtos {

    public record ChatMessage(
            String role,
            String content
    ) {}

    // Dữ liệu nhận từ Frontend chứa Lịch sử Chat và Lời nhắn mới
    public record ChatRequest(
            List<ChatMessage> messages,
            String userMessage,
            String currentPage,
            String targetLanguage
    ) {}

    // ── Rich UI Enrichment (Post-Streaming) ───────────────────────────────

    // Request: Frontend gửi lên nội dung AI vừa trả lời để phân tích
    public record EnrichRequest(
            String aiResponse,      // Full text AI vừa stream xong
            String userMessage,     // Câu hỏi ban đầu của user
            String targetLanguage   // "en" | "ja" etc.
    ) {}

    // Vocab highlight từng từ
    public record VocabHighlight(
            String word,
            String phonetic,
            String meaning,
            String example
    ) {}

    // Câu hỏi Quiz trắc nghiệm
    public record QuizQuestion(
            String question,
            List<String> options,
            int correctIndex,
            String explanation
    ) {}

    // Response trả về cho Frontend
    public record EnrichResponse(
            List<VocabHighlight> vocabHighlights,
            QuizQuestion quizQuestion
    ) {}
}
