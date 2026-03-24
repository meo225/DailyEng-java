package com.dailyeng.speaking;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpeakingTurnErrorRepository extends JpaRepository<SpeakingTurnError, String> {
    List<SpeakingTurnError> findByTurnId(String turnId);
    void deleteByTurnId(String turnId);
}
