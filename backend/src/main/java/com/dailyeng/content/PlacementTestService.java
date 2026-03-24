package com.dailyeng.content;

import com.dailyeng.content.PlacementTestDtos.*;
import com.dailyeng.common.enums.Level;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlacementTestService {

    private final PlacementTestResultRepository resultRepository;
    private final PlacementTestQuestionSetRepository questionSetRepository;

    /**
     * Get the active placement test question set.
     */
    public Map<String, Object> getActiveQuestionSet(String language) {
        PlacementTestQuestionSet qs = questionSetRepository.findByActiveTrueAndLanguage(language)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No active placement test question set found"));
        return Map.of(
                "testSteps", qs.getTestSteps(),
                "questions", qs.getQuestions(),
                "readingPassage", qs.getReadingPassage());
    }

    /**
     * Submit and save a placement test result.
     */
    public PlacementTestResultResponse submitResult(String userId, String language,
            SubmitPlacementTestRequest request) {
        var result = PlacementTestResult.builder()
                .userId(userId)
                .language(language)
                .score(request.score())
                .level(mapLevel(request.level()))
                .breakdown(request.breakdown())
                .build();

        var saved = resultRepository.save(result);
        return toResponse(saved);
    }

    /**
     * Get all placement test results for a user, newest first.
     */
    public PlacementTestResultsResponse getResults(String userId, String language) {
        var results = resultRepository.findByUserIdAndLanguageOrderByCreatedAtDesc(userId, language);
        var mapped = results.stream().map(this::toResponse).toList();
        return new PlacementTestResultsResponse(mapped, mapped.size());
    }

    // ─── Helpers ──────────────────────────────────────

    private PlacementTestResultResponse toResponse(PlacementTestResult r) {
        return new PlacementTestResultResponse(
                r.getId(),
                r.getScore(),
                r.getLevel().name(),
                r.getBreakdown(),
                r.getCreatedAt());
    }

    /**
     * Map CEFR level string (A1, A2, B1, B2, C1, C2) to Level enum.
     * Falls back to A1 for unknown values.
     */
    static Level mapLevel(String cefrLevel) {
        if (cefrLevel == null)
            return Level.A1;
        try {
            return Level.valueOf(cefrLevel.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            return Level.A1;
        }
    }
}
