package com.dailyeng.vocabulary;
import com.dailyeng.common.entity.BaseEntity;

import com.dailyeng.common.enums.PartOfSpeech;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"VocabItem\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class VocabItem extends BaseEntity {

    @Column(nullable = false)
    private String topicId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topicId", insertable = false, updatable = false)
    private Topic topic;

    @Column(nullable = false)
    private String word;

    private String pronunciation;
    private String phonBr;
    private String phonNAm;

    @Column(nullable = false)
    private String meaning;

    @Column(name = "\"vietnameseMeaning\"", nullable = false)
    private String vietnameseMeaning;

    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @Column(nullable = false, columnDefinition = "\"PartOfSpeech\"")
    private PartOfSpeech partOfSpeech;

    @Type(ListArrayType.class)
    @Column(columnDefinition = "text[]")
    @Builder.Default
    private List<String> collocations = new ArrayList<>();

    @Column(nullable = false)
    private String exampleSentence;

    @Column(nullable = false)
    private String exampleTranslation;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Object definitions;

    @Type(ListArrayType.class)
    @Column(columnDefinition = "text[]")
    @Builder.Default
    private List<String> synonyms = new ArrayList<>();

    @Type(ListArrayType.class)
    @Column(columnDefinition = "text[]")
    @Builder.Default
    private List<String> antonyms = new ArrayList<>();

    @OneToMany(mappedBy = "vocabItem", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserVocabProgress> userProgress = new ArrayList<>();
}
