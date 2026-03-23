package com.dailyeng.repository;

import com.dailyeng.entity.VocabItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VocabItemRepository extends JpaRepository<VocabItem, String> {
    List<VocabItem> findByTopicId(String topicId);

    List<VocabItem> findByWordContainingIgnoreCaseOrderByWordAsc(String word, Pageable pageable);
}
