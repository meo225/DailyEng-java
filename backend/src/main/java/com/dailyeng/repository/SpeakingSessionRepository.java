package com.dailyeng.repository;

import com.dailyeng.entity.SpeakingSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpeakingSessionRepository extends JpaRepository<SpeakingSession, String> {
    List<SpeakingSession> findByUserIdOrderByCreatedAtDesc(String userId);
    Page<SpeakingSession> findByUserId(String userId, Pageable pageable);
    List<SpeakingSession> findByUserIdAndScenarioId(String userId, String scenarioId);
}
