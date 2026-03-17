package com.dailyeng.repository;

import com.dailyeng.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByTokenAndExpiresAfter(String token, LocalDateTime now);
    void deleteByIdentifier(String identifier);
    void deleteByIdentifierAndToken(String identifier, String token);
}
