package com.dailyeng.repository;

import com.dailyeng.entity.ReadingPassage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReadingPassageRepository extends JpaRepository<ReadingPassage, String> {
    List<ReadingPassage> findByTopicId(String topicId);
}
