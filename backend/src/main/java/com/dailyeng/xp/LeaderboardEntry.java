package com.dailyeng.xp;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"LeaderboardEntry\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "period", "type"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class LeaderboardEntry extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String period;
    @Column(nullable = false) private String type;
    @Builder.Default private int xp = 0;
    @Column(name = "\"rank\"") private Integer rank;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
