package com.dailyeng.controller;

import com.dailyeng.dto.dictionary.DictionaryDtos.*;
import com.dailyeng.service.DictionaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for dictionary search.
 * Provides word and grammar search endpoints used by the
 * notebook quick-add feature.
 */
@RestController
@RequestMapping("/dictionary")
@RequiredArgsConstructor
public class DictionaryController extends BaseController {

    private final DictionaryService dictionaryService;

    /**
     * GET /dictionary/words/search?q={query}&limit={limit}
     * Search vocabulary words by keyword (case-insensitive substring match).
     */
    @GetMapping("/words/search")
    public ResponseEntity<DictionaryWordSearchResponse> searchWords(
            @RequestParam("q") String query,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        requireUserId(); // ensure authenticated
        return ResponseEntity.ok(dictionaryService.searchWords(query, limit));
    }

    /**
     * GET /dictionary/grammar/search?q={query}&limit={limit}
     * Search grammar rules by title (case-insensitive substring match).
     */
    @GetMapping("/grammar/search")
    public ResponseEntity<DictionaryGrammarSearchResponse> searchGrammar(
            @RequestParam("q") String query,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        requireUserId(); // ensure authenticated
        return ResponseEntity.ok(dictionaryService.searchGrammar(query, limit));
    }
}
