package com.dailyeng.content;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

/**
 * Stores a complete placement test question set (all sections, reading passage, etc.)
 * as JSONB. One row per test version.
 */
@Entity
@Table(name = "\"PlacementTestQuestionSet\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PlacementTestQuestionSet extends BaseEntity {

    /** Human-readable version name, e.g. "v1", "2024-Q1" */
    @Column(nullable = false)
    private String version;

    /** Target language for this question set */
    @Builder.Default
    @Column(nullable = false)
    private String language = "en";

    /** Whether this is the active question set served to users */
    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    /** Test steps configuration (order, labels, colors) */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Object testSteps;

    /** Questions grouped by section id: { "vocabulary": [...], "grammar": [...], ... } */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Object questions;

    /** Reading passage with embedded questions */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Object readingPassage;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
