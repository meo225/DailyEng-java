package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"GrammarBookmark\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "topicId"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class GrammarBookmark extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
