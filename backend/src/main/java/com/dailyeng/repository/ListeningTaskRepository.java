package com.dailyeng.repository;

import com.dailyeng.entity.ListeningTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ListeningTaskRepository extends JpaRepository<ListeningTask, String> {
    List<ListeningTask> findByTopicId(String topicId);
}
