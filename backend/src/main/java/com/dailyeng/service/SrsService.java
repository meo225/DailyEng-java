package com.dailyeng.service;

import com.dailyeng.dto.SrsCardDto;
import com.dailyeng.dto.SrsReviewStatsDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SrsService {

    public SrsCardDto calculateNextReview(SrsCardDto card, int quality) {
        int interval = card.getInterval();
        double easeFactor = card.getEaseFactor();
        int repetitions = card.getRepetitions();

        // Quality: 0-2 = incorrect, 3-5 = correct
        if (quality < 3) {
            // Incorrect - reset
            interval = 1;
            repetitions = 0;
            easeFactor = Math.max(1.3, easeFactor - 0.2);
        } else {
            // Correct
            repetitions += 1;

            if (repetitions == 1) {
                interval = 1;
            } else if (repetitions == 2) {
                interval = 3;
            } else {
                interval = (int) Math.round(interval * easeFactor);
            }

            // Adjust ease factor
            easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        }

        LocalDateTime nextReviewDate = LocalDateTime.now().plusDays(interval);

        return SrsCardDto.builder()
                .id(card.getId())
                .front(card.getFront())
                .back(card.getBack())
                .interval(interval)
                .easeFactor(Math.min(2.5, easeFactor))
                .repetitions(repetitions)
                .nextReviewDate(nextReviewDate)
                .lastReviewDate(LocalDateTime.now())
                .build();
    }

    public List<SrsCardDto> getCardsDue(List<SrsCardDto> cards) {
        LocalDateTime now = LocalDateTime.now();
        return cards.stream()
                .filter(card -> card.getNextReviewDate() != null && !card.getNextReviewDate().isAfter(now))
                .sorted(Comparator.comparing(SrsCardDto::getNextReviewDate))
                .collect(Collectors.toList());
    }

    public SrsReviewStatsDto getReviewStats(List<SrsCardDto> cards) {
        LocalDateTime now = LocalDateTime.now();

        int due = 0;
        int newCards = 0;
        int learning = 0;
        int review = 0;

        for (SrsCardDto card : cards) {
            if (card.getNextReviewDate() != null && !card.getNextReviewDate().isAfter(now)) {
                due++;
            }

            int reps = card.getRepetitions();
            if (reps == 0) {
                newCards++;
            } else if (reps > 0 && reps < 3) {
                learning++;
            } else if (reps >= 3) {
                review++;
            }
        }

        return SrsReviewStatsDto.builder()
                .due(due)
                .newCards(newCards)
                .learning(learning)
                .review(review)
                .total(cards.size())
                .build();
    }
}
