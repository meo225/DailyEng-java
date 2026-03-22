package com.dailyeng.dto.study;

import com.dailyeng.entity.enums.Level;
import com.dailyeng.entity.enums.StudyGoal;
import com.dailyeng.entity.enums.TaskType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

/**
 * All Study Plan module DTOs as Java 21 records.
 */
public final class StudyDtos {

    private StudyDtos() {}

    // ============================== Requests ==============================

    public record CreatePlanRequest(
            @NotNull StudyGoal goal,
            @NotNull Level level,
            @Min(1) @Max(168) int hoursPerWeek,
            @Size(min = 1) List<String> interests
    ) {}

    public record UpdateGoalRequest(
            @NotNull StudyGoal goal,
            @NotNull Level level,
            @Min(1) @Max(168) int hoursPerWeek
    ) {}

    public record UpdateExamDateRequest(
            @NotNull LocalDateTime examDate
    ) {}

    public record UpdateTaskTimeRequest(
            @NotNull String startTime,
            @NotNull String endTime
    ) {}

    public record ToggleTaskRequest(
            boolean completed
    ) {}

    // ============================== Responses ==============================

    public record StudyPlanResponse(
            String id,
            String userId,
            StudyGoal goal,
            Level level,
            int minutesPerDay,
            int wordsPerDay,
            List<String> interests,
            LocalDateTime examDate,
            LocalDateTime createdAt,
            List<StudyTaskResponse> tasks
    ) {}

    public record StudyTaskResponse(
            String id,
            String planId,
            LocalDateTime date,
            TaskType type,
            boolean completed,
            String title,
            String startTime,
            String endTime,
            String link
    ) {}

    public record StudyStatsResponse(
            String dailyHours,
            String weeklyHours,
            String totalHours
    ) {}
}
