package com.dailyeng.repository;

import com.dailyeng.entity.UserDailyMission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface UserDailyMissionRepository extends JpaRepository<UserDailyMission, String> {
    List<UserDailyMission> findByUserIdAndDate(String userId, LocalDate date);
}
