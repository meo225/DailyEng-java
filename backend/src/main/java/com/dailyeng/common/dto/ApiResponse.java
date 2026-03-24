package com.dailyeng.common.dto;

/**
 * Standard API response wrapper for operations that return success/error status.
 * Matches the { success, error } pattern used throughout the original Next.js actions.
 */
public record ApiResponse(
        boolean success,
        String error
) {
    public static ApiResponse ok() {
        return new ApiResponse(true, null);
    }

    public static ApiResponse fail(String error) {
        return new ApiResponse(false, error);
    }
}
