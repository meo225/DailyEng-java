package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"VerificationToken\"", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"identifier", "token"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long internalId; // No @id in Prisma, use auto-generated

    @Column(nullable = false)
    private String identifier;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expires;
}
