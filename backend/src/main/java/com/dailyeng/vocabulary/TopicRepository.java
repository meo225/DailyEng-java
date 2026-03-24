package com.dailyeng.vocabulary;

import com.dailyeng.common.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, String>, JpaSpecificationExecutor<Topic> {
    List<Topic> findByTopicGroupIdOrderByOrderAsc(String topicGroupId);
    Page<Topic> findByLevel(Level level, Pageable pageable);
    Page<Topic> findByCategoryAndLevel(String category, Level level, Pageable pageable);
    List<Topic> findByCategory(String category);

    @Query("""
        SELECT t FROM Topic t
        WHERE t.topicGroup.hubType = :hubType
          AND t.topicGroup.language = :language
          AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%'))
               OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%')))
        ORDER BY t.title ASC
        """)
    List<Topic> searchByTitleOrDescription(
            @Param("hubType") com.dailyeng.common.enums.HubType hubType,
            @Param("language") String language,
            @Param("query") String query,
            Pageable pageable);
}
