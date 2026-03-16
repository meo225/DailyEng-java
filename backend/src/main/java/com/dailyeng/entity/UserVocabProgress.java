package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"UserVocabProgress\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "vocabItemId"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class UserVocabProgress extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String vocabItemId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "vocabItemId", insertable = false, updatable = false) private VocabItem vocabItem;
    @Builder.Default private int masteryLevel = 0;
    private LocalDateTime lastReviewed;
    private LocalDateTime nextReview;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
}
