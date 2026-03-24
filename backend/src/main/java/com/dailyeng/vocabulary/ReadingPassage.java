package com.dailyeng.vocabulary;
import com.dailyeng.common.entity.BaseEntity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "\"ReadingPassage\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class ReadingPassage extends BaseEntity {
    @Column(nullable = false) private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;
    @Column(nullable = false) private String title;
    @Column(nullable = false, columnDefinition = "TEXT") private String content;
    @Type(JsonType.class) @Column(columnDefinition = "jsonb") private Object glossary;
    @Type(JsonType.class) @Column(columnDefinition = "jsonb") private Object questions;
}
