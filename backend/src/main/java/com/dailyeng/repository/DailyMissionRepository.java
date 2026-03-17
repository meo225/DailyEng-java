package com.dailyeng.repository;

import com.dailyeng.entity.DailyMission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DailyMissionRepository extends JpaRepository<DailyMission, String> {
    List<DailyMission> findByIsActiveTrue();
}
