package com.dailyeng.vocabulary;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VocabBookmarkRepository extends JpaRepository<VocabBookmark, String> {
    List<VocabBookmark> findByUserId(String userId);
    Optional<VocabBookmark> findByUserIdAndTopicId(String userId, String topicId);
    boolean existsByUserIdAndTopicId(String userId, String topicId);
    void deleteByUserIdAndTopicId(String userId, String topicId);
}
