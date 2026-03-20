package com.dailyeng.controller;

import com.dailyeng.dto.srs.SrsDtos.*;
import com.dailyeng.service.SrsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the SRS (Spaced Repetition) module.
 * Manages flashcard review scheduling and statistics.
 */
@RestController
@RequestMapping("/srs")
@RequiredArgsConstructor
public class SrsController {

    private final SrsService srsService;

    /** GET /srs/cards/due — get cards due for review */
    @GetMapping("/cards/due")
    public ResponseEntity<DueCardsResponse> getDueCards(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(srsService.getCardsDue(userId));
    }

    /** GET /srs/cards — get all flashcards (paginated) */
    @GetMapping("/cards")
    public ResponseEntity<List<FlashcardResponse>> getAllCards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(srsService.getAllCards(userId, page, limit));
    }

    /** POST /srs/cards/{id}/review — submit a review for a card */
    @PostMapping("/cards/{id}/review")
    public ResponseEntity<ReviewResultResponse> reviewCard(
            @PathVariable String id,
            @Valid @RequestBody ReviewCardRequest req,
            HttpServletRequest request
    ) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(srsService.reviewCard(userId, id, req.quality()));
    }

    /** GET /srs/stats — get review statistics */
    @GetMapping("/stats")
    public ResponseEntity<ReviewStatsResponse> getStats(HttpServletRequest request) {
        var userId = requireUserId(request);
        return ResponseEntity.ok(srsService.getReviewStats(userId));
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
