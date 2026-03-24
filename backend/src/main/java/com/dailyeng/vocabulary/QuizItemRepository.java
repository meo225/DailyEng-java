package com.dailyeng.vocabulary;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizItemRepository extends JpaRepository<QuizItem, String> {
    List<QuizItem> findByTopicId(String topicId);
}
