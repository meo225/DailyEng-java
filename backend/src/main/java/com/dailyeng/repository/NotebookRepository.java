package com.dailyeng.repository;

import com.dailyeng.entity.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NotebookRepository extends JpaRepository<Notebook, String> {
    List<Notebook> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<Notebook> findByUserIdAndName(String userId, String name);
}
