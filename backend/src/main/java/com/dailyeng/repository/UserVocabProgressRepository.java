package com.dailyeng.repository;

import com.dailyeng.entity.UserVocabProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserVocabProgressRepository extends JpaRepository<UserVocabProgress, String> {
    Optional<UserVocabProgress> findByUserIdAndVocabItemId(String userId, String vocabItemId);
    List<UserVocabProgress> findByUserId(String userId);
    List<UserVocabProgress> findByUserIdAndNextReviewBefore(String userId, LocalDateTime dateTime);
}
