package com.dailyeng.dto.speaking;

import java.util.List;

/**
 * All Speaking module DTOs as Java 21 records.
 * Compact and immutable request/response types.
 */
public final class SpeakingDtos {

    private SpeakingDtos() {}

    // ============================== Requests ==============================

    public record CreateCustomScenarioRequest(String topicPrompt) {}
    public record StartSessionRequest(String scenarioId) {}
    public record SubmitTurnRequest(
            String userText,
            String audioUrl,
            SpeechMetrics speechMetrics
    ) {}

    public record SpeechMetrics(
            List<Double> confidenceScores,
            int wordCount,
            long speakingDurationMs,
            int pauseCount,
            Double pitchVariance,
            Double avgPitch,
            Integer pitchSamplesCount,
            // Azure Pronunciation Assessment scores (override client heuristics when present)
            Double azureAccuracyScore,
            Double azureFluencyScore,
            Double azureProsodyScore,
            Double azureOverallScore
    ) {}

    // ============================== Responses ==============================

    public record TopicGroupResponse(String id, String name, List<String> subcategories) {}

    public record ScenarioListItem(
            String id, String title, String description,
            String category, String subcategory, String level,
            String image, int sessionsCompleted, int totalSessions,
            int progress, boolean isCustom
    ) {}

    public record ScenarioListResponse(
            List<ScenarioListItem> scenarios, long total,
            int totalPages, int currentPage
    ) {}

    public record ScenarioDetailResponse(
            String id, String title, String description,
            String context, String goal, List<String> objectives,
            String userRole, String botRole, String openingLine, String image
    ) {}

    public record SessionStartResponse(
            String sessionId, String scenarioId,
            String contextMessage, String greetingMessage, String greetingTurnId
    ) {}

    public record SubmitTurnResponse(String aiResponse, String userTurnId, String aiTurnId) {}

    public record CustomScenarioResponse(ScenarioDetailResponse scenario, String sessionId) {}

    public record SessionScores(
            int grammar, int relevance, int fluency,
            int pronunciation, int intonation, int overall
    ) {}

    public record ErrorCategory(String name, int count) {}

    public record ConversationTurn(
            String role, String text, String turnId,
            List<TurnErrorDto> userErrors,
            Integer pronunciationScore, Integer fluencyScore
    ) {}

    public record TurnErrorDto(
            String word, String correction, String type,
            Integer startIndex, Integer endIndex
    ) {}

    public record SessionAnalysisResponse(
            SessionScores scores, List<ErrorCategory> errorCategories,
            List<ConversationTurn> conversation,
            String feedbackTitle, String feedbackSummary,
            String feedbackRating, String feedbackTip
    ) {}

    public record SessionDetailResponse(
            SessionInfo session, SessionScores scores,
            List<ErrorCategory> errorCategories, List<ConversationTurn> conversation
    ) {}

    public record SessionInfo(
            String id, String createdAt, String endedAt, Integer duration,
            Integer overallScore, Integer grammarScore, Integer relevanceScore,
            Integer fluencyScore, Integer pronunciationScore, Integer intonationScore,
            String feedbackTitle, String feedbackSummary,
            String feedbackRating, String feedbackTip
    ) {}

    public record HistoryItem(
            String id, String title, String description, int score,
            String date, String level, String image, int progress, int wordCount
    ) {}

    public record HistoryGraphPoint(int session, int score) {}

    public record HistoryResponse(List<HistoryItem> historyTopics, List<HistoryGraphPoint> historyGraph) {}

    public record HistorySessionItem(
            String id, String scenarioId, String scenarioTitle,
            int overallScore, int grammarScore, int relevanceScore,
            int fluencyScore, int pronunciationScore, int intonationScore,
            String feedbackRating, String createdAt
    ) {}

    public record HistorySessionsResponse(
            List<HistorySessionItem> sessions, int totalPages, long totalCount
    ) {}

    public record HistoryStatsResponse(
            List<HistoryGraphPoint> performanceData,
            CriteriaAverages criteriaAverages,
            int totalSessions, int highestScore, int averageScore
    ) {}

    public record CriteriaAverages(int relevance, int pronunciation, int intonation, int fluency, int grammar) {}

    public record LearningRecordItem(
            String id, int overallScore, int grammarScore, int relevanceScore,
            int fluencyScore, int pronunciationScore, int intonationScore, String date
    ) {}
}
