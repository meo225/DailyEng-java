package com.dailyeng.notebook;
import com.dailyeng.user.User;
import com.dailyeng.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "\"Notebook\"", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "name", "language"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Notebook extends BaseEntity {
    @Column(nullable = false) private String userId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId", insertable = false, updatable = false) private User user;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String type;
    @Builder.Default @Column(nullable = false) private String language = "en";
    @Builder.Default private String color = "primary";
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "notebook", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<NotebookItem> items = new ArrayList<>();
}
