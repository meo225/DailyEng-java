package com.dailyeng.xp;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DailyMissionRepository extends JpaRepository<DailyMission, String> {
    List<DailyMission> findByIsActiveTrue();
}
