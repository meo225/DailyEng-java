package com.dailyeng.xp;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserActivityRepository extends JpaRepository<UserActivity, String> {
    Optional<UserActivity> findByUserIdAndDate(String userId, LocalDate date);
    List<UserActivity> findByUserIdAndDateBetween(String userId, LocalDate start, LocalDate end);
}
