package com.dailyeng.repository;

import com.dailyeng.entity.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, String> {
    Optional<UserLessonProgress> findByUserIdAndLessonId(String userId, String lessonId);
    List<UserLessonProgress> findByUserId(String userId);
}
