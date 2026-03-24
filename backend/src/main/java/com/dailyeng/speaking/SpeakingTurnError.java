package com.dailyeng.speaking;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "\"SpeakingTurnError\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class SpeakingTurnError extends BaseEntity {
    @Column(nullable = false) private String turnId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "turnId", insertable = false, updatable = false) private SpeakingTurn turn;
    @Column(nullable = false) private String word;
    @Column(nullable = false) private String correction;
    @Column(nullable = false) private String errorType;
    private int startIndex;
    private int endIndex;
}
