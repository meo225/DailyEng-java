package com.dailyeng.content;

import com.dailyeng.content.BookmarkDtos.*;
import com.dailyeng.grammar.GrammarBookmark;
import com.dailyeng.vocabulary.VocabBookmark;
import com.dailyeng.common.exception.ResourceNotFoundException;
import com.dailyeng.grammar.GrammarBookmarkRepository;
import com.dailyeng.vocabulary.TopicRepository;
import com.dailyeng.vocabulary.VocabBookmarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Bookmark service — manages Vocab and Grammar topic bookmarks.
 * Handles: toggle, list, and ID retrieval for both bookmark types.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final VocabBookmarkRepository vocabBookmarkRepo;
    private final GrammarBookmarkRepository grammarBookmarkRepo;
    private final TopicRepository topicRepo;

    // ========================================================================
    // Vocab Bookmarks
    // ========================================================================

    @Transactional
    public ToggleBookmarkResponse toggleVocabBookmark(String userId, String topicId) {
        var existing = vocabBookmarkRepo.findByUserIdAndTopicId(userId, topicId);
        if (existing.isPresent()) {
            vocabBookmarkRepo.delete(existing.get());
            log.info("🔖 Removed vocab bookmark for topic {} by user {}", topicId, userId);
            return new ToggleBookmarkResponse(false);
        }

        // Validate topic exists
        topicRepo.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found: " + topicId));

        var bookmark = VocabBookmark.builder()
                .userId(userId)
                .topicId(topicId)
                .build();
        vocabBookmarkRepo.save(bookmark);
        log.info("🔖 Added vocab bookmark for topic {} by user {}", topicId, userId);
        return new ToggleBookmarkResponse(true);
    }

    @Transactional(readOnly = true)
    public List<BookmarkItem> getVocabBookmarks(String userId) {
        var bookmarks = vocabBookmarkRepo.findByUserId(userId);
        return bookmarks.stream().map(b -> {
            var topic = topicRepo.findById(b.getTopicId()).orElse(null);
            return new BookmarkItem(
                    b.getId(), b.getTopicId(),
                    topic != null ? topic.getTitle() : "Unknown",
                    topic != null ? topic.getDescription() : "",
                    topic != null && topic.getLevel() != null ? topic.getLevel().name() : "B1",
                    topic != null ? topic.getThumbnail() : null,
                    topic != null ? topic.getCategory() : null,
                    b.getCreatedAt() != null ? b.getCreatedAt().toString() : null);
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<String> getVocabBookmarkIds(String userId) {
        return vocabBookmarkRepo.findByUserId(userId).stream()
                .map(VocabBookmark::getTopicId)
                .toList();
    }

    // ========================================================================
    // Grammar Bookmarks
    // ========================================================================

    @Transactional
    public ToggleBookmarkResponse toggleGrammarBookmark(String userId, String topicId) {
        var existing = grammarBookmarkRepo.findByUserIdAndTopicId(userId, topicId);
        if (existing.isPresent()) {
            grammarBookmarkRepo.delete(existing.get());
            log.info("🔖 Removed grammar bookmark for topic {} by user {}", topicId, userId);
            return new ToggleBookmarkResponse(false);
        }

        topicRepo.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found: " + topicId));

        var bookmark = GrammarBookmark.builder()
                .userId(userId)
                .topicId(topicId)
                .build();
        grammarBookmarkRepo.save(bookmark);
        log.info("🔖 Added grammar bookmark for topic {} by user {}", topicId, userId);
        return new ToggleBookmarkResponse(true);
    }

    @Transactional(readOnly = true)
    public List<BookmarkItem> getGrammarBookmarks(String userId) {
        var bookmarks = grammarBookmarkRepo.findByUserId(userId);
        return bookmarks.stream().map(b -> {
            var topic = topicRepo.findById(b.getTopicId()).orElse(null);
            return new BookmarkItem(
                    b.getId(), b.getTopicId(),
                    topic != null ? topic.getTitle() : "Unknown",
                    topic != null ? topic.getDescription() : "",
                    topic != null && topic.getLevel() != null ? topic.getLevel().name() : "B1",
                    topic != null ? topic.getThumbnail() : null,
                    topic != null ? topic.getCategory() : null,
                    b.getCreatedAt() != null ? b.getCreatedAt().toString() : null);
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<String> getGrammarBookmarkIds(String userId) {
        return grammarBookmarkRepo.findByUserId(userId).stream()
                .map(GrammarBookmark::getTopicId)
                .toList();
    }
}
