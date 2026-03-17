package com.dailyeng.repository;

import com.dailyeng.entity.GrammarNote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GrammarNoteRepository extends JpaRepository<GrammarNote, String> {
    List<GrammarNote> findByTopicId(String topicId);
}
