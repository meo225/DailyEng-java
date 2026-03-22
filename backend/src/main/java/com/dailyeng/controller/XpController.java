package com.dailyeng.controller;

import com.dailyeng.dto.xp.XpDtos.*;
import com.dailyeng.service.LeaderboardService;
import com.dailyeng.service.XpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for XP system — stats, activity history, and leaderboard.
 */
@RestController
@RequestMapping("/xp")
@RequiredArgsConstructor
public class XpController extends BaseController {

    private final XpService xpService;
    private final LeaderboardService leaderboardService;

    /** GET /xp/stats — get user's XP stats overview */
    @GetMapping("/stats")
    public ResponseEntity<XpStatsResponse> getStats() {
        var userId = requireUserId();
        return ResponseEntity.ok(xpService.getStats(userId));
    }

    /** GET /xp/history — get daily activity history */
    @GetMapping("/history")
    public ResponseEntity<ActivityHistoryResponse> getHistory(
            @RequestParam(defaultValue = "30") int days
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(xpService.getActivityHistory(userId, days));
    }

    /** GET /xp/leaderboard — get leaderboard rankings */
    @GetMapping("/leaderboard")
    public ResponseEntity<LeaderboardResponse> getLeaderboard(
            @RequestParam(defaultValue = "weekly") String period,
            @RequestParam(defaultValue = "xp") String type,
            @RequestParam(defaultValue = "20") int limit
    ) {
        var userId = extractUserId();
        return ResponseEntity.ok(
                leaderboardService.getLeaderboard(userId, period, type, limit));
    }
}
