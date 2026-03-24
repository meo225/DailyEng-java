package com.dailyeng.vocabulary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserTopicProgressRepository extends JpaRepository<UserTopicProgress, String> {
    Optional<UserTopicProgress> findByUserIdAndTopicId(String userId, String topicId);
    List<UserTopicProgress> findByUserId(String userId);
    List<UserTopicProgress> findByUserIdAndTopicIdIn(String userId, List<String> topicIds);

    @Query(value = """
        SELECT utp.* FROM "UserTopicProgress" utp
        JOIN "Topic" t ON t.id = utp."topicId"
        JOIN "TopicGroup" tg ON tg.id = t."topicGroupId"
        WHERE utp."userId" = :userId
          AND utp.progress > 0 AND utp.progress < 100
          AND tg."hubType" = CAST('grammar' AS "HubType")
        ORDER BY utp.progress DESC
        LIMIT 1
        """, nativeQuery = true)
    Optional<UserTopicProgress> findCurrentGrammarTopic(@Param("userId") String userId);
}
