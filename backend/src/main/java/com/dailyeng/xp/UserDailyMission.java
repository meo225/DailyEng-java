package com.dailyeng.xp;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "\"UserDailyMission\"",
       uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "missionId", "date"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserDailyMission extends BaseEntity {

    @Column(nullable = false)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @Column(nullable = false)
    private String missionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missionId", insertable = false, updatable = false)
    private DailyMission mission;

    @Builder.Default
    private int progress = 0;

    @Builder.Default
    private boolean completed = false;

    private LocalDateTime completedAt;

    @Column(columnDefinition = "DATE")
    private LocalDate date;

    @Override
    public void prePersist() {
        super.prePersist();
        if (this.date == null) {
            this.date = LocalDate.now();
        }
    }
}
