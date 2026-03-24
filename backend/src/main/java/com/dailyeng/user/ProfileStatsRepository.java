package com.dailyeng.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfileStatsRepository extends JpaRepository<ProfileStats, String> {
    Optional<ProfileStats> findByUserId(String userId);
}
