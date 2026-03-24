package com.dailyeng.auth.security;

import com.dailyeng.config.AppProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link JwtTokenProvider}.
 * Uses real AppProperties with a test secret — no Spring context needed.
 */
class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    private static final String TEST_SECRET = "this-is-a-very-long-secret-key-for-testing-jwt-provider-at-least-64-chars";
    private static final String USER_ID = "user-12345";

    @BeforeEach
    void setUp() {
        var props = new AppProperties();
        props.getJwt().setSecret(TEST_SECRET);
        props.getJwt().setExpirationMs(3600000);       // 1 hour
        props.getJwt().setRefreshExpirationMs(7200000); // 2 hours
        tokenProvider = new JwtTokenProvider(props);
    }

    @Test
    @DisplayName("generate + validate round-trip succeeds")
    void generateAndValidate() {
        String token = tokenProvider.generateToken(USER_ID);

        assertNotNull(token);
        assertFalse(token.isBlank());
        assertTrue(tokenProvider.validateToken(token));
    }

    @Test
    @DisplayName("extracts correct user ID from token")
    void extractUserId() {
        String token = tokenProvider.generateToken(USER_ID);

        String extractedId = tokenProvider.getUserIdFromToken(token);

        assertEquals(USER_ID, extractedId);
    }

    @Test
    @DisplayName("refresh token is valid and contains user ID")
    void refreshToken() {
        String refreshToken = tokenProvider.generateRefreshToken(USER_ID);

        assertNotNull(refreshToken);
        assertTrue(tokenProvider.validateToken(refreshToken));
        assertEquals(USER_ID, tokenProvider.getUserIdFromToken(refreshToken));
    }

    @Test
    @DisplayName("rejects tampered token")
    void tamperedToken() {
        String token = tokenProvider.generateToken(USER_ID);
        // Tamper with the payload section (middle part between dots)
        String[] parts = token.split("\\.");
        char[] payloadChars = parts[1].toCharArray();
        payloadChars[0] = payloadChars[0] == 'a' ? 'b' : 'a';
        String tampered = parts[0] + "." + new String(payloadChars) + "." + parts[2];

        assertFalse(tokenProvider.validateToken(tampered));
    }

    @Test
    @DisplayName("rejects empty/null token")
    void emptyToken() {
        assertFalse(tokenProvider.validateToken(""));
        assertFalse(tokenProvider.validateToken("not-a-jwt"));
    }

    @Test
    @DisplayName("rejects token signed with different key")
    void differentKeyToken() {
        var otherProps = new AppProperties();
        otherProps.getJwt().setSecret("a-completely-different-secret-key-for-testing-that-is-very-long-too");
        otherProps.getJwt().setExpirationMs(3600000);
        otherProps.getJwt().setRefreshExpirationMs(7200000);
        var otherProvider = new JwtTokenProvider(otherProps);

        String tokenFromOther = otherProvider.generateToken(USER_ID);

        assertFalse(tokenProvider.validateToken(tokenFromOther));
    }

    @Test
    @DisplayName("expired token is rejected")
    void expiredToken() {
        // Create provider with 0ms expiration
        var expiredProps = new AppProperties();
        expiredProps.getJwt().setSecret(TEST_SECRET);
        expiredProps.getJwt().setExpirationMs(0); // instant expiry
        expiredProps.getJwt().setRefreshExpirationMs(0);
        var expiredProvider = new JwtTokenProvider(expiredProps);

        String token = expiredProvider.generateToken(USER_ID);

        // Token was created with 0ms TTL, so it should already be expired
        assertFalse(tokenProvider.validateToken(token));
    }
}
