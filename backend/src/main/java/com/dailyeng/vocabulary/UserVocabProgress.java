package com.dailyeng.vocabulary;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"UserVocabProgress\"",
       uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "vocabItemId"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserVocabProgress extends BaseEntity {

    /** Card state in the FSRS lifecycle. */
    public enum SrsState { NEW, LEARNING, REVIEW, RELEARNING }

    @Column(nullable = false)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @Column(nullable = false)
    private String vocabItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocabItemId", insertable = false, updatable = false)
    private VocabItem vocabItem;

    @Builder.Default
    private int masteryLevel = 0;

    private LocalDateTime lastReviewed;

    private LocalDateTime nextReview;

    // ======================== FSRS Parameters ========================

    /** Memory stability — days until recall probability drops to 90%. */
    @Builder.Default
    private double stability = 0.0;

    /** Item difficulty on a 1-10 scale. */
    @Builder.Default
    private double difficulty = 5.0;

    /** Number of successful consecutive reviews. */
    @Builder.Default
    private int repetitions = 0;

    /** Number of times the user forgot this item (rated "Again"). */
    @Builder.Default
    private int lapses = 0;

    /** Current card state in the FSRS lifecycle. */
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private SrsState srsState = SrsState.NEW;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
