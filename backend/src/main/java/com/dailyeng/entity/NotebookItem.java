package com.dailyeng.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"NotebookItem\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class NotebookItem extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String word;
    private String pronunciation;
    @Type(ListArrayType.class) @Column(columnDefinition = "text[]") @Builder.Default private List<String> meaning = new ArrayList<>();
    @Type(ListArrayType.class) @Column(columnDefinition = "text[]") @Builder.Default private List<String> vietnamese = new ArrayList<>();
    @Type(JsonType.class) @Column(columnDefinition = "jsonb", nullable = false) private Object examples;
    private String partOfSpeech;
    private String level;
    private String note;
    @Type(ListArrayType.class) @Column(columnDefinition = "text[]") @Builder.Default private List<String> tags = new ArrayList<>();
    @Column(nullable = false) private String notebookId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "notebookId", insertable = false, updatable = false) private Notebook notebook;
    @Builder.Default private int masteryLevel = 0;
    @Builder.Default private boolean isStarred = false;
    private LocalDateTime lastReviewed;
    private LocalDateTime nextReview;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
}
