package com.dailyeng.vocabulary;
import com.dailyeng.speaking.SpeakingScenario;
import com.dailyeng.common.entity.BaseEntity;

import com.dailyeng.common.enums.HubType;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"TopicGroup\"", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name", "hubType", "language"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TopicGroup extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Builder.Default
    @Column(nullable = false)
    private String language = "en";

    @Builder.Default
    @Column(name = "\"order\"")
    private int order = 0;

    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @Column(nullable = false, columnDefinition = "\"HubType\"")
    private HubType hubType;

    @Type(ListArrayType.class)
    @Column(columnDefinition = "text[]")
    @Builder.Default
    private List<String> subcategories = new ArrayList<>();

    @OneToMany(mappedBy = "topicGroup")
    @Builder.Default
    private List<SpeakingScenario> speakingScenarios = new ArrayList<>();

    @OneToMany(mappedBy = "topicGroup")
    @Builder.Default
    private List<Topic> topics = new ArrayList<>();
}
