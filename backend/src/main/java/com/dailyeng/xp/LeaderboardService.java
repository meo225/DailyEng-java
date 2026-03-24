package com.dailyeng.xp;

import com.dailyeng.xp.XpDtos.*;
import com.dailyeng.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Leaderboard service — ranking queries by period and type.
 */
@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final LeaderboardEntryRepository leaderboardRepo;
    private final UserRepository userRepo;

    // ========================================================================
    // 1. getLeaderboard
    // ========================================================================

    @Transactional(readOnly = true)
    public LeaderboardResponse getLeaderboard(String userId, String period, String type, int limit) {
        var entries = leaderboardRepo.findByPeriodAndTypeOrderByXpDesc(
                period, type, PageRequest.of(0, limit));

        // Batch-load users to avoid N+1
        var userIds = entries.stream().map(LeaderboardEntry::getUserId).distinct().toList();
        var userMap = userRepo.findAllById(userIds).stream()
                .collect(Collectors.toMap(u -> u.getId(), u -> u));

        var rank = new AtomicInteger(0);
        var items = entries.stream().map(e -> {
            var user = userMap.get(e.getUserId());
            return new LeaderboardItem(
                    rank.incrementAndGet(),
                    e.getUserId(),
                    user != null ? user.getName() : "Unknown",
                    user != null ? user.getImage() : null,
                    e.getXp());
        }).toList();

        // Find current user's entry
        LeaderboardItem currentUser = null;
        if (userId != null) {
            currentUser = items.stream()
                    .filter(item -> userId.equals(item.userId()))
                    .findFirst()
                    .orElseGet(() -> {
                        var userEntry = leaderboardRepo.findByUserIdAndPeriodAndType(userId, period, type);
                        if (userEntry.isEmpty()) return null;
                        var user = userMap.getOrDefault(userId,
                                userRepo.findById(userId).orElse(null));
                        return new LeaderboardItem(
                                0, userId,
                                user != null ? user.getName() : "Unknown",
                                user != null ? user.getImage() : null,
                                userEntry.get().getXp());
                    });
        }

        return new LeaderboardResponse(items, currentUser, period, type);
    }

    // ========================================================================
    // 2. updateLeaderboard — upsert user's XP for a period
    // ========================================================================

    @Transactional
    public void updateLeaderboard(String userId, int xp, String period, String type) {
        var entry = leaderboardRepo.findByUserIdAndPeriodAndType(userId, period, type)
                .orElseGet(() -> LeaderboardEntry.builder()
                        .userId(userId).period(period).type(type).build());
        entry.setXp(entry.getXp() + xp);
        leaderboardRepo.save(entry);
    }
}
