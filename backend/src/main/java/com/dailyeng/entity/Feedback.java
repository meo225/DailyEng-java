package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"Feedback\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Feedback extends BaseEntity {
    private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false, columnDefinition = "TEXT") private String content;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
