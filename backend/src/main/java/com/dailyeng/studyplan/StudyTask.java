package com.dailyeng.studyplan;
import com.dailyeng.common.entity.BaseEntity;

import com.dailyeng.common.enums.TaskType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;

@Entity @Table(name = "\"StudyTask\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class StudyTask extends BaseEntity {
    @Column(nullable = false) private String planId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "planId", insertable = false, updatable = false) private StudyPlan plan;
    @Column(nullable = false) private LocalDateTime date;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"TaskType\"") private TaskType type;
    @Builder.Default private boolean completed = false;
    private String title;
    private String startTime;
    private String endTime;
    private String link;
}
