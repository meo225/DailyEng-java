package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Key-value store for site-wide CMS content (FAQs, reviews, stats, etc.)
 * stored as JSONB. One row per content key.
 */
@Entity
@Table(name = "\"SiteContent\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SiteContent extends BaseEntity {

    /** Unique content key, e.g. "faqs", "reviews", "signin_stats", "signup_benefits" */
    @Column(nullable = false, unique = true)
    private String contentKey;

    /** JSON content blob */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Object content;
}
