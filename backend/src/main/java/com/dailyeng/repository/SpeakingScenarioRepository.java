package com.dailyeng.repository;

import com.dailyeng.entity.SpeakingScenario;
import com.dailyeng.entity.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SpeakingScenarioRepository extends JpaRepository<SpeakingScenario, String> {
    List<SpeakingScenario> findByTopicGroupId(String topicGroupId);
    Page<SpeakingScenario> findByIsCustomFalse(Pageable pageable);
    Page<SpeakingScenario> findByDifficulty(Level difficulty, Pageable pageable);
    List<SpeakingScenario> findByCreatedById(String userId);
    @Query("SELECT s FROM SpeakingScenario s WHERE s.isCustom = false AND (LOWER(s.title) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<SpeakingScenario> searchByTitleOrDescription(String q, Pageable pageable);
}
