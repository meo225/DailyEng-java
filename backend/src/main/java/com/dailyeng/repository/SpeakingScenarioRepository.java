package com.dailyeng.repository;

import com.dailyeng.entity.SpeakingScenario;
import com.dailyeng.entity.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SpeakingScenarioRepository extends JpaRepository<SpeakingScenario, String>,
        JpaSpecificationExecutor<SpeakingScenario> {

    List<SpeakingScenario> findByTopicGroupId(String topicGroupId);
    Page<SpeakingScenario> findByIsCustomFalse(Pageable pageable);
    Page<SpeakingScenario> findByDifficulty(Level difficulty, Pageable pageable);
    List<SpeakingScenario> findByCreatedByIdAndIsCustomTrue(String userId);

    @Query("SELECT s FROM SpeakingScenario s WHERE s.topicGroupId IS NOT NULL " +
            "AND (LOWER(s.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(s.description) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<SpeakingScenario> searchByTitleOrDescription(@Param("q") String q, Pageable pageable);
}
