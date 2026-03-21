package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"SpeakingSession\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class SpeakingSession extends BaseEntity {

    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;

    @Column(nullable = false) private String scenarioId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "scenarioId", insertable = false, updatable = false) private SpeakingScenario scenario;

    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    private LocalDateTime endedAt;
    private Integer duration;

    private Integer overallScore;
    private Integer grammarScore;
    private Integer topicScore;
    private Integer fluencyScore;
    private Integer accuracyScore;
    private Integer prosodyScore;
    private Integer vocabularyScore;

    @Column(columnDefinition = "TEXT") private String feedbackTitle;
    @Column(columnDefinition = "TEXT") private String feedbackSummary;
    @Column(columnDefinition = "TEXT") private String feedbackRating;
    @Column(columnDefinition = "TEXT") private String feedbackTip;

    private Integer variationSeed;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<SpeakingTurn> turns = new ArrayList<>();
}
