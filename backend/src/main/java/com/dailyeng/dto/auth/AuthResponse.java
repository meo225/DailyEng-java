package com.dailyeng.dto.auth;

public record AuthResponse(
        boolean success,
        String accessToken,
        String refreshToken,
        UserInfo user
) {
    public record UserInfo(String id, String name, String email, String image) {}

    public static AuthResponse success(String accessToken, String refreshToken, UserInfo user) {
        return new AuthResponse(true, accessToken, refreshToken, user);
    }

    public static AuthResponse error() {
        return new AuthResponse(false, null, null, null);
    }

    /**
     * Return a response with tokens stripped — used when tokens are sent via httpOnly cookies.
     */
    public AuthResponse withoutTokens() {
        return new AuthResponse(this.success, null, null, this.user);
    }
}
