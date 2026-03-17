package com.dailyeng.entity;

import com.dailyeng.entity.enums.Level;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"Topic\"")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
public class Topic extends BaseEntity {

    @Column(nullable = false) private String title;
    private String subtitle;
    @Column(nullable = false) private String description;
    @Enumerated(EnumType.STRING) @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM) @Column(nullable = false, columnDefinition = "\"Level\"") private Level level;
    private int wordCount;
    private int estimatedTime;
    private String thumbnail;
    private String category;
    private String subcategory;
    @Builder.Default @Column(name = "\"order\"") private int order = 0;

    private String topicGroupId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "topicGroupId", insertable = false, updatable = false) private TopicGroup topicGroup;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<VocabItem> vocabItems = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<GrammarNote> grammarNotes = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<QuizItem> quizItems = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<ListeningTask> listeningTasks = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<ReadingPassage> readingPassages = new ArrayList<>();
    @OneToMany(mappedBy = "topic") @Builder.Default
    private List<SpeakingScenario> speakingScenarios = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<UserTopicProgress> userProgress = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<Lesson> lessons = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<VocabBookmark> vocabBookmarks = new ArrayList<>();
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true) @Builder.Default
    private List<GrammarBookmark> grammarBookmarks = new ArrayList<>();
}
