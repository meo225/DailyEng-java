package com.dailyeng.studyplan;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import com.dailyeng.common.enums.Level;
import com.dailyeng.common.enums.StudyGoal;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"StudyPlan\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "language"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class StudyPlan extends BaseEntity {
    @Column(nullable = false) private String userId;
    @Builder.Default @Column(nullable = false) private String language = "en";
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"StudyGoal\"") private StudyGoal goal;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"Level\"") private Level level;
    private int minutesPerDay;
    @Builder.Default private int wordsPerDay = 10;
    @Type(ListArrayType.class) @Column(columnDefinition = "text[]") @Builder.Default private List<String> interests = new ArrayList<>();
    @Type(JsonType.class) @Column(columnDefinition = "jsonb") private Object preferences;
    private LocalDateTime examDate;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<StudyTask> tasks = new ArrayList<>();
}
