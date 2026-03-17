package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDate;

@Entity @Table(name = "\"UserActivity\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "date"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class UserActivity extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(columnDefinition = "DATE", nullable = false) private LocalDate date;
    @Builder.Default private int lessonsCount = 0;
    @Builder.Default private int minutesSpent = 0;
    @Builder.Default private int wordsLearned = 0;
    @Builder.Default private int xpEarned = 0;
}
