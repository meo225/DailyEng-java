package com.dailyeng.repository;

import com.dailyeng.entity.SpeakingBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SpeakingBookmarkRepository extends JpaRepository<SpeakingBookmark, String> {
    List<SpeakingBookmark> findByUserId(String userId);
    Optional<SpeakingBookmark> findByUserIdAndScenarioId(String userId, String scenarioId);
    boolean existsByUserIdAndScenarioId(String userId, String scenarioId);
    void deleteByUserIdAndScenarioId(String userId, String scenarioId);
}
