package com.dailyeng.controller;

import com.dailyeng.dto.speaking.SpeakingDtos.*;
import com.dailyeng.service.SpeakingHistoryService;
import com.dailyeng.service.SpeakingService;
import com.dailyeng.service.SpeakingSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for the Speaking module — scenarios, sessions, history, bookmarks.
 * Speech endpoints (STT/TTS/pronunciation) are in {@link SpeechController}.
 */
@Slf4j
@RestController
@RequestMapping("/speaking")
@RequiredArgsConstructor
public class SpeakingController extends BaseController {

    private final SpeakingService speakingService;
    private final SpeakingSessionService sessionService;
    private final SpeakingHistoryService historyService;

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
            @RequestParam(defaultValue = "12") int limit
    ) {
        var userId = extractUserId();
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

    /** DELETE /speaking/scenarios/{id} — deleteCustomScenario() */
    @DeleteMapping("/scenarios/{id}")
    public ResponseEntity<Void> deleteScenario(@PathVariable String id) {
        var userId = requireUserId();
        speakingService.deleteCustomScenario(id, userId);
        return ResponseEntity.noContent().build();
    }

    /** POST /speaking/scenarios/custom — createCustomScenario() */
    @PostMapping("/scenarios/custom")
    public ResponseEntity<CustomScenarioResponse> createCustomScenario(
            @Valid @RequestBody CreateCustomScenarioRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.createCustomScenario(userId, req.topicPrompt()));
    }

    /** POST /speaking/scenarios/random — createRandomScenario() */
    @PostMapping("/scenarios/random")
    public ResponseEntity<CustomScenarioResponse> createRandomScenario() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.createRandomScenario(userId));
    }

    /** POST /speaking/scenarios/free-talk — createFreeTalkScenario() */
    @PostMapping("/scenarios/free-talk")
    public ResponseEntity<CustomScenarioResponse> createFreeTalkScenario() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.createFreeTalkScenario(userId));
    }

    // ======================== Sessions ========================

    /** POST /speaking/sessions — startSessionWithGreeting() */
    @PostMapping("/sessions")
    public ResponseEntity<SessionStartResponse> startSession(
            @Valid @RequestBody StartSessionRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(sessionService.startSession(userId, req.scenarioId()));
    }

    /** POST /speaking/sessions/{id}/turns — submitTurn() */
    @PostMapping("/sessions/{id}/turns")
    public ResponseEntity<SubmitTurnResponse> submitTurn(
            @PathVariable String id,
            @Valid @RequestBody SubmitTurnRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(sessionService.submitTurn(userId, id, req));
    }

    /** POST /speaking/sessions/{id}/end — analyzeAndScoreSession() */
    @PostMapping("/sessions/{id}/end")
    public ResponseEntity<SessionAnalysisResponse> endSession(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(sessionService.analyzeAndScoreSession(userId, id));
    }

    /** POST /speaking/sessions/{id}/hint — generate a sample response hint */
    @PostMapping("/sessions/{id}/hint")
    public ResponseEntity<Map<String, String>> getHint(@PathVariable String id) {
        var userId = requireUserId();
        var hint = sessionService.generateHint(userId, id);
        return ResponseEntity.ok(Map.of("hint", hint));
    }

    /** GET /speaking/sessions/{id} — getSessionDetailsById() */
    @GetMapping("/sessions/{id}")
    public ResponseEntity<SessionDetailResponse> getSessionDetails(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(sessionService.getSessionDetails(userId, id));
    }

    /** DELETE /speaking/sessions/{id} — deleteSession() */
    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        var userId = requireUserId();
        sessionService.deleteSession(id, userId);
        return ResponseEntity.noContent().build();
    }

    // ======================== History ========================

    /** GET /speaking/history — getUserSpeakingHistory() */
    @GetMapping("/history")
    public ResponseEntity<HistoryResponse> getHistory() {
        var userId = requireUserId();
        return ResponseEntity.ok(historyService.getUserHistory(userId));
    }

    /** GET /speaking/history/sessions — getSpeakingHistorySessions() */
    @GetMapping("/history/sessions")
    public ResponseEntity<HistorySessionsResponse> getHistorySessions(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String rating
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(historyService.getHistorySessions(userId, page, limit, rating));
    }

    /** GET /speaking/history/stats — getSpeakingHistoryStats() */
    @GetMapping("/history/stats")
    public ResponseEntity<HistoryStatsResponse> getHistoryStats() {
        var userId = requireUserId();
        return ResponseEntity.ok(historyService.getHistoryStats(userId));
    }

    // ======================== Custom Topics ========================

    /** GET /speaking/custom-topics — getCustomTopics() */
    @GetMapping("/custom-topics")
    public ResponseEntity<List<ScenarioListItem>> getCustomTopics() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getCustomTopics(userId));
    }

    // ======================== Learning Records ========================

    /** GET /speaking/scenarios/{id}/records — getLearningRecordsForScenario() */
    @GetMapping("/scenarios/{id}/records")
    public ResponseEntity<List<LearningRecordItem>> getLearningRecords(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(historyService.getLearningRecords(userId, id));
    }

    // ======================== Bookmarks ========================

    /** POST /speaking/bookmarks/toggle — toggleSpeakingBookmark() */
    @PostMapping("/bookmarks/toggle")
    public ResponseEntity<ToggleBookmarkResponse> toggleBookmark(
            @Valid @RequestBody ToggleBookmarkRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.toggleBookmark(userId, req.scenarioId()));
    }

    /** GET /speaking/bookmarks — getSpeakingBookmarks() */
    @GetMapping("/bookmarks")
    public ResponseEntity<BookmarkListResponse> getBookmarks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int limit
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getBookmarks(userId, page, limit));
    }

    /** GET /speaking/bookmarks/ids — getSpeakingBookmarkIds() */
    @GetMapping("/bookmarks/ids")
    public ResponseEntity<List<String>> getBookmarkIds() {
        var userId = requireUserId();
        return ResponseEntity.ok(speakingService.getBookmarkIds(userId));
    }

}
