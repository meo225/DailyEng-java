package com.dailyeng.entity;

import com.dailyeng.entity.enums.Level;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import java.time.LocalDateTime;

@Entity @Table(name = "\"PlacementTestResult\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class PlacementTestResult extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    private int score;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"Level\"") private Level level;
    @Type(JsonType.class) @Column(columnDefinition = "jsonb") private Object breakdown;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
