package com.dailyeng.repository;

import com.dailyeng.entity.UserTopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserTopicProgressRepository extends JpaRepository<UserTopicProgress, String> {
    Optional<UserTopicProgress> findByUserIdAndTopicId(String userId, String topicId);
    List<UserTopicProgress> findByUserId(String userId);
}
