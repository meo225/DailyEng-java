package com.dailyeng.speaking;

import com.dailyeng.common.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SpeakingScenarioRepository extends JpaRepository<SpeakingScenario, String>,
        JpaSpecificationExecutor<SpeakingScenario> {

    List<SpeakingScenario> findByLanguageAndTopicGroupId(String language, String topicGroupId);
    Page<SpeakingScenario> findByLanguageAndIsCustomFalse(String language, Pageable pageable);
    Page<SpeakingScenario> findByLanguageAndDifficulty(String language, Level difficulty, Pageable pageable);
    List<SpeakingScenario> findByCreatedByIdAndIsCustomTrue(String userId);

    @Query("SELECT s FROM SpeakingScenario s WHERE s.language = :language AND s.topicGroupId IS NOT NULL " +
            "AND (LOWER(s.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(s.description) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<SpeakingScenario> searchByTitleOrDescription(@Param("language") String language, @Param("q") String q, Pageable pageable);
}
