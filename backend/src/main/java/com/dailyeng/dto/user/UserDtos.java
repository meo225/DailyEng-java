package com.dailyeng.dto.user;

import com.dailyeng.entity.enums.Gender;
import com.dailyeng.entity.enums.Level;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * All User Profile module DTOs as Java 21 records.
 */
public final class UserDtos {

    private UserDtos() {}

    // ============================== Requests ==============================

    public record UpdateProfileRequest(
            @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
            String name,

            @Email(message = "Invalid email format")
            String email,

            @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number format")
            String phoneNumber,

            LocalDate dateOfBirth,
            Gender gender,

            @Size(max = 500, message = "Address must not exceed 500 characters")
            String address,

            Level level
    ) {}

    // ============================== Responses ==============================

    public record UserProfileResponse(
            String id,
            String name,
            String email,
            String phoneNumber,
            LocalDate dateOfBirth,
            Gender gender,
            String address,
            Level level,
            String image,
            boolean isGoogleUser
    ) {}
}
