package com.dailyeng.content;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SiteContentRepository extends JpaRepository<SiteContent, String> {
    Optional<SiteContent> findByContentKey(String contentKey);
}
