package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"SpeakingBookmark\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "scenarioId"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class SpeakingBookmark extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String scenarioId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "scenarioId", insertable = false, updatable = false) private SpeakingScenario scenario;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
