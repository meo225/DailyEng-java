package com.dailyeng.vocabulary;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard, String> {
    Page<Flashcard> findByUserId(String userId, Pageable pageable);
    List<Flashcard> findByUserIdAndNextReviewDateBefore(String userId, LocalDateTime dateTime);
    List<Flashcard> findByUserIdAndTopicId(String userId, String topicId);
    long countByUserId(String userId);
}
