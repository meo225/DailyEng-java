package com.dailyeng.grammar;
import com.dailyeng.vocabulary.Topic;
import com.dailyeng.common.entity.BaseEntity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "\"GrammarNote\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class GrammarNote extends BaseEntity {
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @Column(nullable = false) private String title;
    @Column(nullable = false, columnDefinition = "TEXT") private String explanation;
    @Type(JsonType.class) @Column(columnDefinition = "jsonb", nullable = false) private Object examples;
}
