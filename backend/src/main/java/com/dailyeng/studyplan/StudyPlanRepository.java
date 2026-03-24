package com.dailyeng.studyplan;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudyPlanRepository extends JpaRepository<StudyPlan, String> {
    Optional<StudyPlan> findByUserIdAndLanguage(String userId, String language);
}
