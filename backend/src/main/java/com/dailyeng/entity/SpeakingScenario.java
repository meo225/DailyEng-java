package com.dailyeng.entity;

import com.dailyeng.entity.enums.Level;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"SpeakingScenario\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class SpeakingScenario extends BaseEntity {

    private String topicId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicId", insertable = false, updatable = false) private Topic topic;

    @Column(nullable = false) private String title;
    @Column(nullable = false) private String description;
    @Column(nullable = false) private String goal;
    @Enumerated(EnumType.STRING) private Level difficulty;
    @Column(nullable = false, columnDefinition = "TEXT") private String context;

    private String category;
    private String subcategory;
    private String image;

    @Type(JsonType.class) @Column(columnDefinition = "jsonb") private Object objectives;
    @Type(JsonType.class) @Column(columnDefinition = "jsonb") private Object keyExpressions;

    private String userRole;
    private String botRole;
    private String openingLine;

    private String createdById;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "createdById", insertable = false, updatable = false) private User createdBy;
    @Builder.Default private boolean isCustom = false;

    private String topicGroupId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicGroupId", insertable = false, updatable = false) private TopicGroup topicGroup;

    @OneToMany(mappedBy = "scenario", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<SpeakingSession> sessions = new ArrayList<>();
    @OneToMany(mappedBy = "scenario", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<SpeakingBookmark> bookmarks = new ArrayList<>();
}
