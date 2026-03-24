package com.dailyeng.notification.dto;

import java.util.List;

/**
 * Paginated response for the GET /notifications endpoint.
 */
public record GetNotificationsResponse(
        List<NotificationResult> notifications,
        long total,
        int totalPages,
        int currentPage,
        long unreadCount
) {}
