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
}
