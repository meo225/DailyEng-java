package com.dailyeng.vocabulary;
import com.dailyeng.common.entity.BaseEntity;

import com.dailyeng.common.enums.QuizType;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"QuizItem\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class QuizItem extends BaseEntity {
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @Column(nullable = false) private String question;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"QuizType\"") private QuizType type;
    @Type(ListArrayType.class) @Column(columnDefinition = "text[]") @Builder.Default private List<String> options = new ArrayList<>();
    @Column(nullable = false) private String correctAnswer;
    @Column(nullable = false) private String explanation;
}
