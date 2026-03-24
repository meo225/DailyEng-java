package com.dailyeng.xp;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LeaderboardEntryRepository extends JpaRepository<LeaderboardEntry, String> {
    List<LeaderboardEntry> findByPeriodAndTypeOrderByXpDesc(String period, String type, Pageable pageable);
    Optional<LeaderboardEntry> findByUserIdAndPeriodAndType(String userId, String period, String type);
}
