package com.dailyeng.controller;

import com.dailyeng.dto.grammar.GrammarDtos.*;
import com.dailyeng.service.GrammarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Grammar module — 5 endpoints.
 * Maps from grammar.ts Server Actions to REST API.
 */
@RestController
@RequestMapping("/grammar")
@RequiredArgsConstructor
public class GrammarController extends BaseController {

    private final GrammarService grammarService;

    // ======================== Topic Groups ========================

    /** GET /grammar/topic-groups — getGrammarTopicGroups() */
    @GetMapping("/topic-groups")
    public ResponseEntity<List<TopicGroupResponse>> getTopicGroups() {
        return ResponseEntity.ok(grammarService.getTopicGroups());
    }

    // ======================== Topics ========================

    /** GET /grammar/topics — getGrammarTopicsWithProgress() */
    @GetMapping("/topics")
    public ResponseEntity<GrammarTopicListResponse> getTopics(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) List<String> levels,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "100") int limit
    ) {
        var userId = extractUserId();
        return ResponseEntity.ok(
                grammarService.getTopicsWithProgress(userId, category, subcategory, levels, page, limit));
    }

    /** GET /grammar/topics/search — searchGrammarTopics() */
    @GetMapping("/topics/search")
    public ResponseEntity<List<GrammarTopicListItem>> searchTopics(@RequestParam String q) {
        return ResponseEntity.ok(grammarService.searchTopics(q));
    }

    /** GET /grammar/topics/{topicId} — getGrammarTopicById() */
    @GetMapping("/topics/{topicId}")
    public ResponseEntity<GrammarTopicDetailResponse> getTopicById(@PathVariable String topicId) {
        var result = grammarService.getTopicById(topicId);
        return result != null
                ? ResponseEntity.ok(result)
                : ResponseEntity.notFound().build();
    }

    // ======================== Current Topic ========================

    /** GET /grammar/current — getCurrentGrammarTopic() */
    @GetMapping("/current")
    public ResponseEntity<CurrentGrammarTopicResponse> getCurrentTopic() {
        var userId = requireUserId();
        var result = grammarService.getCurrentTopic(userId);
        return result != null
                ? ResponseEntity.ok(result)
                : ResponseEntity.noContent().build();
    }
}
