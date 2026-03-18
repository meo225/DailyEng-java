package com.dailyeng.entity;

import com.dailyeng.entity.enums.Role;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"SpeakingTurn\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class SpeakingTurn extends BaseEntity {

    @Column(nullable = false) private String sessionId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "sessionId", insertable = false, updatable = false) private SpeakingSession session;

    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"Role\"") private Role role;
    @Column(nullable = false, columnDefinition = "TEXT") private String text;
    private String audioUrl;

    @CreationTimestamp @Column(updatable = false) private LocalDateTime timestamp;

    // Scores
    private Integer pronunciationScore;
    private Integer fluencyScore;

    // Raw metrics — Prisma stores Float[] as PostgreSQL DOUBLE PRECISION[]
    @Type(ListArrayType.class)
    @Column(name = "\"confidenceScores\"", columnDefinition = "double precision[]")
    @Builder.Default
    private List<Double> confidenceScores = new ArrayList<>();

    private Integer wordCount;
    private Integer speakingDurationMs;
    private Integer pauseCount;

    // Pitch analysis
    private Double pitchVariance;
    private Double avgPitch;
    private Integer pitchSamplesCount;

    // Per-word pronunciation assessment data from Azure Speech SDK (JSONB)
    @Type(JsonType.class)
    @Column(name = "\"wordAssessmentsJson\"", columnDefinition = "jsonb")
    private Object wordAssessmentsJson;

    @OneToMany(mappedBy = "turn", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<SpeakingTurnError> errors = new ArrayList<>();
}
