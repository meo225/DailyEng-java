package com.dailyeng.repository;

import com.dailyeng.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, String> {
    Page<Notification> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);
    
    @org.springframework.data.jpa.repository.Query("SELECT n FROM Notification n WHERE n.userId = :userId " +
            "AND (:searchQuery IS NULL OR :searchQuery = '' OR " +
            "LOWER(n.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
            "LOWER(n.message) LIKE LOWER(CONCAT('%', :searchQuery, '%')))")
    Page<Notification> findByUserIdAndSearchQuery(
            @org.springframework.data.repository.query.Param("userId") String userId,
            @org.springframework.data.repository.query.Param("searchQuery") String searchQuery,
            Pageable pageable);

    long countByUserIdAndIsReadFalse(String userId);
    java.util.List<Notification> findByUserIdAndIsReadFalse(String userId);
}
