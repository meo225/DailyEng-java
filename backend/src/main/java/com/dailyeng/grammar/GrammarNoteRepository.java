package com.dailyeng.grammar;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GrammarNoteRepository extends JpaRepository<GrammarNote, String> {
    List<GrammarNote> findByTopicId(String topicId);

    List<GrammarNote> findByTitleContainingIgnoreCaseOrderByTitleAsc(String title, Pageable pageable);
}
