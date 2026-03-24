package com.dailyeng.auth;

import com.dailyeng.config.AppProperties;
import com.dailyeng.auth.dto.*;
import com.dailyeng.user.User;
import com.dailyeng.common.exception.BadRequestException;

import com.dailyeng.user.UserRepository;

import com.dailyeng.auth.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link AuthService}.
 */
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private VerificationTokenRepository tokenRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    @Mock
    private EmailService emailService;
    @Mock
    private AppProperties appProperties;
    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private AuthService authService;

    private static final String USER_ID = "user-123";
    private static final String EMAIL = "test@example.com";

    private User createTestUser() {
        var user = User.builder()
                .name("Test User").email(EMAIL)
                .password("encoded-password").build();
        user.setId(USER_ID);
        return user;
    }

    // ========================================================================
    // Register
    // ========================================================================

    @Nested
    @DisplayName("register")
    class Register {

        @Test
        @DisplayName("registers successfully with valid data")
        void registerSuccess() {
            when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
            when(passwordEncoder.encode("Password1")).thenReturn("encoded");
            when(userRepository.save(any())).thenAnswer(inv -> {
                User u = inv.getArgument(0);
                u.setId(USER_ID);
                return u;
            });
            when(jwtTokenProvider.generateToken(USER_ID)).thenReturn("access-token");
            when(jwtTokenProvider.generateRefreshToken(USER_ID)).thenReturn("refresh-token");

            var request = new RegisterRequest("Test User", EMAIL, "Password1");
            var result = authService.register(request);

            assertTrue(result.success());
            assertEquals("access-token", result.accessToken());
            assertEquals("refresh-token", result.refreshToken());
            assertNotNull(result.user());
        }

        @Test
        @DisplayName("throws BadRequestException for duplicate email")
        void duplicateEmail() {
            when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(createTestUser()));

            var request = new RegisterRequest("Test", EMAIL, "Password1");
            assertThrows(BadRequestException.class, () -> authService.register(request));
        }
    }

    // ========================================================================
    // Login
    // ========================================================================

    @Test
    @DisplayName("login returns tokens for valid credentials")
    void loginSuccess() {
        var user = createTestUser();
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(jwtTokenProvider.generateToken(USER_ID)).thenReturn("access");
        when(jwtTokenProvider.generateRefreshToken(USER_ID)).thenReturn("refresh");

        var result = authService.login(new LoginRequest(EMAIL, "Password1"));

        assertTrue(result.success());
        assertEquals("access", result.accessToken());
    }

    @Test
    @DisplayName("login throws when email not found")
    void loginEmailNotFound() {
        when(userRepository.findByEmail("nonexistent@test.com")).thenReturn(Optional.empty());

        assertThrows(BadRequestException.class,
                () -> authService.login(new LoginRequest("nonexistent@test.com", "pass")));
    }

    // ========================================================================
    // Change Password
    // ========================================================================

    @Nested
    @DisplayName("changePassword")
    class ChangePassword {

        @Test
        @DisplayName("changes password when current password matches")
        void changeSuccess() {
            var user = createTestUser();
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(passwordEncoder.matches("oldpass", "encoded-password")).thenReturn(true);
            when(passwordEncoder.encode("NewPass123")).thenReturn("new-encoded");

            authService.changePassword(USER_ID, new ChangePasswordRequest("oldpass", "NewPass123"));

            assertEquals("new-encoded", user.getPassword());
            verify(userRepository).save(user);
        }

        @Test
        @DisplayName("throws when current password is wrong")
        void wrongCurrentPassword() {
            var user = createTestUser();
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(passwordEncoder.matches("wrong", "encoded-password")).thenReturn(false);

            assertThrows(BadRequestException.class,
                    () -> authService.changePassword(USER_ID, new ChangePasswordRequest("wrong", "New1234")));
        }

        @Test
        @DisplayName("throws for Google account (no password set)")
        void googleAccountNoPassword() {
            var user = createTestUser();
            user.setPassword(null); // Google-only account
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));

            assertThrows(BadRequestException.class,
                    () -> authService.changePassword(USER_ID, new ChangePasswordRequest("any", "New1234")));
        }
    }

    // ========================================================================
    // Forgot Password
    // ========================================================================

    @Test
    @DisplayName("forgotPassword silently succeeds for non-existent email (anti-enumeration)")
    void forgotPasswordNonExistentEmail() {
        when(userRepository.findByEmail("nope@test.com")).thenReturn(Optional.empty());

        // Should not throw
        assertDoesNotThrow(() -> authService.forgotPassword("nope@test.com"));
        verify(emailService, never()).sendPasswordResetEmail(any(), any());
    }

    @Test
    @DisplayName("forgotPassword silently succeeds for Google-only account")
    void forgotPasswordGoogleAccount() {
        var user = createTestUser();
        user.setPassword(null);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));

        assertDoesNotThrow(() -> authService.forgotPassword(EMAIL));
        verify(emailService, never()).sendPasswordResetEmail(any(), any());
    }

    // ========================================================================
    // getUserInfo
    // ========================================================================

    @Test
    @DisplayName("getUserInfo returns UserInfo for existing user")
    void getUserInfoExists() {
        var user = createTestUser();
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));

        var result = authService.getUserInfo(USER_ID);

        assertNotNull(result);
        assertEquals(USER_ID, result.id());
        assertEquals("Test User", result.name());
    }

    @Test
    @DisplayName("getUserInfo returns null for non-existent user")
    void getUserInfoNotFound() {
        when(userRepository.findById("nope")).thenReturn(Optional.empty());

        var result = authService.getUserInfo("nope");

        assertNull(result);
    }
}
