package com.dailyeng.vocabulary;
import com.dailyeng.common.entity.BaseEntity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"ListeningTask\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class ListeningTask extends BaseEntity {
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @Column(nullable = false) private String type;
    @Column(nullable = false) private String question;
    @Column(nullable = false) private String audioUrl;
    @Column(nullable = false, columnDefinition = "TEXT") private String transcript;
    @Type(ListArrayType.class) @Column(columnDefinition = "text[]") @Builder.Default private List<String> options = new ArrayList<>();
    @Column(nullable = false) private String correctAnswer;
}
