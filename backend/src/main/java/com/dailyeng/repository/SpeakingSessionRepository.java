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

    // Completed sessions (endedAt not null)
    List<SpeakingSession> findByUserIdAndEndedAtIsNotNullOrderByEndedAtDesc(String userId);
    Page<SpeakingSession> findByUserIdAndEndedAtIsNotNull(String userId, Pageable pageable);
    Page<SpeakingSession> findByUserIdAndEndedAtIsNotNullAndFeedbackRating(
            String userId, String feedbackRating, Pageable pageable);
    long countByUserIdAndEndedAtIsNotNull(String userId);

    // Learning records per scenario
    List<SpeakingSession> findByUserIdAndScenarioIdAndEndedAtIsNotNullOrderByCreatedAtDesc(
            String userId, String scenarioId);

    // User scenario progress
    List<SpeakingSession> findByUserIdAndScenarioIdIn(String userId, List<String> scenarioIds);
}
