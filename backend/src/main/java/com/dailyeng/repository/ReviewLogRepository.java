package com.dailyeng.repository;

import com.dailyeng.entity.ReviewLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewLogRepository extends JpaRepository<ReviewLog, String> {
    List<ReviewLog> findByUserIdOrderByCreatedAtAsc(String userId);
    long countByUserId(String userId);
}
