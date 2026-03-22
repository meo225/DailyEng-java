package com.dailyeng.controller;

import com.dailyeng.dto.srs.SrsDtos.*;
import com.dailyeng.service.SrsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for Spaced Repetition System — review, due items, stats, study sessions.
 */
@RestController
@RequestMapping("/srs")
@RequiredArgsConstructor
public class SrsController extends BaseController {

    private final SrsService srsService;

    /** POST /srs/review — submit a vocab review with FSRS rating (1-4). */
    @PostMapping("/review")
    public ResponseEntity<ReviewResponse> review(@Valid @RequestBody ReviewRequest request) {
        var userId = requireUserId();
        return ResponseEntity.ok(
                srsService.reviewVocabItem(userId, request.vocabItemId(), request.rating()));
    }

    /** GET /srs/due — get items due for review, sorted by urgency. */
    @GetMapping("/due")
    public ResponseEntity<List<DueItemResponse>> getDueItems(
            @RequestParam(defaultValue = "20") int limit
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.getDueItems(userId, limit));
    }

    /** GET /srs/stats — get review statistics overview. */
    @GetMapping("/stats")
    public ResponseEntity<ReviewStatsResponse> getStats() {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.getReviewStats(userId));
    }

    /** GET /srs/session/{topicId} — get a study session mixing due + new items. */
    @GetMapping("/session/{topicId}")
    public ResponseEntity<StudySessionResponse> getStudySession(
            @PathVariable String topicId,
            @RequestParam(defaultValue = "20") int limit
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.getStudySession(userId, topicId, limit));
    }

    /** POST /srs/optimize — trigger ML weight optimization from review history. */
    @PostMapping("/optimize")
    public ResponseEntity<Map<String, Object>> optimize() {
        var userId = requireUserId();
        double[] weights = srsService.optimizeWeights(userId);
        if (weights == null) {
            return ResponseEntity.ok(Map.of(
                    "optimized", false,
                    "message", "Need at least 100 reviews for optimization"
            ));
        }
        return ResponseEntity.ok(Map.of(
                "optimized", true,
                "weights", weights,
                "message", "Personalized FSRS weights trained successfully"
        ));
    }
}
