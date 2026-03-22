package com.dailyeng.service;

import com.dailyeng.dto.notebook.NotebookDtos.*;
import com.dailyeng.entity.Notebook;
import com.dailyeng.entity.NotebookItem;
import com.dailyeng.exception.BadRequestException;
import com.dailyeng.exception.ResourceNotFoundException;
import com.dailyeng.repository.NotebookItemRepository;
import com.dailyeng.repository.NotebookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Notebook module service — manages user notebooks and vocabulary items.
 * Handles: notebook CRUD, item CRUD, mastery tracking, and star toggles.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotebookService {

    private static final int MASTERY_THRESHOLD = 80;

    private final NotebookRepository notebookRepo;
    private final NotebookItemRepository itemRepo;

    // ========================================================================
    // 1. getNotebooks
    // ========================================================================

    @Transactional(readOnly = true)
    public NotebookListResponse getNotebooks(String userId) {
        var notebooks = notebookRepo.findAllByUserIdOrderByCreatedAtAsc(userId);
        var responses = notebooks.stream().map(this::toNotebookResponse).toList();
        return new NotebookListResponse(responses, responses.size());
    }

    // ========================================================================
    // 2. createNotebook
    // ========================================================================

    @Transactional
    public NotebookResponse createNotebook(String userId, CreateNotebookRequest req) {
        if (notebookRepo.existsByUserIdAndName(userId, req.name())) {
            throw new BadRequestException("Notebook with name '" + req.name() + "' already exists");
        }

        var notebook = Notebook.builder()
                .userId(userId)
                .name(req.name())
                .type(req.type())
                .color(req.color() != null ? req.color() : "primary")
                .build();
        notebookRepo.save(notebook);

        log.info("📓 Created notebook '{}' for user {}", req.name(), userId);
        return new NotebookResponse(notebook.getId(), notebook.getName(),
                notebook.getType(), notebook.getColor(), 0, 0);
    }

    // ========================================================================
    // 3. updateNotebook
    // ========================================================================

    @Transactional
    public NotebookResponse updateNotebook(String userId, String notebookId, UpdateNotebookRequest req) {
        var notebook = findNotebookByIdAndUser(notebookId, userId);

        if (req.name() != null) notebook.setName(req.name());
        if (req.color() != null) notebook.setColor(req.color());
        notebookRepo.save(notebook);

        log.info("📓 Updated notebook {} for user {}", notebookId, userId);
        return toNotebookResponse(notebook);
    }

    // ========================================================================
    // 4. deleteNotebook
    // ========================================================================

    @Transactional
    public void deleteNotebook(String userId, String notebookId) {
        var notebook = findNotebookByIdAndUser(notebookId, userId);
        notebookRepo.delete(notebook);
        log.info("🗑️ Deleted notebook {} for user {}", notebookId, userId);
    }

    // ========================================================================
    // 5. getNotebookItems
    // ========================================================================

    @Transactional(readOnly = true)
    public List<NotebookItemResponse> getNotebookItems(String userId, String notebookId) {
        var items = itemRepo.findAllByNotebookIdAndUserIdOrderByCreatedAtDesc(notebookId, userId);
        return items.stream().map(this::toItemResponse).toList();
    }

    // ========================================================================
    // 5b. getAllItems (across all notebooks, optionally filtered)
    // ========================================================================

    @Transactional(readOnly = true)
    public List<NotebookItemResponse> getAllItems(String userId, String notebookId) {
        List<com.dailyeng.entity.NotebookItem> items;
        if (notebookId != null && !notebookId.isBlank()) {
            items = itemRepo.findAllByNotebookIdAndUserIdOrderByCreatedAtDesc(notebookId, userId);
        } else {
            items = itemRepo.findAllByUserIdOrderByCreatedAtDesc(userId);
        }
        return items.stream().map(this::toItemResponse).toList();
    }

    // ========================================================================
    // 6. createNotebookItem
    // ========================================================================

    @Transactional
    public NotebookItemResponse createNotebookItem(String userId, CreateItemRequest req) {
        // Validate notebook exists and belongs to user
        findNotebookByIdAndUser(req.notebookId(), userId);

        var item = NotebookItem.builder()
                .userId(userId)
                .notebookId(req.notebookId())
                .word(req.word())
                .pronunciation(req.pronunciation())
                .meaning(req.meaning() != null ? req.meaning() : List.of())
                .vietnamese(req.vietnamese() != null ? req.vietnamese() : List.of())
                .examples(req.examples() != null ? req.examples() : List.of())
                .partOfSpeech(req.partOfSpeech())
                .level(req.level())
                .note(req.note())
                .tags(req.tags() != null ? req.tags() : List.of())
                .masteryLevel(0)
                .nextReview(LocalDateTime.now())
                .build();
        itemRepo.save(item);

        log.info("📝 Created item '{}' in notebook {} for user {}", req.word(), req.notebookId(), userId);
        return toItemResponse(item);
    }

    // ========================================================================
    // 7. updateNotebookItem
    // ========================================================================

    @Transactional
    public NotebookItemResponse updateNotebookItem(String userId, String itemId, UpdateItemRequest req) {
        var item = findItemByIdAndUser(itemId, userId);

        if (req.pronunciation() != null) item.setPronunciation(req.pronunciation());
        if (req.meaning() != null) item.setMeaning(req.meaning());
        if (req.vietnamese() != null) item.setVietnamese(req.vietnamese());
        if (req.examples() != null) item.setExamples(req.examples());
        if (req.partOfSpeech() != null) item.setPartOfSpeech(req.partOfSpeech());
        if (req.level() != null) item.setLevel(req.level());
        if (req.note() != null) item.setNote(req.note());
        if (req.tags() != null) item.setTags(req.tags());
        itemRepo.save(item);

        log.info("📝 Updated item {} for user {}", itemId, userId);
        return toItemResponse(item);
    }

    // ========================================================================
    // 8. deleteNotebookItem
    // ========================================================================

    @Transactional
    public void deleteNotebookItem(String userId, String itemId) {
        var item = findItemByIdAndUser(itemId, userId);
        itemRepo.delete(item);
        log.info("🗑️ Deleted item {} for user {}", itemId, userId);
    }

    // ========================================================================
    // 9. updateMastery
    // ========================================================================

    @Transactional
    public NotebookItemResponse updateMastery(String userId, String itemId, int masteryLevel) {
        var item = findItemByIdAndUser(itemId, userId);

        int safeMastery = Math.max(0, Math.min(100, masteryLevel));
        item.setMasteryLevel(safeMastery);
        item.setLastReviewed(LocalDateTime.now());
        itemRepo.save(item);

        log.info("📊 Updated mastery for item {} to {} for user {}", itemId, safeMastery, userId);
        return toItemResponse(item);
    }

    // ========================================================================
    // 10. toggleStar
    // ========================================================================

    @Transactional
    public NotebookItemResponse toggleStar(String userId, String itemId) {
        var item = findItemByIdAndUser(itemId, userId);
        item.setStarred(!item.isStarred());
        itemRepo.save(item);

        log.info("⭐ Toggled star for item {} to {} for user {}", itemId, item.isStarred(), userId);
        return toItemResponse(item);
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    private Notebook findNotebookByIdAndUser(String notebookId, String userId) {
        return notebookRepo.findByIdAndUserId(notebookId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notebook not found: " + notebookId));
    }

    private NotebookItem findItemByIdAndUser(String itemId, String userId) {
        return itemRepo.findByIdAndUserId(itemId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notebook item not found: " + itemId));
    }

    private NotebookResponse toNotebookResponse(Notebook notebook) {
        int count = notebook.getItems() != null ? notebook.getItems().size() : 0;
        int mastered = notebook.getItems() != null
                ? (int) notebook.getItems().stream().filter(i -> i.getMasteryLevel() >= MASTERY_THRESHOLD).count()
                : 0;
        return new NotebookResponse(
                notebook.getId(), notebook.getName(), notebook.getType(),
                notebook.getColor(), count, mastered);
    }

    private NotebookItemResponse toItemResponse(NotebookItem item) {
        // Resolve notebook name and color for the enriched response
        String nbName = null;
        String nbColor = null;
        if (item.getNotebookId() != null) {
            var nb = notebookRepo.findById(item.getNotebookId()).orElse(null);
            if (nb != null) {
                nbName = nb.getName();
                nbColor = nb.getColor();
            }
        }
        return new NotebookItemResponse(
                item.getId(), item.getWord(), item.getPronunciation(),
                item.getMeaning(), item.getVietnamese(), item.getExamples(),
                item.getPartOfSpeech(), item.getLevel(), item.getNote(),
                item.getTags(), item.getNotebookId(), nbName, nbColor,
                item.getMasteryLevel(), item.isStarred(),
                item.getLastReviewed() != null ? item.getLastReviewed().toString() : null,
                item.getNextReview() != null ? item.getNextReview().toString() : null,
                item.getCreatedAt() != null ? item.getCreatedAt().toString() : null);
    }
}