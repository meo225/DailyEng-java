package com.dailyeng.content;

import com.dailyeng.common.web.BaseController;

import com.dailyeng.content.PlacementTestDtos.*;
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

    /**
     * GET /api/placement-test/questions — public, returns the active question set
     */
    @GetMapping("/questions")
    public ResponseEntity<Map<String, Object>> getQuestions(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language) {
        return ResponseEntity.ok(placementTestService.getActiveQuestionSet(language));
    }

    /** POST /api/placement-test/submit */
    @PostMapping("/submit")
    public ResponseEntity<PlacementTestResultResponse> submitResult(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language,
            @RequestBody SubmitPlacementTestRequest request) {
        String userId = requireUserId();
        var result = placementTestService.submitResult(userId, language, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /** GET /api/placement-test/results */
    @GetMapping("/results")
    public ResponseEntity<PlacementTestResultsResponse> getResults(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language) {
        String userId = requireUserId();
        return ResponseEntity.ok(placementTestService.getResults(userId, language));
    }
}
