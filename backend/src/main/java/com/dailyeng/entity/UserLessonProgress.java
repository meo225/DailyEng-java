package com.dailyeng.entity;

import com.dailyeng.entity.enums.LessonStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "\"UserLessonProgress\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "lessonId"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class UserLessonProgress extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String lessonId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "lessonId", insertable = false, updatable = false) private Lesson lesson;
    @Enumerated(EnumType.STRING) @Builder.Default private LessonStatus status = LessonStatus.not_started;
    @Builder.Default private int progress = 0;
    private Integer score;
    private LocalDateTime completedAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
}
