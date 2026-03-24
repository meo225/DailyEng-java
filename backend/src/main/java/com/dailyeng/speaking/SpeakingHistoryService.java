package com.dailyeng.speaking;

import com.dailyeng.speaking.SpeakingDtos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Speaking history and statistics service — handles user history,
 * session history, stats, and learning records.
 * <p>
 * Extracted from SpeakingService to follow Single Responsibility Principle.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SpeakingHistoryService {

    private final SpeakingScenarioRepository scenarioRepo;
    private final SpeakingSessionRepository sessionRepo;

    // ========================================================================
    // getUserHistory
    // ========================================================================

    @Transactional(readOnly = true)
    public HistoryResponse getUserHistory(String userId, String language) {
        var sessions = sessionRepo.findCompletedByUserAndLanguage(userId, language);
        var limitedSessions = sessions.stream().limit(20).toList();

        // Batch-load all scenarios to avoid N+1
        var scenarioIds = limitedSessions.stream().map(SpeakingSession::getScenarioId).distinct().toList();
        var scenarioMap = scenarioRepo.findAllById(scenarioIds).stream()
                .collect(Collectors.toMap(SpeakingScenario::getId, s -> s));

        var historyTopics = limitedSessions.stream().map(s -> {
            var scenario = scenarioMap.get(s.getScenarioId());
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

        var historyGraph = limitedSessions.stream().limit(10).collect(Collectors.toCollection(ArrayList::new));
        Collections.reverse(historyGraph);
        var graphPoints = IntStream.range(0, Math.min(10, historyGraph.size()))
                .mapToObj(i -> new HistoryGraphPoint(i + 1,
                        historyGraph.get(i).getOverallScore() != null ? historyGraph.get(i).getOverallScore() : 0))
                .toList();

        return new HistoryResponse(historyTopics, graphPoints);
    }

    // ========================================================================
    // getHistorySessions
    // ========================================================================

    @Transactional(readOnly = true)
    public HistorySessionsResponse getHistorySessions(String userId, String language, int page, int limit, String rating) {
        var pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        var sessionPage = (rating != null && !rating.isBlank())
                ? sessionRepo.findCompletedByUserAndLanguageAndRating(userId, language, rating, pageable)
                : sessionRepo.findCompletedByUserAndLanguagePaged(userId, language, pageable);

        // Batch-load all scenarios to avoid N+1
        var scenarioIds = sessionPage.getContent().stream().map(SpeakingSession::getScenarioId).distinct().toList();
        var scenarioMap = scenarioRepo.findAllById(scenarioIds).stream()
                .collect(Collectors.toMap(SpeakingScenario::getId, s -> s));

        var items = sessionPage.getContent().stream().map(s -> {
            var scenario = scenarioMap.get(s.getScenarioId());
            return new HistorySessionItem(
                    s.getId(), s.getScenarioId(),
                    scenario != null ? scenario.getTitle() : "Unknown",
                    s.getOverallScore() != null ? s.getOverallScore() : 0,
                    s.getGrammarScore() != null ? s.getGrammarScore() : 0,
                    s.getTopicScore() != null ? s.getTopicScore() : 0,
                    s.getFluencyScore() != null ? s.getFluencyScore() : 0,
                    s.getAccuracyScore() != null ? s.getAccuracyScore() : 0,
                    s.getProsodyScore() != null ? s.getProsodyScore() : 0,
                    s.getVocabularyScore() != null ? s.getVocabularyScore() : 0,
                    s.getFeedbackRating() != null ? s.getFeedbackRating() : "N/A",
                    s.getCreatedAt() != null ? s.getCreatedAt().toString() : null);
        }).toList();

        return new HistorySessionsResponse(items, sessionPage.getTotalPages(), sessionPage.getTotalElements());
    }

    // ========================================================================
    // getHistoryStats
    // ========================================================================

    @Transactional(readOnly = true)
    public HistoryStatsResponse getHistoryStats(String userId, String language) {
        var sessions = sessionRepo.findCompletedByUserAndLanguage(userId, language);
        var recent20 = sessions.stream().limit(20).toList();

        if (recent20.isEmpty()) {
            return new HistoryStatsResponse(List.of(),
                    new CriteriaAverages(0, 0, 0, 0, 0, 0), 0, 0, 0);
        }

        var reversed = new ArrayList<>(recent20);
        Collections.reverse(reversed);
        var performanceData = IntStream.range(0, reversed.size())
                .mapToObj(i -> new HistoryGraphPoint(i + 1,
                        reversed.get(i).getOverallScore() != null ? reversed.get(i).getOverallScore() : 0))
                .toList();

        int total = recent20.size();
        int highest = recent20.stream().mapToInt(s -> s.getOverallScore() != null ? s.getOverallScore() : 0).max().orElse(0);
        int avg = (int) Math.round(recent20.stream().mapToInt(s -> s.getOverallScore() != null ? s.getOverallScore() : 0).average().orElse(0));

        var criteria = new CriteriaAverages(
                avg(recent20, SpeakingSession::getTopicScore),
                avg(recent20, SpeakingSession::getAccuracyScore),
                avg(recent20, SpeakingSession::getProsodyScore),
                avg(recent20, SpeakingSession::getFluencyScore),
                avg(recent20, SpeakingSession::getGrammarScore),
                avg(recent20, SpeakingSession::getVocabularyScore));

        return new HistoryStatsResponse(performanceData, criteria, total, highest, avg);
    }

    // ========================================================================
    // getLearningRecords
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

    private int avg(List<SpeakingSession> sessions, java.util.function.Function<SpeakingSession, Integer> getter) {
        return (int) Math.round(sessions.stream()
                .mapToInt(s -> { var v = getter.apply(s); return v != null ? v : 0; })
                .average().orElse(0));
    }
}
