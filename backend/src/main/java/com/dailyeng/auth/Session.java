package com.dailyeng.auth;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"Session\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Session extends BaseEntity {

    @Column(nullable = false, unique = true) private String sessionToken;
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private LocalDateTime expires;
}
