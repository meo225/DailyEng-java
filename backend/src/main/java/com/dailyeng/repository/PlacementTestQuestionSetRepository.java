package com.dailyeng.repository;

import com.dailyeng.entity.PlacementTestQuestionSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlacementTestQuestionSetRepository extends JpaRepository<PlacementTestQuestionSet, String> {
    Optional<PlacementTestQuestionSet> findByActiveTrue();
    Optional<PlacementTestQuestionSet> findByVersion(String version);
}
