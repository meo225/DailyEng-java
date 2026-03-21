package com.dailyeng.controller;

import com.dailyeng.dto.srs.SrsDtos.*;
import com.dailyeng.service.SrsService;
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
public class SrsController extends BaseController {

    private final SrsService srsService;

    /** GET /srs/cards/due — get cards due for review */
    @GetMapping("/cards/due")
    public ResponseEntity<DueCardsResponse> getDueCards() {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.getCardsDue(userId));
    }

    /** GET /srs/cards — get all flashcards (paginated) */
    @GetMapping("/cards")
    public ResponseEntity<List<FlashcardResponse>> getAllCards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.getAllCards(userId, page, limit));
    }

    /** POST /srs/cards/{id}/review — submit a review for a card */
    @PostMapping("/cards/{id}/review")
    public ResponseEntity<ReviewResultResponse> reviewCard(
            @PathVariable String id,
            @Valid @RequestBody ReviewCardRequest req
    ) {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.reviewCard(userId, id, req.quality()));
    }

    /** GET /srs/stats — get review statistics */
    @GetMapping("/stats")
    public ResponseEntity<ReviewStatsResponse> getStats() {
        var userId = requireUserId();
        return ResponseEntity.ok(srsService.getReviewStats(userId));
    }
}
