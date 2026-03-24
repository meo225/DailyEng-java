package com.dailyeng.content;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlacementTestQuestionSetRepository extends JpaRepository<PlacementTestQuestionSet, String> {
    Optional<PlacementTestQuestionSet> findByActiveTrueAndLanguage(String language);

    Optional<PlacementTestQuestionSet> findByVersionAndLanguage(String version, String language);
}
