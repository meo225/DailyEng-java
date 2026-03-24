package com.dailyeng.srs;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewLogRepository extends JpaRepository<ReviewLog, String> {
    List<ReviewLog> findByUserIdOrderByCreatedAtAsc(String userId);
    long countByUserId(String userId);
}
