package com.dailyeng.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"ProfileStats\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ProfileStats extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @Builder.Default
    private int xp = 0;

    @Builder.Default
    private int streak = 0;

    @Builder.Default
    private int totalLearningMinutes = 0;

    /**
     * Mapped to PostgreSQL native TEXT[] column.
     * Uses hypersistence-utils ListArrayType instead of @ElementCollection
     * to avoid creating a separate join table.
     */
    @Type(ListArrayType.class)
    @Column(columnDefinition = "text[]")
    @Builder.Default
    private List<String> badges = new ArrayList<>();

    @Builder.Default
    private int coins = 0;

    @Builder.Default
    private int vocabScore = 0;

    @Builder.Default
    private int grammarScore = 0;

    @Builder.Default
    private int speakingScore = 0;

    @Builder.Default
    private int listeningScore = 0;

    @Builder.Default
    private int readingScore = 0;

    @Builder.Default
    private int writingScore = 0;

    private LocalDateTime lastStreakDate;
}
