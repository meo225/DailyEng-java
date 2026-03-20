package com.dailyeng.repository;

import com.dailyeng.entity.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NotebookRepository extends JpaRepository<Notebook, String> {
    List<Notebook> findAllByUserIdOrderByCreatedAtAsc(String userId);
    List<Notebook> findByUserIdOrderByCreatedAtDesc(String userId);
    boolean existsByUserIdAndName(String userId, String name);
    Optional<Notebook> findByUserIdAndName(String userId, String name);
    Optional<Notebook> findByIdAndUserId(String id, String userId);
}
