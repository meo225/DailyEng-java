package com.dailyeng.controller;

import com.dailyeng.dto.study.StudyDtos.*;
import com.dailyeng.service.StudyPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for study plan management.
 */
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyPlanController extends BaseController {

    private final StudyPlanService studyPlanService;

    @GetMapping("/plan")
    public ResponseEntity<StudyPlanResponse> getStudyPlan() {
        return ResponseEntity.ok(studyPlanService.getStudyPlan(requireUserId()));
    }

    @PostMapping("/plan")
    public ResponseEntity<StudyPlanResponse> createNewPlan(
            @Valid @RequestBody CreatePlanRequest request
    ) {
        return ResponseEntity.ok(studyPlanService.createNewPlan(requireUserId(), request));
    }

    @PutMapping("/plan/goal")
    public ResponseEntity<StudyPlanResponse> updateStudyGoal(
            @Valid @RequestBody UpdateGoalRequest request
    ) {
        return ResponseEntity.ok(studyPlanService.updateStudyGoal(requireUserId(), request));
    }

    @PutMapping("/plan/exam-date")
    public ResponseEntity<StudyPlanResponse> updateExamDate(
            @Valid @RequestBody UpdateExamDateRequest request
    ) {
        return ResponseEntity.ok(studyPlanService.updateExamDate(requireUserId(), request));
    }

    @GetMapping("/tasks/today")
    public ResponseEntity<List<StudyTaskResponse>> getTodayTasks() {
        return ResponseEntity.ok(studyPlanService.getTodayTasks(requireUserId()));
    }

    @PutMapping("/tasks/{taskId}/toggle")
    public ResponseEntity<StudyTaskResponse> toggleTaskCompletion(
            @PathVariable String taskId,
            @Valid @RequestBody ToggleTaskRequest request
    ) {
        return ResponseEntity.ok(studyPlanService.toggleTaskCompletion(taskId, request));
    }

    @PutMapping("/tasks/{taskId}/time")
    public ResponseEntity<StudyTaskResponse> updateTaskTime(
            @PathVariable String taskId,
            @Valid @RequestBody UpdateTaskTimeRequest request
    ) {
        return ResponseEntity.ok(studyPlanService.updateTaskTime(taskId, request));
    }

    @GetMapping("/stats")
    public ResponseEntity<StudyStatsResponse> getStudyStats() {
        return ResponseEntity.ok(studyPlanService.getStudyStats(requireUserId()));
    }
}
