package com.dailyeng.controller;

import com.dailyeng.dto.notebook.NotebookDtos.*;
import com.dailyeng.service.NotebookService;
import jakarta.servlet.http.HttpServletRequest;
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
public class NotebookController {

    private final NotebookService notebookService;

    // ======================== Notebooks ========================

    /** GET /notebooks — list user's notebooks */
    @GetMapping
    public ResponseEntity<NotebookListResponse> getNotebooks(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.getNotebooks(userId));
    }

    /** POST /notebooks — create a new notebook */
    @PostMapping
    public ResponseEntity<NotebookResponse> createNotebook(
            @Valid @RequestBody CreateNotebookRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.createNotebook(userId, req));
    }

    /** PUT /notebooks/{id} — update a notebook */
    @PutMapping("/{id}")
    public ResponseEntity<NotebookResponse> updateNotebook(
            @PathVariable String id,
            @RequestBody UpdateNotebookRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.updateNotebook(userId, id, req));
    }

    /** DELETE /notebooks/{id} — delete a notebook */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotebook(
            @PathVariable String id,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        notebookService.deleteNotebook(userId, id);
        return ResponseEntity.noContent().build();
    }

    // ======================== Items ========================

    /** GET /notebooks/{id}/items — list items in a notebook */
    @GetMapping("/{id}/items")
    public ResponseEntity<List<NotebookItemResponse>> getItems(
            @PathVariable String id,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.getNotebookItems(userId, id));
    }

    /** POST /notebooks/items — create a new item */
    @PostMapping("/items")
    public ResponseEntity<NotebookItemResponse> createItem(
            @Valid @RequestBody CreateItemRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.createNotebookItem(userId, req));
    }

    /** PUT /notebooks/items/{itemId} — update an item */
    @PutMapping("/items/{itemId}")
    public ResponseEntity<NotebookItemResponse> updateItem(
            @PathVariable String itemId,
            @RequestBody UpdateItemRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.updateNotebookItem(userId, itemId, req));
    }

    /** DELETE /notebooks/items/{itemId} — delete an item */
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(
            @PathVariable String itemId,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        notebookService.deleteNotebookItem(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    /** PATCH /notebooks/items/{itemId}/mastery — update mastery level */
    @PatchMapping("/items/{itemId}/mastery")
    public ResponseEntity<NotebookItemResponse> updateMastery(
            @PathVariable String itemId,
            @Valid @RequestBody UpdateMasteryRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.updateMastery(userId, itemId, req.masteryLevel()));
    }

    /** POST /notebooks/items/{itemId}/star — toggle star */
    @PostMapping("/items/{itemId}/star")
    public ResponseEntity<NotebookItemResponse> toggleStar(
            @PathVariable String itemId,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(notebookService.toggleStar(userId, itemId));
    }

    // ======================== Helpers ========================

    private String requireUserId(HttpServletRequest request) {
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName();
        }
        throw new com.dailyeng.exception.UnauthorizedException("Authentication required");
    }
}
