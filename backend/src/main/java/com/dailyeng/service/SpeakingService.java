package com.dailyeng.service;

import com.dailyeng.dto.speaking.SpeakingDtos.*;
import com.dailyeng.entity.*;
import com.dailyeng.entity.enums.HubType;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.entity.enums.Role;
import com.dailyeng.exception.BadRequestException;
import com.dailyeng.exception.ResourceNotFoundException;
import com.dailyeng.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Speaking module service — ports all 15 functions from speaking.ts.
 * Handles: topic groups, scenarios, sessions, turns, analysis, history, learning records.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SpeakingService {

    private final TopicGroupRepository topicGroupRepo;
    private final SpeakingScenarioRepository scenarioRepo;
    private final SpeakingSessionRepository sessionRepo;
    private final SpeakingTurnRepository turnRepo;
    private final SpeakingTurnErrorRepository turnErrorRepo;
    private final UserRepository userRepo;
    private final GeminiService geminiService;
    private final PexelsService pexelsService;
    private final SpeechMetricsCalculator metricsCalculator;

    // ========================================================================
    // 1. getSpeakingTopicGroups
    // ========================================================================

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
            spec = spec.and((root, q, cb) -> root.get("difficulty").as(String.class).in(levels));
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

    @Transactional(readOnly = true)
    public ScenarioDetailResponse getScenarioById(String id) {
        var s = scenarioRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found: " + id));
        @SuppressWarnings("unchecked")
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
                .isCustom(true)
                .createdById(userId)
                .category("Custom")
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
    // 7. startSessionWithGreeting
    // ========================================================================

    @Transactional
    public SessionStartResponse startSession(String userId, String scenarioId) {
        var scenario = scenarioRepo.findById(scenarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found: " + scenarioId));

        var session = SpeakingSession.builder()
                .userId(userId).scenarioId(scenarioId)
                .variationSeed(ThreadLocalRandom.current().nextInt(1, 10000))
                .build();
        sessionRepo.save(session);
        log.info("🎲 Session started with variationSeed={}", session.getVariationSeed());

        String greetingTurnId = null;
        if (scenario.getOpeningLine() != null && !scenario.getOpeningLine().isBlank()) {
            var turn = SpeakingTurn.builder()
                    .sessionId(session.getId()).role(Role.tutor)
                    .text(scenario.getOpeningLine()).build();
            turnRepo.save(turn);
            greetingTurnId = turn.getId();
        }

        return new SessionStartResponse(session.getId(), scenarioId,
                scenario.getContext(), scenario.getOpeningLine(), greetingTurnId);
    }

    // ========================================================================
    // 8. submitTurn
    // ========================================================================

    @Transactional
    public SubmitTurnResponse submitTurn(String sessionId, SubmitTurnRequest req) {
        var session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found: " + sessionId));
        var scenario = scenarioRepo.findById(session.getScenarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found"));
        var turns = turnRepo.findBySessionIdOrderByTimestampAsc(sessionId);

        // Build history for AI
        var history = turns.stream()
                .map(t -> Map.of("role", t.getRole() == Role.user ? "user" : "assistant", "text", t.getText()))
                .collect(Collectors.toList());

        // Call AI
        var config = new GeminiService.ScenarioConfig(
                scenario.getContext(), scenario.getUserRole(), scenario.getBotRole(),
                scenario.getGoal(), scenario.getDifficulty() != null ? scenario.getDifficulty().name() : null,
                session.getVariationSeed());
        var aiResult = geminiService.generateSpeakingResponse(config, history, req.userText());

        // Calculate speech metrics — prefer Azure SDK scores when available
        Integer pronunciationScore = null;
        Integer fluencyScore = null;
        var metrics = req.speechMetrics();
        if (metrics != null && metrics.wordCount() > 0) {
            if (metrics.azureAccuracyScore() != null && metrics.azureAccuracyScore() > 0) {
                // Use Azure Pronunciation Assessment scores (real, not heuristic)
                pronunciationScore = (int) Math.round(metrics.azureAccuracyScore());
                fluencyScore = (int) Math.round(metrics.azureFluencyScore() != null
                        ? metrics.azureFluencyScore() : 0);
                log.info("📊 Using Azure pronunciation scores: accuracy={}, fluency={}, prosody={}, overall={}",
                        metrics.azureAccuracyScore(), metrics.azureFluencyScore(),
                        metrics.azureProsodyScore(), metrics.azureOverallScore());
            } else {
                // Fallback to client-side heuristics
                fluencyScore = metricsCalculator.calculateFluencyScore(
                        metrics.wordCount(), metrics.speakingDurationMs(), metrics.pauseCount());
                pronunciationScore = metricsCalculator.calculatePronunciationScore(
                        metrics.confidenceScores(), fluencyScore,
                        metrics.wordCount(), metrics.speakingDurationMs());
                log.info("📊 Using heuristic scores: pronunciation={}, fluency={}", pronunciationScore, fluencyScore);
            }
        }

        // Save user turn — store Azure prosody as pitchVariance for session-end intonation
        Double storedPitchVariance = metrics != null ? metrics.pitchVariance() : null;
        if (metrics != null && metrics.azureProsodyScore() != null && metrics.azureProsodyScore() > 0) {
            storedPitchVariance = metrics.azureProsodyScore(); // 0-100 scale (vs raw Hz variance)
        }

        var userTurn = SpeakingTurn.builder()
                .sessionId(sessionId).role(Role.user).text(req.userText())
                .audioUrl(req.audioUrl())
                .pronunciationScore(pronunciationScore).fluencyScore(fluencyScore)
                .confidenceScores(metrics != null ? metrics.confidenceScores() : List.of())
                .wordCount(metrics != null ? metrics.wordCount() : null)
                .speakingDurationMs(metrics != null ? (int) metrics.speakingDurationMs() : null)
                .pauseCount(metrics != null ? metrics.pauseCount() : null)
                .pitchVariance(storedPitchVariance)
                .avgPitch(metrics != null ? metrics.avgPitch() : null)
                .pitchSamplesCount(metrics != null ? metrics.pitchSamplesCount() : null)
                .wordAssessmentsJson(metrics != null ? metrics.wordAssessments() : null)
                .build();
        turnRepo.save(userTurn);

        // Save AI turn
        var aiTurn = SpeakingTurn.builder()
                .sessionId(sessionId).role(Role.tutor).text(aiResult.response()).build();
        turnRepo.save(aiTurn);

        return new SubmitTurnResponse(aiResult.response(), userTurn.getId(), aiTurn.getId());
    }

    // ========================================================================
    // 8b. generateHint — Suggest what user could say
    // ========================================================================

    @Transactional(readOnly = true)
    public String generateHint(String sessionId) {
        var session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found: " + sessionId));
        var scenario = scenarioRepo.findById(session.getScenarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found"));
        var turns = turnRepo.findBySessionIdOrderByTimestampAsc(sessionId);

        var history = turns.stream()
                .map(t -> Map.of("role", t.getRole() == Role.user ? "user" : "assistant", "text", t.getText()))
                .collect(Collectors.toList());

        var config = new GeminiService.ScenarioConfig(
                scenario.getContext(), scenario.getUserRole(), scenario.getBotRole(),
                scenario.getGoal(), scenario.getDifficulty() != null ? scenario.getDifficulty().name() : null,
                session.getVariationSeed());

        return geminiService.generateSpeakingHint(config, history).hint();
    }

    // ========================================================================
    // 9. analyzeAndScoreSession (endSession)
    // ========================================================================

    @Transactional
    public SessionAnalysisResponse analyzeAndScoreSession(String sessionId) {
        var session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found: " + sessionId));
        var scenario = scenarioRepo.findById(session.getScenarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found"));
        var turns = turnRepo.findBySessionIdOrderByTimestampAsc(sessionId);
        var userTurns = turns.stream().filter(t -> t.getRole() == Role.user).toList();

        // Call AI for analysis
        var turnsForAnalysis = turns.stream()
                .map(t -> Map.of("role", t.getRole() == Role.user ? "user" : "tutor",
                        "text", t.getText(), "id", t.getId()))
                .collect(Collectors.toList());
        var analysis = geminiService.analyzeSessionConversation(scenario.getContext(), turnsForAnalysis);

        // Save errors per turn
        for (var ta : analysis.turnAnalyses()) {
            if (ta.turnIndex() >= 0 && ta.turnIndex() < userTurns.size()) {
                var userTurn = userTurns.get(ta.turnIndex());
                turnErrorRepo.deleteByTurnId(userTurn.getId());
                for (var err : ta.errors()) {
                    turnErrorRepo.save(SpeakingTurnError.builder()
                            .turnId(userTurn.getId()).word(err.word())
                            .correction(err.correction()).errorType(err.errorType())
                            .startIndex(err.startIndex()).endIndex(err.endIndex()).build());
                }
            }
        }

        // Calculate session-level scores from turn averages
        var turnsWithScores = turns.stream()
                .filter(t -> t.getRole() == Role.user && t.getWordCount() != null
                        && t.getWordCount() > 0 && t.getPronunciationScore() != null)
                .toList();

        int pronScore = turnsWithScores.isEmpty() ? 70
                : (int) Math.round(turnsWithScores.stream().mapToInt(SpeakingTurn::getPronunciationScore).average().orElse(70));
        int fluScore = turnsWithScores.isEmpty() ? 70
                : (int) Math.round(turnsWithScores.stream().mapToInt(t -> t.getFluencyScore() != null ? t.getFluencyScore() : 0).average().orElse(70));

        // Intonation: prefer Azure prosody scores, fall back to pitch variance heuristic
        int intoScore;
        // Check if turns have Azure-derived pronunciation scores (> 0 and reasonable)
        boolean hasAzureScores = turnsWithScores.stream()
                .anyMatch(t -> t.getPronunciationScore() != null && t.getPronunciationScore() > 0
                        && t.getFluencyScore() != null && t.getFluencyScore() > 0);

        if (hasAzureScores) {
            // Average the pronunciation and fluency scores as a proxy for intonation/prosody
            // since Azure prosody data might be stored as pitchVariance
            var pitchTurns = turns.stream()
                    .filter(t -> t.getRole() == Role.user && t.getPitchVariance() != null && t.getPitchVariance() > 0)
                    .toList();

            if (!pitchTurns.isEmpty() && pitchTurns.get(0).getPitchVariance() > 10) {
                // pitchVariance > 10 likely means it's Azure prosody score (0-100), not raw Hz variance
                double avgProsody = pitchTurns.stream().mapToDouble(SpeakingTurn::getPitchVariance).average().orElse(70);
                intoScore = (int) Math.round(Math.min(100, avgProsody));
                log.info("📊 Session intonation from Azure prosody: {}", intoScore);
            } else {
                // Use average of pronunciation and fluency as intonation estimate
                intoScore = (int) Math.round((pronScore + fluScore) / 2.0);
                log.info("📊 Session intonation from Azure avg: {}", intoScore);
            }
        } else {
            // Fallback: heuristic from pitch variance
            var pitchTurns = turns.stream()
                    .filter(t -> t.getRole() == Role.user && t.getPitchVariance() != null && t.getPitchVariance() > 0)
                    .toList();
            double avgPitchVar = pitchTurns.isEmpty() ? 0
                    : pitchTurns.stream().mapToDouble(SpeakingTurn::getPitchVariance).average().orElse(0);
            intoScore = metricsCalculator.calculateIntonationScore(pitchTurns.isEmpty() ? null : avgPitchVar);
        }

        int overallScore = metricsCalculator.calculateOverallScore(
                analysis.grammarScore(), analysis.relevanceScore(), fluScore, pronScore, intoScore);

        // Update session
        session.setEndedAt(LocalDateTime.now());
        session.setDuration(session.getCreatedAt() != null
                ? (int) ChronoUnit.SECONDS.between(session.getCreatedAt(), LocalDateTime.now()) : 0);
        session.setOverallScore(overallScore);
        session.setGrammarScore(analysis.grammarScore());
        session.setRelevanceScore(analysis.relevanceScore());
        session.setFluencyScore(fluScore);
        session.setPronunciationScore(pronScore);
        session.setIntonationScore(intoScore);
        session.setFeedbackTitle(analysis.feedbackTitle());
        session.setFeedbackSummary(analysis.feedbackSummary());
        session.setFeedbackRating(analysis.feedbackRating());
        session.setFeedbackTip(analysis.feedbackTip());
        sessionRepo.save(session);

        // Build error categories
        Map<String, Integer> errorMap = new LinkedHashMap<>();
        for (var ta : analysis.turnAnalyses()) {
            for (var e : ta.errors()) {
                errorMap.merge(e.errorType(), 1, Integer::sum);
            }
        }
        var errorCategories = errorMap.entrySet().stream()
                .map(e -> new ErrorCategory(e.getKey(), e.getValue())).toList();

        // Build conversation
        var conversation = turns.stream().map(t -> {
            var turnErrors = analysis.turnAnalyses().stream()
                    .filter(ta -> ta.turnIndex() >= 0 && ta.turnIndex() < userTurns.size()
                            && userTurns.get(ta.turnIndex()).getId().equals(t.getId()))
                    .flatMap(ta -> ta.errors().stream())
                    .map(e -> new TurnErrorDto(e.word(), e.correction(), e.errorType(), e.startIndex(), e.endIndex()))
                    .toList();
            return new ConversationTurn(t.getRole().name(), t.getText(), t.getId(),
                    turnErrors.isEmpty() ? null : turnErrors,
                    t.getRole() == Role.user ? t.getPronunciationScore() : null,
                    t.getRole() == Role.user ? t.getFluencyScore() : null,
                    t.getRole() == Role.user ? parseWordAssessments(t.getWordAssessmentsJson()) : null);
        }).toList();

        var scores = new SessionScores(analysis.grammarScore(), analysis.relevanceScore(),
                fluScore, pronScore, intoScore, overallScore);

        return new SessionAnalysisResponse(scores, errorCategories, conversation,
                analysis.feedbackTitle(), analysis.feedbackSummary(),
                analysis.feedbackRating(), analysis.feedbackTip());
    }

    // ========================================================================
    // 10. getSessionDetailsById
    // ========================================================================

    @Transactional(readOnly = true)
    public SessionDetailResponse getSessionDetails(String sessionId) {
        var session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found: " + sessionId));
        var turns = turnRepo.findBySessionIdOrderByTimestampAsc(sessionId);

        // Build error categories
        Map<String, Integer> errorMap = new LinkedHashMap<>();
        var conversation = turns.stream().map(t -> {
            List<TurnErrorDto> errors = List.of();
            if (t.getRole() == Role.user && t.getErrors() != null && !t.getErrors().isEmpty()) {
                errors = t.getErrors().stream()
                        .map(e -> {
                            errorMap.merge(e.getErrorType(), 1, Integer::sum);
                            return new TurnErrorDto(e.getWord(), e.getCorrection(), e.getErrorType(), null, null);
                        }).toList();
            }
            return new ConversationTurn(t.getRole().name(), t.getText(), t.getId(),
                    errors.isEmpty() ? null : errors,
                    t.getRole() == Role.user ? t.getPronunciationScore() : null,
                    t.getRole() == Role.user ? t.getFluencyScore() : null,
                    t.getRole() == Role.user ? parseWordAssessments(t.getWordAssessmentsJson()) : null);
        }).toList();

        var errorCategories = errorMap.entrySet().stream()
                .map(e -> new ErrorCategory(e.getKey(), e.getValue())).toList();

        var info = new SessionInfo(
                session.getId(),
                session.getCreatedAt() != null ? session.getCreatedAt().toString() : null,
                session.getEndedAt() != null ? session.getEndedAt().toString() : null,
                session.getDuration(), session.getOverallScore(),
                session.getGrammarScore(), session.getRelevanceScore(),
                session.getFluencyScore(), session.getPronunciationScore(),
                session.getIntonationScore(), session.getFeedbackTitle(),
                session.getFeedbackSummary(), session.getFeedbackRating(), session.getFeedbackTip());

        var scores = new SessionScores(
                session.getGrammarScore() != null ? session.getGrammarScore() : 0,
                session.getRelevanceScore() != null ? session.getRelevanceScore() : 0,
                session.getFluencyScore() != null ? session.getFluencyScore() : 0,
                session.getPronunciationScore() != null ? session.getPronunciationScore() : 0,
                session.getIntonationScore() != null ? session.getIntonationScore() : 0,
                session.getOverallScore() != null ? session.getOverallScore() : 0);

        return new SessionDetailResponse(info, scores, errorCategories, conversation);
    }

    // ========================================================================
    // 11. getUserSpeakingHistory
    // ========================================================================

    @Transactional(readOnly = true)
    public HistoryResponse getUserHistory(String userId) {
        var sessions = sessionRepo.findByUserIdAndEndedAtIsNotNullOrderByEndedAtDesc(userId);
        var limitedSessions = sessions.stream().limit(20).toList();

        var historyTopics = limitedSessions.stream().map(s -> {
            var scenario = scenarioRepo.findById(s.getScenarioId()).orElse(null);
            return new HistoryItem(
                    s.getId(),
                    scenario != null ? scenario.getTitle() : "Unknown",
                    scenario != null ? scenario.getDescription() : "",
                    s.getOverallScore() != null ? s.getOverallScore() : 0,
                    s.getEndedAt() != null ? s.getEndedAt().toLocalDate().toString()
                            : s.getCreatedAt().toLocalDate().toString(),
                    scenario != null && scenario.getDifficulty() != null ? scenario.getDifficulty().name() : "B1",
                    scenario != null && scenario.getImage() != null ? scenario.getImage() : "/learning.png",
                    100, 0);
        }).toList();

        var historyGraph = limitedSessions.stream().limit(10).toList();
        Collections.reverse(new ArrayList<>(historyGraph));
        var graphPoints = IntStream.range(0, Math.min(10, historyGraph.size()))
                .mapToObj(i -> new HistoryGraphPoint(i + 1,
                        historyGraph.get(i).getOverallScore() != null ? historyGraph.get(i).getOverallScore() : 0))
                .toList();

        return new HistoryResponse(historyTopics, graphPoints);
    }

    // ========================================================================
    // 12. getSpeakingHistorySessions
    // ========================================================================

    @Transactional(readOnly = true)
    public HistorySessionsResponse getHistorySessions(String userId, int page, int limit, String rating) {
        var pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        var sessionPage = (rating != null && !rating.isBlank())
                ? sessionRepo.findByUserIdAndEndedAtIsNotNullAndFeedbackRating(userId, rating, pageable)
                : sessionRepo.findByUserIdAndEndedAtIsNotNull(userId, pageable);

        var items = sessionPage.getContent().stream().map(s -> {
            var scenario = scenarioRepo.findById(s.getScenarioId()).orElse(null);
            return new HistorySessionItem(
                    s.getId(), s.getScenarioId(),
                    scenario != null ? scenario.getTitle() : "Unknown",
                    s.getOverallScore() != null ? s.getOverallScore() : 0,
                    s.getGrammarScore() != null ? s.getGrammarScore() : 0,
                    s.getRelevanceScore() != null ? s.getRelevanceScore() : 0,
                    s.getFluencyScore() != null ? s.getFluencyScore() : 0,
                    s.getPronunciationScore() != null ? s.getPronunciationScore() : 0,
                    s.getIntonationScore() != null ? s.getIntonationScore() : 0,
                    s.getFeedbackRating() != null ? s.getFeedbackRating() : "N/A",
                    s.getCreatedAt() != null ? s.getCreatedAt().toString() : null);
        }).toList();

        return new HistorySessionsResponse(items, sessionPage.getTotalPages(), sessionPage.getTotalElements());
    }

    // ========================================================================
    // 13. getSpeakingHistoryStats
    // ========================================================================

    @Transactional(readOnly = true)
    public HistoryStatsResponse getHistoryStats(String userId) {
        var sessions = sessionRepo.findByUserIdAndEndedAtIsNotNullOrderByEndedAtDesc(userId);
        var recent20 = sessions.stream().limit(20).toList();

        if (recent20.isEmpty()) {
            return new HistoryStatsResponse(List.of(),
                    new CriteriaAverages(0, 0, 0, 0, 0), 0, 0, 0);
        }

        var reversed = new ArrayList<>(recent20);
        Collections.reverse(reversed);
        var performanceData = IntStream.range(0, reversed.size())
                .mapToObj(i -> new HistoryGraphPoint(i + 1,
                        reversed.get(i).getOverallScore() != null ? reversed.get(i).getOverallScore() : 0))
                .toList();

        int total = recent20.size();
        var scores = recent20.stream().mapToInt(s -> s.getOverallScore() != null ? s.getOverallScore() : 0);
        int highest = recent20.stream().mapToInt(s -> s.getOverallScore() != null ? s.getOverallScore() : 0).max().orElse(0);
        int avg = (int) Math.round(recent20.stream().mapToInt(s -> s.getOverallScore() != null ? s.getOverallScore() : 0).average().orElse(0));

        var criteria = new CriteriaAverages(
                avg(recent20, SpeakingSession::getRelevanceScore),
                avg(recent20, SpeakingSession::getPronunciationScore),
                avg(recent20, SpeakingSession::getIntonationScore),
                avg(recent20, SpeakingSession::getFluencyScore),
                avg(recent20, SpeakingSession::getGrammarScore));

        return new HistoryStatsResponse(performanceData, criteria, total, highest, avg);
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
    // 15. getLearningRecordsForScenario
    // ========================================================================

    @Transactional(readOnly = true)
    public List<LearningRecordItem> getLearningRecords(String userId, String scenarioId) {
        var sessions = sessionRepo.findByUserIdAndScenarioIdAndEndedAtIsNotNullOrderByCreatedAtDesc(userId, scenarioId);
        return sessions.stream().map(s -> new LearningRecordItem(
                s.getId(),
                s.getOverallScore() != null ? s.getOverallScore() : 0,
                s.getGrammarScore() != null ? s.getGrammarScore() : 0,
                s.getRelevanceScore() != null ? s.getRelevanceScore() : 0,
                s.getFluencyScore() != null ? s.getFluencyScore() : 0,
                s.getPronunciationScore() != null ? s.getPronunciationScore() : 0,
                s.getIntonationScore() != null ? s.getIntonationScore() : 0,
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

    private int avg(List<SpeakingSession> sessions, java.util.function.Function<SpeakingSession, Integer> getter) {
        return (int) Math.round(sessions.stream()
                .mapToInt(s -> { var v = getter.apply(s); return v != null ? v : 0; })
                .average().orElse(0));
    }

    /**
     * Parse stored JSONB word assessments back into DTOs for API response.
     */
    @SuppressWarnings("unchecked")
    private List<WordAssessmentDto> parseWordAssessments(Object jsonData) {
        if (jsonData == null) return null;
        try {
            if (jsonData instanceof List<?> list) {
                return list.stream()
                        .filter(item -> item instanceof Map)
                        .map(item -> {
                            var map = (Map<String, Object>) item;
                            var phonemes = map.get("phonemes") instanceof List<?> pList
                                    ? pList.stream().filter(p -> p instanceof Map).map(p -> {
                                        var pm = (Map<String, Object>) p;
                                        return new PhonemeDto(
                                                (String) pm.get("phoneme"),
                                                ((Number) pm.getOrDefault("accuracyScore", 0)).doubleValue());
                                    }).toList()
                                    : List.<PhonemeDto>of();
                            var syllables = map.get("syllables") instanceof List<?> sList
                                    ? sList.stream().filter(s -> s instanceof Map).map(s -> {
                                        var sm = (Map<String, Object>) s;
                                        return new SyllableDto(
                                                (String) sm.get("syllable"),
                                                ((Number) sm.getOrDefault("accuracyScore", 0)).doubleValue());
                                    }).toList()
                                    : List.<SyllableDto>of();
                            return new WordAssessmentDto(
                                    (String) map.get("word"),
                                    ((Number) map.getOrDefault("accuracyScore", 0)).doubleValue(),
                                    (String) map.getOrDefault("errorType", "None"),
                                    phonemes, syllables);
                        }).toList();
            }
            return null;
        } catch (Exception e) {
            log.warn("Failed to parse word assessments: {}", e.getMessage());
            return null;
        }
    }
}
