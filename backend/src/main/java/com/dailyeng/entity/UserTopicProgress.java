package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity @Table(name = "\"UserTopicProgress\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "topicId"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class UserTopicProgress extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @Builder.Default private int progress = 0;
}
