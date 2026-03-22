package com.dailyeng.controller;

import com.dailyeng.dto.user.UserDtos.UpdateProfileRequest;
import com.dailyeng.dto.user.UserDtos.UserProfileResponse;
import com.dailyeng.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for user profile management.
 * Endpoints are authenticated via JWT (Spring Security).
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController extends BaseController {

    private final UserService userService;

    /** GET /users/me — return the authenticated user's profile */
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getProfile() {
        var userId = requireUserId();
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }

    /** PUT /users/me — update the authenticated user's profile */
    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(userService.updateUserProfile(userId, request));
    }
}
