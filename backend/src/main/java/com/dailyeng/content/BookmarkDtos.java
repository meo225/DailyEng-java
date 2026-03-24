package com.dailyeng.content;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

/**
 * All Bookmark module DTOs as Java 21 records (Vocab + Grammar).
 * Compact and immutable request/response types.
 */
public final class BookmarkDtos {

    private BookmarkDtos() {}

    // ============================== Requests ==============================

    public record ToggleBookmarkRequest(@NotBlank String topicId) {}

    // ============================== Responses ==============================

    public record ToggleBookmarkResponse(boolean bookmarked) {}

    public record BookmarkItem(
            String id, String topicId, String title,
            String description, String level, String image,
            String category, String createdAt
    ) {}

    public record BookmarkListResponse(
            List<BookmarkItem> bookmarks, List<String> bookmarkIds,
            long total, int totalPages, int currentPage
    ) {}
}
