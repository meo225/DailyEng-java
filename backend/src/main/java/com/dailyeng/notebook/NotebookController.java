package com.dailyeng.notebook;

import com.dailyeng.common.web.BaseController;

import com.dailyeng.notebook.NotebookDtos.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Notebook module.
 * Manages notebooks and vocabulary items.
 */
@RestController
@RequestMapping("/notebooks")
@RequiredArgsConstructor
public class NotebookController extends BaseController {

    private final NotebookService notebookService;

    // ======================== Notebooks ========================

    /** GET /notebooks — list user's notebooks */
    @GetMapping
    public ResponseEntity<NotebookListResponse> getNotebooks(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.getNotebooks(userId, language));
    }

    /** POST /notebooks — create a new notebook */
    @PostMapping
    public ResponseEntity<NotebookResponse> createNotebook(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language,
            @Valid @RequestBody CreateNotebookRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.createNotebook(userId, language, req));
    }

    /** PUT /notebooks/{id} — update a notebook */
    @PutMapping("/{id}")
    public ResponseEntity<NotebookResponse> updateNotebook(
            @PathVariable String id,
            @RequestBody UpdateNotebookRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.updateNotebook(userId, id, req));
    }

    /** DELETE /notebooks/{id} — delete a notebook */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotebook(@PathVariable String id) {
        var userId = requireUserId();
        notebookService.deleteNotebook(userId, id);
        return ResponseEntity.noContent().build();
    }

    // ======================== Items ========================

    /** GET /notebooks/{id}/items — list items in a notebook */
    @GetMapping("/{id}/items")
    public ResponseEntity<List<NotebookItemResponse>> getItems(@PathVariable String id) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.getNotebookItems(userId, id));
    }

    /** GET /notebooks/items — list all items across notebooks (optional ?notebookId= filter) */
    @GetMapping("/items")
    public ResponseEntity<List<NotebookItemResponse>> getAllItems(
            @RequestParam(required = false) String notebookId
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.getAllItems(userId, notebookId));
    }

    /** POST /notebooks/items — create a new item */
    @PostMapping("/items")
    public ResponseEntity<NotebookItemResponse> createItem(
            @Valid @RequestBody CreateItemRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.createNotebookItem(userId, req));
    }

    /** PUT /notebooks/items/{itemId} — update an item */
    @PutMapping("/items/{itemId}")
    public ResponseEntity<NotebookItemResponse> updateItem(
            @PathVariable String itemId,
            @RequestBody UpdateItemRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.updateNotebookItem(userId, itemId, req));
    }

    /** DELETE /notebooks/items/{itemId} — delete an item */
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable String itemId) {
        var userId = requireUserId();
        notebookService.deleteNotebookItem(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    /** PATCH /notebooks/items/{itemId}/mastery — update mastery level */
    @PatchMapping("/items/{itemId}/mastery")
    public ResponseEntity<NotebookItemResponse> updateMastery(
            @PathVariable String itemId,
            @Valid @RequestBody UpdateMasteryRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.updateMastery(userId, itemId, req.masteryLevel()));
    }

    /** POST /notebooks/items/{itemId}/star — toggle star */
    @PostMapping("/items/{itemId}/star")
    public ResponseEntity<NotebookItemResponse> toggleStar(@PathVariable String itemId) {
        var userId = requireUserId();
        return ResponseEntity.ok(notebookService.toggleStar(userId, itemId));
    }
}
