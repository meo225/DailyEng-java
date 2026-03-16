package com.dailyeng.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Objects;

/**
 * Base entity class providing proper CUID-based ID generation,
 * and correct equals()/hashCode() implementation for JPA entities.
 *
 * <p>All entities should extend this class to get:
 * <ul>
 *   <li>CUID generation via io.github.thibaultmeyer.cuid library</li>
 *   <li>Identity-based equals/hashCode using the business key (id)</li>
 * </ul>
 *
 * <p><strong>Why not use Lombok @EqualsAndHashCode?</strong>
 * Lombok-generated equals/hashCode includes all fields by default,
 * which causes issues with lazy-loaded JPA associations and Hibernate proxies.
 * We only compare by {@code id} (the business key).
 */
@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseEntity {

    @Id
    @Column(length = 30)
    private String id;

    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = io.github.thibaultmeyer.cuid.CUID.randomCUID2(25).toString();
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseEntity that = (BaseEntity) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        // Use a constant hash code for consistency with JPA lifecycle:
        // entities may be added to Sets before they have an ID assigned.
        return getClass().hashCode();
    }
}
