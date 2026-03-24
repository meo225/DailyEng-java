package com.dailyeng.common.dto;

import java.util.List;

/**
 * Generic paginated response DTO using Java record.
 * Replaces the pattern of returning { items, total, totalPages, currentPage }.
 *
 * @param <T> the type of items in the page
 */
public record PageResponse<T>(
        List<T> items,
        long total,
        int totalPages,
        int currentPage
) {
    /**
     * Factory method to create a PageResponse from a list, total count, and pagination params.
     */
    public static <T> PageResponse<T> of(List<T> items, long total, int page, int limit) {
        int totalPages = (int) Math.ceil((double) total / limit);
        return new PageResponse<>(items, total, totalPages, page);
    }
}
