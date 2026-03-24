package com.dailyeng.user;

import com.dailyeng.user.UserDtos.UpdateProfileRequest;
import com.dailyeng.auth.Account;
import com.dailyeng.common.enums.Gender;
import com.dailyeng.common.enums.Level;
import com.dailyeng.common.exception.BadRequestException;
import com.dailyeng.common.exception.ResourceNotFoundException;
import com.dailyeng.auth.AccountRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link UserService}.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private AccountRepository accountRepository;

    @InjectMocks private UserService userService;

    private static final String USER_ID = "user-123";
    private static final String EMAIL = "test@example.com";

    private User createTestUser() {
        var user = User.builder()
                .name("Test User")
                .email(EMAIL)
                .phoneNumber("0123456789")
                .gender(Gender.MALE)
                .dateOfBirth(LocalDate.of(1995, 6, 15))
                .level(Level.B1)
                .image("https://example.com/avatar.jpg")
                .build();
        user.setId(USER_ID);
        return user;
    }

    private Account createGoogleAccount() {
        return Account.builder()
                .userId(USER_ID)
                .type("oauth")
                .provider("google")
                .providerAccountId("google-123")
                .build();
    }

    // ========================================================================
    // getUserProfile
    // ========================================================================

    @Nested
    @DisplayName("getUserProfile")
    class GetUserProfile {

        @Test
        @DisplayName("returns profile with isGoogleUser=false for credential user")
        void credentialUser() {
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(createTestUser()));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of());

            var result = userService.getUserProfile(USER_ID);

            assertEquals(USER_ID, result.id());
            assertEquals("Test User", result.name());
            assertEquals(EMAIL, result.email());
            assertEquals(Level.B1, result.level());
            assertEquals(Gender.MALE, result.gender());
            assertEquals(LocalDate.of(1995, 6, 15), result.dateOfBirth());
            assertFalse(result.isGoogleUser());
        }

        @Test
        @DisplayName("returns profile with isGoogleUser=true for Google user")
        void googleUser() {
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(createTestUser()));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of(createGoogleAccount()));

            var result = userService.getUserProfile(USER_ID);

            assertTrue(result.isGoogleUser());
        }

        @Test
        @DisplayName("throws ResourceNotFoundException for missing user")
        void userNotFound() {
            when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class,
                    () -> userService.getUserProfile(USER_ID));
        }
    }

    // ========================================================================
    // updateUserProfile
    // ========================================================================

    @Nested
    @DisplayName("updateUserProfile")
    class UpdateUserProfile {

        @Test
        @DisplayName("updates fields successfully")
        void success() {
            var user = createTestUser();
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of());
            when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));

            var request = new UpdateProfileRequest(
                    "New Name", null, "0987654321",
                    LocalDate.of(2000, 1, 1), Gender.FEMALE,
                    "123 Main St", Level.C1
            );
            var result = userService.updateUserProfile(USER_ID, request);

            assertEquals("New Name", result.name());
            assertEquals("0987654321", result.phoneNumber());
            assertEquals(Gender.FEMALE, result.gender());
            assertEquals(LocalDate.of(2000, 1, 1), result.dateOfBirth());
            assertEquals("123 Main St", result.address());
            assertEquals(Level.C1, result.level());
            // Email should remain unchanged since request.email() is null
            assertEquals(EMAIL, result.email());
            verify(userRepository).save(any());
        }

        @Test
        @DisplayName("blocks email change for Google users")
        void googleUserEmailBlocked() {
            var user = createTestUser();
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of(createGoogleAccount()));

            var request = new UpdateProfileRequest(
                    null, "new@example.com", null, null, null, null, null
            );

            var ex = assertThrows(BadRequestException.class,
                    () -> userService.updateUserProfile(USER_ID, request));
            assertTrue(ex.getMessage().contains("Google"));
        }

        @Test
        @DisplayName("blocks duplicate email")
        void duplicateEmail() {
            var user = createTestUser();
            var otherUser = User.builder().name("Other").email("taken@example.com").build();
            otherUser.setId("other-id");

            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of());
            when(userRepository.findByEmail("taken@example.com")).thenReturn(Optional.of(otherUser));

            var request = new UpdateProfileRequest(
                    null, "taken@example.com", null, null, null, null, null
            );

            var ex = assertThrows(BadRequestException.class,
                    () -> userService.updateUserProfile(USER_ID, request));
            assertTrue(ex.getMessage().contains("already in use"));
        }

        @Test
        @DisplayName("allows same email without error")
        void sameEmail() {
            var user = createTestUser();
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of());
            when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));

            // Send the same email — should not trigger uniqueness check
            var request = new UpdateProfileRequest(
                    null, EMAIL, null, null, null, null, null
            );
            var result = userService.updateUserProfile(USER_ID, request);

            assertEquals(EMAIL, result.email());
            verify(userRepository, never()).findByEmail(any());
        }

        @Test
        @DisplayName("throws ResourceNotFoundException for missing user")
        void userNotFound() {
            when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

            var request = new UpdateProfileRequest(
                    "Name", null, null, null, null, null, null
            );
            assertThrows(ResourceNotFoundException.class,
                    () -> userService.updateUserProfile(USER_ID, request));
        }

        @Test
        @DisplayName("preserves unchanged fields when null is sent")
        void nullFieldsPreserved() {
            var user = createTestUser();
            when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
            when(accountRepository.findByUserId(USER_ID)).thenReturn(List.of());
            when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));

            // All nulls — nothing should change
            var request = new UpdateProfileRequest(
                    null, null, null, null, null, null, null
            );
            var result = userService.updateUserProfile(USER_ID, request);

            assertEquals("Test User", result.name());
            assertEquals(EMAIL, result.email());
            assertEquals("0123456789", result.phoneNumber());
            assertEquals(Gender.MALE, result.gender());
            assertEquals(Level.B1, result.level());
        }
    }
}
