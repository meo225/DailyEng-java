package com.dailyeng.controller;

import com.dailyeng.dto.speaking.SpeakingDtos.*;
import com.dailyeng.security.JwtTokenProvider;
import com.dailyeng.service.SpeakingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Speaking module — 15 endpoints.
 * Maps from speaking.ts Server Actions to REST API.
 */
@RestController
@RequestMapping("/api/speaking")
@RequiredArgsConstructor
public class SpeakingController {

    private final SpeakingService speakingService;
    private final JwtTokenProvider jwtTokenProvider;

    // ======================== Topic Groups ========================

    /** GET /speaking/topic-groups — getSpeakingTopicGroups() */
    @GetMapping("/topic-groups")
    public ResponseEntity<List<TopicGroupResponse>> getTopicGroups() {
        return ResponseEntity.ok(speakingService.getTopicGroups());
    }

    // ======================== Scenarios ========================

    /** GET /speaking/scenarios — getSpeakingScenariosWithProgress() */
    @GetMapping("/scenarios")
    public ResponseEntity<ScenarioListResponse> getScenarios(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) List<String> levels,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            HttpServletRequest request
    ) {
        var userId = extractUserId(request);
        return ResponseEntity.ok(speakingService.getScenariosWithProgress(
                userId, category, subcategory, levels, page, limit));
    }

    /** GET /speaking/scenarios/search — searchSpeakingScenarios() */
    @GetMapping("/scenarios/search")
    public ResponseEntity<List<ScenarioListItem>> searchScenarios(@RequestParam String q) {
        return ResponseEntity.ok(speakingService.searchScenarios(q));
    }

    /** GET /speaking/scenarios/{id} — getScenarioById() */
    @GetMapping("/scenarios/{id}")
    public ResponseEntity<ScenarioDetailResponse> getScenario(@PathVariable String id) {
        return ResponseEntity.ok(speakingService.getScenarioById(id));
    }

    /** POST /speaking/scenarios/custom — createCustomScenario() */
    @PostMapping("/scenarios/custom")
    public ResponseEntity<CustomScenarioResponse> createCustomScenario(
            @RequestBody CreateCustomScenarioRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.createCustomScenario(userId, req.topicPrompt()));
    }

    /** POST /speaking/scenarios/random — createRandomScenario() */
    @PostMapping("/scenarios/random")
    public ResponseEntity<CustomScenarioResponse> createRandomScenario(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.createRandomScenario(userId));
    }

    // ======================== Sessions ========================

    /** POST /speaking/sessions — startSessionWithGreeting() */
    @PostMapping("/sessions")
    public ResponseEntity<SessionStartResponse> startSession(
            @RequestBody StartSessionRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.startSession(userId, req.scenarioId()));
    }

    /** POST /speaking/sessions/{id}/turns — submitTurn() */
    @PostMapping("/sessions/{id}/turns")
    public ResponseEntity<SubmitTurnResponse> submitTurn(
            @PathVariable String id,
            @RequestBody SubmitTurnRequest req
    ) {
        return ResponseEntity.ok(speakingService.submitTurn(id, req));
    }

    /** POST /speaking/sessions/{id}/end — analyzeAndScoreSession() */
    @PostMapping("/sessions/{id}/end")
    public ResponseEntity<SessionAnalysisResponse> endSession(@PathVariable String id) {
        return ResponseEntity.ok(speakingService.analyzeAndScoreSession(id));
    }

    /** GET /speaking/sessions/{id} — getSessionDetailsById() */
    @GetMapping("/sessions/{id}")
    public ResponseEntity<SessionDetailResponse> getSessionDetails(@PathVariable String id) {
        return ResponseEntity.ok(speakingService.getSessionDetails(id));
    }

    // ======================== History ========================

    /** GET /speaking/history — getUserSpeakingHistory() */
    @GetMapping("/history")
    public ResponseEntity<HistoryResponse> getHistory(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.getUserHistory(userId));
    }

    /** GET /speaking/history/sessions — getSpeakingHistorySessions() */
    @GetMapping("/history/sessions")
    public ResponseEntity<HistorySessionsResponse> getHistorySessions(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String rating,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.getHistorySessions(userId, page, limit, rating));
    }

    /** GET /speaking/history/stats — getSpeakingHistoryStats() */
    @GetMapping("/history/stats")
    public ResponseEntity<HistoryStatsResponse> getHistoryStats(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.getHistoryStats(userId));
    }

    // ======================== Custom Topics ========================

    /** GET /speaking/custom-topics — getCustomTopics() */
    @GetMapping("/custom-topics")
    public ResponseEntity<List<ScenarioListItem>> getCustomTopics(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.getCustomTopics(userId));
    }

    // ======================== Learning Records ========================

    /** GET /speaking/scenarios/{id}/records — getLearningRecordsForScenario() */
    @GetMapping("/scenarios/{id}/records")
    public ResponseEntity<List<LearningRecordItem>> getLearningRecords(
            @PathVariable String id,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(speakingService.getLearningRecords(userId, id));
    }

    // ======================== Helpers ========================

    /**
     * Extract userId from JWT if present (optional auth).
     */
    private String extractUserId(HttpServletRequest request) {
        try {
            var bearerToken = request.getHeader("Authorization");
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                var token = bearerToken.substring(7);
                if (jwtTokenProvider.validateToken(token)) {
                    return jwtTokenProvider.getUserIdFromToken(token);
                }
            }
        } catch (Exception ignored) {}
        return null;
    }

    /**
     * Require userId from JWT (throws 401 if not present).
     */
    private String requireUserId(HttpServletRequest request) {
        var userId = extractUserId(request);
        if (userId == null) {
            throw new com.dailyeng.exception.UnauthorizedException("Authentication required");
        }
        return userId;
    }
}
