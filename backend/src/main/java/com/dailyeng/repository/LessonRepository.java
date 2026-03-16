package com.dailyeng.repository;

import com.dailyeng.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, String> {
    List<Lesson> findByTopicIdOrderByOrderAsc(String topicId);
}
