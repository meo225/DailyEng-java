package com.dailyeng.repository;

import com.dailyeng.entity.GrammarBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GrammarBookmarkRepository extends JpaRepository<GrammarBookmark, String> {
    List<GrammarBookmark> findByUserId(String userId);
    Optional<GrammarBookmark> findByUserIdAndTopicId(String userId, String topicId);
    boolean existsByUserIdAndTopicId(String userId, String topicId);
    void deleteByUserIdAndTopicId(String userId, String topicId);
}
