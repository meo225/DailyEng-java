package com.dailyeng.content;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlacementTestResultRepository extends JpaRepository<PlacementTestResult, String> {
    List<PlacementTestResult> findByUserIdAndLanguageOrderByCreatedAtDesc(String userId, String language);
}
