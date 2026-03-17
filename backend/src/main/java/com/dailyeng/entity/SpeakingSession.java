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
    private Integer relevanceScore;
    private Integer fluencyScore;
    private Integer pronunciationScore;
    private Integer intonationScore;

    private String feedbackTitle;
    private String feedbackSummary;
    private String feedbackRating;
    private String feedbackTip;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<SpeakingTurn> turns = new ArrayList<>();
}
