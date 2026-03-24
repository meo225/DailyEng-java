package com.dailyeng.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

/**
 * DTO representing a single notification in API responses.
 */
public record NotificationResult(
        String id,
        String title,
        String message,
        String type,
        @JsonProperty("isRead") boolean isRead,
        LocalDateTime createdAt
) {}
