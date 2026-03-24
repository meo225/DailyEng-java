package com.dailyeng.user;

import com.dailyeng.user.UserDtos.UpdateProfileRequest;
import com.dailyeng.user.UserDtos.UserProfileResponse;
import com.dailyeng.common.exception.BadRequestException;
import com.dailyeng.common.exception.ResourceNotFoundException;
import com.dailyeng.auth.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * User Profile service — get and update the authenticated user's profile.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    // ========================================================================
    // 1. getUserProfile
    // ========================================================================

    /**
     * Fetch the authenticated user's profile including Google-linked status.
     */
    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(String userId) {
        var user = findUserById(userId);
        boolean isGoogleUser = isGoogleUser(userId);
        return toProfileResponse(user, isGoogleUser);
    }

    // ========================================================================
    // 2. updateUserProfile
    // ========================================================================

    /**
     * Partially update the authenticated user's profile.
     *
     * <p>Rules:
     * - Google-linked users cannot change their email.
     * - Email must be unique across all users.
     */
    @Transactional
    public UserProfileResponse updateUserProfile(String userId, UpdateProfileRequest request) {
        var user = findUserById(userId);
        boolean isGoogleUser = isGoogleUser(userId);

        // Validate email change
        if (request.email() != null) {
            if (isGoogleUser && !request.email().equals(user.getEmail())) {
                throw new BadRequestException("Cannot change email for Google-linked accounts");
            }

            if (!request.email().equals(user.getEmail())) {
                if (userRepository.findByEmail(request.email()).isPresent()) {
                    throw new BadRequestException("Email is already in use");
                }
                user.setEmail(request.email());
            }
        }

        // Apply partial updates — only set non-null fields
        if (request.name() != null) user.setName(request.name());
        if (request.phoneNumber() != null) user.setPhoneNumber(request.phoneNumber());
        if (request.dateOfBirth() != null) user.setDateOfBirth(request.dateOfBirth());
        if (request.gender() != null) user.setGender(request.gender());
        if (request.address() != null) user.setAddress(request.address());
        if (request.level() != null) user.setLevel(request.level());

        userRepository.save(user);
        log.info("Updated profile for user {}", userId);
        return toProfileResponse(user, isGoogleUser);
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    private User findUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
    }

    private boolean isGoogleUser(String userId) {
        return accountRepository.findByUserId(userId).stream()
                .anyMatch(account -> "google".equals(account.getProvider()));
    }

    private UserProfileResponse toProfileResponse(User user, boolean isGoogleUser) {
        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getAddress(),
                user.getLevel(),
                user.getImage(),
                isGoogleUser
        );
    }
}
