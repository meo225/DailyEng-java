package com.dailyeng.xp;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "\"DailyMission\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class DailyMission extends BaseEntity {
    @Column(nullable = false) private String title;
    private String description;
    @Builder.Default private int points = 0;
    @Column(nullable = false) private String type;
    @Builder.Default private int requirement = 1;
    @Builder.Default private boolean isActive = true;
    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<UserDailyMission> userMissions = new ArrayList<>();
}
