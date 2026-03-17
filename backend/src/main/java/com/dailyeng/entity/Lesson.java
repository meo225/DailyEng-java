package com.dailyeng.entity;

import com.dailyeng.entity.enums.LessonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "\"Lesson\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Lesson extends BaseEntity {
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @Column(nullable = false) private String title;
    private String description;
    private String duration;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"LessonType\"") private LessonType type;
    @Builder.Default @Column(name = "\"order\"") private int order = 0;
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<UserLessonProgress> userProgress = new ArrayList<>();
}
