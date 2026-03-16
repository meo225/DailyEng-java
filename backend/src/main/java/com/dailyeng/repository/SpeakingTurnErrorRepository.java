package com.dailyeng.repository;

import com.dailyeng.entity.SpeakingTurnError;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpeakingTurnErrorRepository extends JpaRepository<SpeakingTurnError, String> {
    List<SpeakingTurnError> findByTurnId(String turnId);
}
