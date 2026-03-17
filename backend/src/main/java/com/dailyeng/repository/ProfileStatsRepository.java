package com.dailyeng.repository;

import com.dailyeng.entity.ProfileStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfileStatsRepository extends JpaRepository<ProfileStats, String> {
    Optional<ProfileStats> findByUserId(String userId);
}
