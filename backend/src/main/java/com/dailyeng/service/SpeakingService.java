package com.dailyeng.service;

import com.dailyeng.dto.speaking.SpeakingDtos.*;
import com.dailyeng.entity.*;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.entity.enums.Role;
import com.dailyeng.exception.BadRequestException;
import com.dailyeng.exception.ResourceNotFoundException;
import com.dailyeng.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

/**
 * Speaking module service — scenario management and bookmarks.
 * <p>
 * Session lifecycle is handled by {@link SpeakingSessionService}.
 * History and statistics are handled by {@link SpeakingHistoryService}.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SpeakingService {


    private final TopicGroupRepository topicGroupRepo;
    private final SpeakingScenarioRepository scenarioRepo;
    private final SpeakingSessionRepository sessionRepo;
    private final SpeakingTurnRepository turnRepo;
    private final SpeakingBookmarkRepository bookmarkRepo;
    private final UserRepository userRepo;
    private final GeminiService geminiService;
    private final PexelsService pexelsService;

    // ========================================================================
    // 1. getSpeakingTopicGroups
    // ========================================================================

    @Cacheable("topicGroups")
    @Transactional(readOnly = true)
    public List<TopicGroupResponse> getTopicGroups() {
        var groups = topicGroupRepo.findByHubTypeOrderByOrderAsc("speaking");
        return groups.stream()
                .map(g -> new TopicGroupResponse(
                        g.getId(),
                        toTitleCase(g.getName()),
                        g.getSubcategories() != null
                                ? g.getSubcategories().stream().map(this::toTitleCase).toList()
                                : List.of()))
                .toList();
    }

    // ========================================================================
    // 2. getSpeakingScenariosWithProgress
    // ========================================================================

    @Transactional(readOnly = true)
    public ScenarioListResponse getScenariosWithProgress(
            String userId, String category, String subcategory,
            List<String> levels, int page, int limit
    ) {
        // Build dynamic spec
        Specification<SpeakingScenario> spec = Specification.where(
                (root, q, cb) -> cb.equal(root.get("isCustom"), false));
        spec = spec.and((root, q, cb) -> cb.isNotNull(root.get("topicGroupId")));

        if (category != null && !category.isBlank()) {
            spec = spec.and((root, q, cb) -> cb.equal(root.get("category"), category.toLowerCase()));
        }
        if (subcategory != null && !subcategory.isBlank() && !"All".equals(subcategory)) {
            spec = spec.and((root, q, cb) -> cb.equal(root.get("subcategory"), subcategory.toLowerCase()));
        }
        if (levels != null && !levels.isEmpty()) {
            var levelEnums = levels.stream()
                    .map(l -> Level.valueOf(l.toUpperCase()))
                    .toList();
            spec = spec.and((root, q, cb) -> root.get("difficulty").in(levelEnums));
        }

        var pageable = PageRequest.of(page - 1, limit,
                Sort.by("category", "subcategory", "difficulty"));
        var scenarioPage = scenarioRepo.findAll(spec, pageable);

        // Get user progress
        var scenarioIds = scenarioPage.getContent().stream().map(SpeakingScenario::getId).toList();
        Map<String, Long> progressMap = Map.of();
        if (userId != null && !scenarioIds.isEmpty()) {
            var sessions = sessionRepo.findByUserIdAndScenarioIdIn(userId, scenarioIds);
            progressMap = sessions.stream()
                    .collect(Collectors.groupingBy(SpeakingSession::getScenarioId, Collectors.counting()));
        }

        var finalProgressMap = progressMap;
        var items = scenarioPage.getContent().stream().map(s -> {
            int completed = finalProgressMap.getOrDefault(s.getId(), 0L).intValue();
            return new ScenarioListItem(
                    s.getId(), s.getTitle(), s.getDescription(),
                    s.getCategory() != null ? toTitleCase(s.getCategory()) : "General",
                    s.getSubcategory() != null ? toTitleCase(s.getSubcategory()) : null,
                    s.getDifficulty() != null ? s.getDifficulty().name() : "B1",
                    s.getImage() != null ? s.getImage() : "/learning.png",
                    completed, 10, Math.min(completed * 10, 100), s.isCustom());
        }).toList();

        return new ScenarioListResponse(items, scenarioPage.getTotalElements(),
                scenarioPage.getTotalPages(), page);
    }

    // ========================================================================
    // 3. searchSpeakingScenarios
    // ========================================================================

    @Transactional(readOnly = true)
    public List<ScenarioListItem> searchScenarios(String query) {
        if (query == null || query.isBlank()) return List.of();
        var scenarios = scenarioRepo.searchByTitleOrDescription(query, PageRequest.of(0, 50, Sort.by("title")));
        return scenarios.stream().map(s -> new ScenarioListItem(
                s.getId(), s.getTitle(), s.getDescription(),
                s.getCategory() != null ? toTitleCase(s.getCategory()) : "General",
                s.getSubcategory() != null ? toTitleCase(s.getSubcategory()) : null,
                s.getDifficulty() != null ? s.getDifficulty().name() : "B1",
                s.getImage() != null ? s.getImage() : "/learning.png",
                0, 10, 0, s.isCustom())).toList();
    }

    // ========================================================================
    // 4. getScenarioById
    // ========================================================================

    @Cacheable(value = "scenarios", key = "#id")
    @Transactional(readOnly = true)
    public ScenarioDetailResponse getScenarioById(String id) {
        var s = scenarioRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found: " + id));
        var objectives = s.getObjectives() instanceof List<?> list
                ? list.stream().map(Object::toString).toList()
                : List.<String>of();
        return new ScenarioDetailResponse(s.getId(), s.getTitle(), s.getDescription(),
                s.getContext(), s.getGoal(), objectives,
                s.getUserRole(), s.getBotRole(), s.getOpeningLine(),
                s.getImage() != null ? s.getImage() : "/learning.png");
    }

    // ========================================================================
    // 5. createCustomScenario
    // ========================================================================

    @Transactional
    public CustomScenarioResponse createCustomScenario(String userId, String topicPrompt) {
        var user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var userLevel = user.getLevel() != null ? user.getLevel().name() : "B1";

        var generated = geminiService.generateScenario(topicPrompt, userLevel);
        var imageUrl = pexelsService.fetchImage(generated.imageKeyword());

        var scenario = SpeakingScenario.builder()
                .title(generated.title()).description(generated.description())
                .goal(generated.goal()).context(generated.context())
                .difficulty(safeLevel(generated.level()))
                .image(imageUrl).userRole(generated.userRole())
                .botRole(generated.botRole()).openingLine(generated.openingLine())
                .objectives(generated.objectives())
                .isCustom(true).createdById(userId).category("Custom")
                .build();
        scenarioRepo.save(scenario);

        var session = SpeakingSession.builder()
                .userId(userId).scenarioId(scenario.getId())
                .variationSeed(ThreadLocalRandom.current().nextInt(1, 10000))
                .build();
        sessionRepo.save(session);

        if (generated.openingLine() != null) {
            turnRepo.save(SpeakingTurn.builder()
                    .sessionId(session.getId()).role(Role.tutor)
                    .text(generated.openingLine()).build());
        }

        var detail = new ScenarioDetailResponse(scenario.getId(), scenario.getTitle(),
                scenario.getDescription(), scenario.getContext(), scenario.getGoal(),
                generated.objectives(), scenario.getUserRole(), scenario.getBotRole(),
                scenario.getOpeningLine(), imageUrl);
        return new CustomScenarioResponse(detail, session.getId());
    }

    // ========================================================================
    // 6. createRandomScenario
    // ========================================================================

    @Transactional
    public CustomScenarioResponse createRandomScenario(String userId) {
        return createCustomScenario(userId, null);
    }

    // ========================================================================
    // 6b. createFreeTalkScenario — open-ended conversation
    // ========================================================================

    @Transactional
    public CustomScenarioResponse createFreeTalkScenario(String userId) {
        var user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var userLevel = user.getLevel() != null ? user.getLevel().name() : "B1";

        var openingLine = "Hi there! I'm your English conversation partner. " +
                "Today we can talk about absolutely anything you'd like — " +
                "your hobbies, a movie you watched, your day, travel dreams, or anything else. " +
                "So, what's on your mind?";

        var scenario = SpeakingScenario.builder()
                .title("Free Talk")
                .description("Practice speaking English freely about any topic you choose.")
                .goal("Have a natural English conversation about any topic.")
                .context("This is a free conversation session. The user can talk about anything they want. " +
                        "As a tutor, follow the user's lead, ask follow-up questions, and keep the conversation engaging.")
                .difficulty(safeLevel(userLevel))
                .image("/learning.png")
                .userRole("English Learner")
                .botRole("Friendly English Tutor")
                .openingLine(openingLine)
                .objectives(List.of(
                        "Practice natural conversation",
                        "Build confidence in speaking",
                        "Expand vocabulary on topics you enjoy"))
                .isCustom(false)   // Not a saved custom scenario — free mode only
                .build();
        scenarioRepo.save(scenario);

        var session = SpeakingSession.builder()
                .userId(userId).scenarioId(scenario.getId())
                .variationSeed(ThreadLocalRandom.current().nextInt(1, 10000))
                .build();
        sessionRepo.save(session);

        turnRepo.save(SpeakingTurn.builder()
                .sessionId(session.getId()).role(Role.tutor)
                .text(openingLine).build());

        var detail = new ScenarioDetailResponse(scenario.getId(), scenario.getTitle(),
                scenario.getDescription(), scenario.getContext(), scenario.getGoal(),
                List.of("Practice natural conversation", "Build confidence in speaking", "Expand vocabulary on topics you enjoy"),
                scenario.getUserRole(), scenario.getBotRole(),
                scenario.getOpeningLine(), scenario.getImage());
        return new CustomScenarioResponse(detail, session.getId());
    }

    // ========================================================================
    // 14. getCustomTopics
    // ========================================================================

    @Transactional(readOnly = true)
    public List<ScenarioListItem> getCustomTopics(String userId) {
        var scenarios = scenarioRepo.findByCreatedByIdAndIsCustomTrue(userId);
        return scenarios.stream().map(s -> new ScenarioListItem(
                s.getId(), s.getTitle(), s.getDescription(),
                s.getCategory() != null ? toTitleCase(s.getCategory()) : "Custom",
                s.getSubcategory() != null ? toTitleCase(s.getSubcategory()) : null,
                s.getDifficulty() != null ? s.getDifficulty().name() : "B1",
                s.getImage() != null ? s.getImage() : "/learning.png",
                0, 10, 0, true)).toList();
    }

    // ========================================================================
    // 14b. deleteCustomScenario
    // ========================================================================

    @Transactional
    public void deleteCustomScenario(String scenarioId, String userId) {
        var scenario = scenarioRepo.findById(scenarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found: " + scenarioId));
        if (!scenario.isCustom()) {
            throw new BadRequestException("Only custom scenarios can be deleted");
        }
        if (!userId.equals(scenario.getCreatedById())) {
            throw new com.dailyeng.exception.UnauthorizedException("You can only delete your own scenarios");
        }
        scenarioRepo.delete(scenario);
        log.info("🗑️ Deleted custom scenario {} by user {}", scenarioId, userId);
    }

    // ========================================================================
    // 15. getLearningRecordsForScenario
    // ========================================================================

    @Transactional(readOnly = true)
    public List<LearningRecordItem> getLearningRecords(String userId, String scenarioId) {
        var sessions = sessionRepo.findByUserIdAndScenarioIdAndEndedAtIsNotNullOrderByCreatedAtDesc(userId, scenarioId);
        return sessions.stream().map(s -> new LearningRecordItem(
                s.getId(),
                s.getOverallScore() != null ? s.getOverallScore() : 0,
                s.getGrammarScore() != null ? s.getGrammarScore() : 0,
                s.getTopicScore() != null ? s.getTopicScore() : 0,
                s.getFluencyScore() != null ? s.getFluencyScore() : 0,
                s.getAccuracyScore() != null ? s.getAccuracyScore() : 0,
                s.getProsodyScore() != null ? s.getProsodyScore() : 0,
                s.getVocabularyScore() != null ? s.getVocabularyScore() : 0,
                s.getCreatedAt() != null ? s.getCreatedAt().toLocalDate().toString() : null
        )).toList();
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    private String toTitleCase(String str) {
        if (str == null || str.isBlank()) return str;
        return Arrays.stream(str.split(" "))
                .map(w -> w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1))
                .collect(Collectors.joining(" "));
    }

    private Level safeLevel(String level) {
        try { return level != null ? Level.valueOf(level) : Level.B1; }
        catch (IllegalArgumentException e) { return Level.B1; }
    }



    // ========================================================================
    // 16. Bookmarks
    // ========================================================================

    @Transactional
    public ToggleBookmarkResponse toggleBookmark(String userId, String scenarioId) {
        var existing = bookmarkRepo.findByUserIdAndScenarioId(userId, scenarioId);
        if (existing.isPresent()) {
            bookmarkRepo.delete(existing.get());
            return new ToggleBookmarkResponse(false);
        } else {
            bookmarkRepo.save(SpeakingBookmark.builder()
                    .userId(userId).scenarioId(scenarioId).build());
            return new ToggleBookmarkResponse(true);
        }
    }

    @Transactional(readOnly = true)
    public BookmarkListResponse getBookmarks(String userId, int page, int limit) {
        var pageable = PageRequest.of(page - 1, limit);
        var bookmarkPage = bookmarkRepo.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        // Batch-load all scenarios to avoid N+1
        var scenarioIds = bookmarkPage.getContent().stream()
                .map(SpeakingBookmark::getScenarioId).distinct().toList();
        var scenarioMap = scenarioRepo.findAllById(scenarioIds).stream()
                .collect(Collectors.toMap(SpeakingScenario::getId, s -> s));

        var bookmarks = bookmarkPage.getContent().stream().map(b -> {
            var s = scenarioMap.get(b.getScenarioId());
            if (s == null) return null;
            return new ScenarioListItem(
                    s.getId(), s.getTitle(), s.getDescription(),
                    s.getCategory() != null ? toTitleCase(s.getCategory()) : "General",
                    s.getSubcategory() != null ? toTitleCase(s.getSubcategory()) : null,
                    s.getDifficulty() != null ? s.getDifficulty().name() : "B1",
                    s.getImage() != null ? s.getImage() : "/learning.png",
                    0, 10, 0, s.isCustom());
        }).filter(Objects::nonNull).toList();

        var bookmarkIds = bookmarkPage.getContent().stream()
                .map(SpeakingBookmark::getScenarioId).toList();

        return new BookmarkListResponse(bookmarks, bookmarkIds,
                bookmarkPage.getTotalElements(), bookmarkPage.getTotalPages(), page);
    }

    @Transactional(readOnly = true)
    public List<String> getBookmarkIds(String userId) {
        return bookmarkRepo.findByUserId(userId).stream()
                .map(SpeakingBookmark::getScenarioId).toList();
    }
}
