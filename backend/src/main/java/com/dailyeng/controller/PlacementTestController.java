package com.dailyeng.controller;

import com.dailyeng.dto.placement.PlacementTestDtos.*;
import com.dailyeng.service.PlacementTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/placement-test")
@RequiredArgsConstructor
public class PlacementTestController extends BaseController {

    private final PlacementTestService placementTestService;

    /** GET /api/placement-test/questions — public, returns the active question set */
    @GetMapping("/questions")
    public ResponseEntity<Map<String, Object>> getQuestions() {
        return ResponseEntity.ok(placementTestService.getActiveQuestionSet());
    }

    /** POST /api/placement-test/submit */
    @PostMapping("/submit")
    public ResponseEntity<PlacementTestResultResponse> submitResult(
            @RequestBody SubmitPlacementTestRequest request) {
        String userId = requireUserId();
        var result = placementTestService.submitResult(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /** GET /api/placement-test/results */
    @GetMapping("/results")
    public ResponseEntity<PlacementTestResultsResponse> getResults() {
        String userId = requireUserId();
        return ResponseEntity.ok(placementTestService.getResults(userId));
    }
}
