package com.dailyeng.repository;

import com.dailyeng.entity.PlacementTestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlacementTestResultRepository extends JpaRepository<PlacementTestResult, String> {
    List<PlacementTestResult> findByUserIdOrderByCreatedAtDesc(String userId);
}
