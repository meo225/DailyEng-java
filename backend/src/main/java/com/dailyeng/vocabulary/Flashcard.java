package com.dailyeng.vocabulary;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"Flashcard\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Flashcard extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    private String topicId;
    @Column(nullable = false) private String front;
    @Column(nullable = false) private String back;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    private LocalDateTime lastReviewed;
    @Builder.Default private int interval = 0;
    @Builder.Default private double easeFactor = 2.5;
    @Builder.Default private int repetitions = 0;
    private LocalDateTime nextReviewDate;
}
