package com.dailyeng.repository;

import com.dailyeng.entity.Topic;
import com.dailyeng.entity.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, String> {
    List<Topic> findByTopicGroupIdOrderByOrderAsc(String topicGroupId);
    Page<Topic> findByLevel(Level level, Pageable pageable);
    Page<Topic> findByCategoryAndLevel(String category, Level level, Pageable pageable);
    List<Topic> findByCategory(String category);
}
