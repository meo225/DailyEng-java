package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Stores every individual review event for FSRS weight optimization.
 * <p>
 * Each row captures the card's state BEFORE the review and the user's
 * rating, enabling gradient descent on the forgetting curve parameters.
 */
@Entity
@Table(name = "\"ReviewLog\"",
       indexes = @Index(name = "idx_review_log_user", columnList = "userId"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ReviewLog extends BaseEntity {

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String vocabItemId;

    /** User's rating: 1=Again, 2=Hard, 3=Good, 4=Easy. */
    private int rating;

    /** Days elapsed since last review (0 for first review). */
    private double elapsedDays;

    /** Card stability BEFORE this review. */
    private double stability;

    /** Card difficulty BEFORE this review. */
    private double difficulty;

    /** Card state BEFORE this review. */
    @Enumerated(EnumType.STRING)
    private UserVocabProgress.SrsState state;

    /** Computed stability AFTER this review (for training labels). */
    private double newStability;

    /** Computed difficulty AFTER this review. */
    private double newDifficulty;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
