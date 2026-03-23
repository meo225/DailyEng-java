package com.dailyeng.dto.placement;

import java.time.LocalDateTime;
import java.util.Map;

public class PlacementTestDtos {

    public record SubmitPlacementTestRequest(
            int score,
            String level,
            Map<String, Object> breakdown
    ) {}

    public record PlacementTestResultResponse(
            String id,
            int score,
            String level,
            Object breakdown,
            LocalDateTime createdAt
    ) {}

    public record PlacementTestResultsResponse(
            java.util.List<PlacementTestResultResponse> results,
            int total
    ) {}
}
