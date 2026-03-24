package com.dailyeng.auth;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "\"Account\"", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"provider", "providerAccountId"})
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Account extends BaseEntity {

    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;

    @Column(nullable = false) private String type;
    @Column(nullable = false) private String provider;
    @Column(nullable = false) private String providerAccountId;
    @Column(columnDefinition = "TEXT") private String refresh_token;
    @Column(columnDefinition = "TEXT") private String access_token;
    private Integer expires_at;
    private String token_type;
    private String scope;
    @Column(columnDefinition = "TEXT") private String id_token;
    private String session_state;
}
