package com.dailyeng.repository;

import com.dailyeng.entity.SpeakingTurn;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpeakingTurnRepository extends JpaRepository<SpeakingTurn, String> {
    List<SpeakingTurn> findBySessionIdOrderByTimestampAsc(String sessionId);
}
