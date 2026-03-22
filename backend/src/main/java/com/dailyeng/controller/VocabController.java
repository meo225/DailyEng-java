package com.dailyeng.controller;

import com.dailyeng.dto.vocab.VocabDtos.*;
import com.dailyeng.service.VocabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Vocabulary module — 4 endpoints.
 * Maps from vocab.ts Server Actions to REST API.
 */
@RestController
@RequestMapping("/vocab")
@RequiredArgsConstructor
public class VocabController extends BaseController {

    private final VocabService vocabService;

    // ======================== Topic Groups ========================

    /** GET /vocab/topic-groups — getVocabTopicGroups() */
    @GetMapping("/topic-groups")
    public ResponseEntity<List<TopicGroupResponse>> getTopicGroups() {
        return ResponseEntity.ok(vocabService.getTopicGroups());
    }

    // ======================== Topics ========================

    /** GET /vocab/topics — getVocabTopicsWithProgress() */
    @GetMapping("/topics")
    public ResponseEntity<VocabTopicListResponse> getTopics(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) List<String> levels,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit
    ) {
        var userId = extractUserId();
        return ResponseEntity.ok(
                vocabService.getTopicsWithProgress(userId, category, subcategory, levels, page, limit));
    }

    /** GET /vocab/topics/search — searchVocabTopics() */
    @GetMapping("/topics/search")
    public ResponseEntity<List<VocabTopicListItem>> searchTopics(@RequestParam String q) {
        return ResponseEntity.ok(vocabService.searchTopics(q));
    }

    /** GET /vocab/topics/{topicId} — getVocabTopicById() */
    @GetMapping("/topics/{topicId}")
    public ResponseEntity<VocabTopicDetailResponse> getTopicById(@PathVariable String topicId) {
        var userId = extractUserId();
        var result = vocabService.getTopicById(topicId, userId);
        return result != null
                ? ResponseEntity.ok(result)
                : ResponseEntity.notFound().build();
    }
}
