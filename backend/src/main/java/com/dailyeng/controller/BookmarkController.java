package com.dailyeng.controller;

import com.dailyeng.dto.bookmark.BookmarkDtos.*;
import com.dailyeng.service.BookmarkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Bookmark module (Vocab + Grammar).
 * Handles toggle, list, and ID operations for topic bookmarks.
 */
@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController extends BaseController {

    private final BookmarkService bookmarkService;

    // ======================== Vocab Bookmarks ========================

    /** POST /bookmarks/vocab/toggle — toggle a vocab bookmark */
    @PostMapping("/vocab/toggle")
    public ResponseEntity<ToggleBookmarkResponse> toggleVocabBookmark(
            @Valid @RequestBody ToggleBookmarkRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(bookmarkService.toggleVocabBookmark(userId, req.topicId()));
    }

    /** GET /bookmarks/vocab — list vocab bookmarks */
    @GetMapping("/vocab")
    public ResponseEntity<List<BookmarkItem>> getVocabBookmarks() {
        var userId = requireUserId();
        return ResponseEntity.ok(bookmarkService.getVocabBookmarks(userId));
    }

    /** GET /bookmarks/vocab/ids — get bookmarked topic IDs */
    @GetMapping("/vocab/ids")
    public ResponseEntity<List<String>> getVocabBookmarkIds() {
        var userId = requireUserId();
        return ResponseEntity.ok(bookmarkService.getVocabBookmarkIds(userId));
    }

    // ======================== Grammar Bookmarks ========================

    /** POST /bookmarks/grammar/toggle — toggle a grammar bookmark */
    @PostMapping("/grammar/toggle")
    public ResponseEntity<ToggleBookmarkResponse> toggleGrammarBookmark(
            @Valid @RequestBody ToggleBookmarkRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(bookmarkService.toggleGrammarBookmark(userId, req.topicId()));
    }

    /** GET /bookmarks/grammar — list grammar bookmarks */
    @GetMapping("/grammar")
    public ResponseEntity<List<BookmarkItem>> getGrammarBookmarks() {
        var userId = requireUserId();
        return ResponseEntity.ok(bookmarkService.getGrammarBookmarks(userId));
    }

    /** GET /bookmarks/grammar/ids — get bookmarked topic IDs */
    @GetMapping("/grammar/ids")
    public ResponseEntity<List<String>> getGrammarBookmarkIds() {
        var userId = requireUserId();
        return ResponseEntity.ok(bookmarkService.getGrammarBookmarkIds(userId));
    }
}
