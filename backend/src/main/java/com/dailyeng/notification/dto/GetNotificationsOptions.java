package com.dailyeng.notification.dto;

/**
 * Query options for listing notifications (page, limit, sort, search).
 */
public record GetNotificationsOptions(
        Integer page,
        Integer limit,
        String sortOrder,
        String searchQuery
) {
    /**
     * Compact constructor providing sensible defaults for null values.
     */
    public GetNotificationsOptions {
        page = (page != null && page > 0) ? page : 1;
        limit = (limit != null && limit > 0) ? limit : 10;
        sortOrder = "oldest".equalsIgnoreCase(sortOrder) ? "oldest" : "newest";
        searchQuery = (searchQuery != null) ? searchQuery.trim() : "";
    }
}
