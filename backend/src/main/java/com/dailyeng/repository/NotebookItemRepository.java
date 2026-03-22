package com.dailyeng.repository;

import com.dailyeng.entity.NotebookItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface NotebookItemRepository extends JpaRepository<NotebookItem, String> {
    Page<NotebookItem> findByNotebookId(String notebookId, Pageable pageable);
    List<NotebookItem> findByNotebookIdAndIsStarredTrue(String notebookId);
    List<NotebookItem> findByUserIdAndNextReviewBefore(String userId, LocalDateTime dateTime);
    Optional<NotebookItem> findByIdAndUserId(String id, String userId);
    List<NotebookItem> findAllByNotebookIdAndUserIdOrderByCreatedAtDesc(String notebookId, String userId);
    long countByNotebookId(String notebookId);
    List<NotebookItem> findAllByUserIdOrderByCreatedAtDesc(String userId);
}
