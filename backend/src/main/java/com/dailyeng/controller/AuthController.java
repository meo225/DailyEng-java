package com.dailyeng.controller;

import com.dailyeng.config.AppProperties;
import com.dailyeng.dto.auth.*;
import com.dailyeng.security.JwtTokenProvider;
import com.dailyeng.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Authentication REST controller with httpOnly cookie-based JWT.
 * <p>
 * Auth endpoints (/auth/**) are public (configured in SecurityConfig).
 * Tokens are set as httpOnly cookies — never exposed to JavaScript.
 * <p>
 * Cookie layout:
 * - access_token  → httpOnly, Secure, SameSite=Lax, Path=/api, Max-Age=24h
 * - refresh_token → httpOnly, Secure, SameSite=Lax, Path=/api/auth, Max-Age=7d
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AppProperties appProperties;

    // ======================== Registration & Login ========================

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response) {
        var authResult = authService.register(request);
        setCookies(response, authResult.accessToken(), authResult.refreshToken());
        return ResponseEntity.status(HttpStatus.CREATED).body(authResult.withoutTokens());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        var authResult = authService.login(request);
        setCookies(response, authResult.accessToken(), authResult.refreshToken());
        return ResponseEntity.ok(authResult.withoutTokens());
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(
            @Valid @RequestBody GoogleAuthRequest request,
            HttpServletResponse response) {
        var authResult = authService.googleLogin(request);
        setCookies(response, authResult.accessToken(), authResult.refreshToken());
        return ResponseEntity.ok(authResult.withoutTokens());
    }

    // ======================== Session Management ========================

    /**
     * GET /auth/me — Return current user info from JWT cookie.
     * Used by the frontend to hydrate auth state on page load.
     */
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(HttpServletRequest request) {
        String token = extractAccessToken(request);
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.error());
        }

        String userId = jwtTokenProvider.getUserIdFromToken(token);
        var user = authService.getUserInfo(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.error());
        }

        return ResponseEntity.ok(new AuthResponse(true, null, null, user));
    }

    /**
     * POST /auth/refresh — Silent token refresh using refresh_token cookie.
     * Issues a new access_token cookie if the refresh token is valid.
     */
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request);
        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)
                || !jwtTokenProvider.isRefreshToken(refreshToken)) {
            clearCookies(response);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false));
        }

        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);
        String newAccessToken = jwtTokenProvider.generateToken(userId);

        setAccessTokenCookie(response, newAccessToken);
        return ResponseEntity.ok(Map.of("success", true));
    }

    /**
     * POST /auth/logout — Clear auth cookies.
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletResponse response) {
        clearCookies(response);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // ======================== Password Management ========================

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, Object>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request.email());
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(
            HttpServletRequest request,
            @Valid @RequestBody ChangePasswordRequest changeRequest) {
        String token = extractAccessToken(request);
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "Not authenticated"));
        }
        String userId = jwtTokenProvider.getUserIdFromToken(token);
        authService.changePassword(userId, changeRequest);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // ======================== Cookie Helpers ========================

    private void setCookies(HttpServletResponse response, String accessToken, String refreshToken) {
        setAccessTokenCookie(response, accessToken);
        setRefreshTokenCookie(response, refreshToken);
    }

    private void setAccessTokenCookie(HttpServletResponse response, String accessToken) {
        var cookieConfig = appProperties.getCookie();
        Cookie cookie = new Cookie("access_token", accessToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieConfig.isSecure());
        cookie.setPath("/");
        cookie.setMaxAge(cookieConfig.getAccessMaxAge());
        if (cookieConfig.getDomain() != null && !cookieConfig.getDomain().isBlank()) {
            cookie.setDomain(cookieConfig.getDomain());
        }
        cookie.setAttribute("SameSite", cookieConfig.getSameSite());
        response.addCookie(cookie);
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        var cookieConfig = appProperties.getCookie();
        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieConfig.isSecure());
        cookie.setPath("/");
        cookie.setMaxAge(cookieConfig.getRefreshMaxAge());
        if (cookieConfig.getDomain() != null && !cookieConfig.getDomain().isBlank()) {
            cookie.setDomain(cookieConfig.getDomain());
        }
        cookie.setAttribute("SameSite", cookieConfig.getSameSite());
        response.addCookie(cookie);
    }

    private void clearCookies(HttpServletResponse response) {
        var cookieConfig = appProperties.getCookie();

        Cookie accessCookie = new Cookie("access_token", "");
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(cookieConfig.isSecure());
        accessCookie.setPath("/");
        accessCookie.setMaxAge(0);
        accessCookie.setAttribute("SameSite", cookieConfig.getSameSite());
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refresh_token", "");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(cookieConfig.isSecure());
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        refreshCookie.setAttribute("SameSite", cookieConfig.getSameSite());
        response.addCookie(refreshCookie);
    }

    /**
     * Extract access_token from cookie, fallback to Authorization header.
     */
    private String extractAccessToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if ("access_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * Extract refresh_token from cookie.
     */
    private String extractRefreshToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if ("refresh_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
