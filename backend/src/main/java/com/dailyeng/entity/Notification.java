package com.dailyeng.entity;

import com.dailyeng.entity.enums.NotificationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "\"Notification\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Notification extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String message;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"NotificationType\"") private NotificationType type;
    @Builder.Default private boolean isRead = false;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
