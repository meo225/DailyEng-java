package com.dailyeng.notebook;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NotebookRepository extends JpaRepository<Notebook, String> {
    List<Notebook> findAllByUserIdAndLanguageOrderByCreatedAtAsc(String userId, String language);
    List<Notebook> findByUserIdAndLanguageOrderByCreatedAtDesc(String userId, String language);
    boolean existsByUserIdAndNameAndLanguage(String userId, String name, String language);
    Optional<Notebook> findByUserIdAndNameAndLanguage(String userId, String name, String language);
    Optional<Notebook> findByIdAndUserId(String id, String userId);
}
