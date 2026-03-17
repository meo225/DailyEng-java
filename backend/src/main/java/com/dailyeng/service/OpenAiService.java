package com.dailyeng.service;

import com.dailyeng.config.AppProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.chat.completions.*;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * OpenAI GPT integration service.
 * Ports 4 AI methods from src/lib/gemini.ts to OpenAI Java SDK.
 *
 * <p>Methods:
 * <ul>
 *   <li>{@link #generateSpeakingResponse} — in-conversation AI reply</li>
 *   <li>{@link #analyzeSessionConversation} — post-session error analysis + scoring</li>
 *   <li>{@link #generateScenario} — create custom/random scenarios</li>
 *   <li>{@link #generateDoraraResponse} — AI chatbot for DailyEng</li>
 * </ul>
 */
@Slf4j
@Service
public class OpenAiService {

    private final AppProperties appProperties;
    private final ObjectMapper objectMapper;
    private OpenAIClient client;

    public OpenAiService(AppProperties appProperties, ObjectMapper objectMapper) {
        this.appProperties = appProperties;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    void init() {
        var apiKey = appProperties.getOpenai().getApiKey();
        if (apiKey != null && !apiKey.isBlank()) {
            this.client = OpenAIOkHttpClient.builder()
                    .apiKey(apiKey)
                    .build();
            log.info("OpenAI client initialized with model: {}", appProperties.getOpenai().getModel());
        } else {
            log.warn("OPENAI_API_KEY not set — AI features will return fallback responses");
        }
    }

    // ========================================================================
    // CEFR Level Guidance
    // ========================================================================

    private String getLevelGuidance(String level) {
        if (level == null) return "moderate vocabulary and sentence complexity";
        return switch (level.toUpperCase()) {
            case "A1" -> "very simple words, short sentences, present tense only, basic vocabulary";
            case "A2" -> "simple vocabulary, short sentences, common phrases, past and future tenses";
            case "B1" -> "everyday vocabulary, moderate sentence length, common idioms, varied tenses";
            case "B2" -> "diverse vocabulary, complex sentences, idioms and expressions, all tenses";
            case "C1" -> "sophisticated vocabulary, nuanced expressions, complex grammar structures";
            case "C2" -> "native-level vocabulary, idiomatic expressions, any grammatical structure";
            default -> "moderate vocabulary and sentence complexity";
        };
    }

    // ========================================================================
    // 1. generateSpeakingResponse — In-conversation AI reply
    // ========================================================================

    public record SpeakingResponseResult(String response) {}

    public record SpeakingHintResult(String hint) {}

    public record ScenarioConfig(String context, String userRole, String botRole, String goal, String level) {}

    /**
     * Generate AI speaking response during conversation.
     * Ports: generateSpeakingResponse() from gemini.ts
     */
    public SpeakingResponseResult generateSpeakingResponse(
            ScenarioConfig scenario,
            List<Map<String, String>> history,
            String userMessage
    ) {
        if (client == null) {
            return new SpeakingResponseResult("I'm sorry, I didn't catch that. Could you repeat?");
        }

        var botRoleDesc = scenario.botRole() != null
                ? "You are playing the role of: " + scenario.botRole()
                : "You are an English tutor";
        var userRoleDesc = scenario.userRole() != null
                ? "The user is playing the role of: " + scenario.userRole()
                : "";
        var goalDesc = scenario.goal() != null ? "Conversation goal: " + scenario.goal() : "";
        var levelDesc = scenario.level() != null
                ? "LEARNER LEVEL: %s - Adjust your vocabulary accordingly. Use %s.".formatted(
                scenario.level(), getLevelGuidance(scenario.level()))
                : "";

        var systemPrompt = """
                You are an English tutor helping a language learner practice speaking through roleplay.
                
                SCENARIO CONTEXT: %s
                %s
                %s
                %s
                %s
                
                Your task:
                1. Stay in character as %s and respond naturally to continue the roleplay.
                2. Generate a natural, conversational response that advances the scenario. Keep it concise (1-2 sentences).
                
                IMPORTANT: Be natural and engaging. Do NOT use markdown formatting.
                CRITICAL: Return ONLY a JSON object: {"response": "<your response>"}
                """.formatted(scenario.context(), botRoleDesc, userRoleDesc, goalDesc, levelDesc,
                scenario.botRole() != null ? scenario.botRole() : "the tutor");

        try {
            var messages = buildMessages(systemPrompt, history, userMessage);
            var responseText = callOpenAi(messages, 0.7, 1024);

            // Try parsing as JSON first, fall back to raw text
            try {
                var parsed = objectMapper.readTree(responseText);
                var responseField = parsed.path("response").asText(null);
                if (responseField != null && !responseField.isBlank()) {
                    return new SpeakingResponseResult(responseField);
                }
            } catch (Exception jsonEx) {
                // GPT returned plain text instead of JSON — use it directly
                log.debug("[generateSpeakingResponse] GPT returned plain text, using as-is");
            }

            // Use raw text (strip quotes if wrapped)
            var cleaned = responseText.strip();
            if (cleaned.startsWith("\"") && cleaned.endsWith("\"")) {
                cleaned = cleaned.substring(1, cleaned.length() - 1);
            }
            return new SpeakingResponseResult(cleaned.isBlank()
                    ? "I'm sorry, I didn't catch that. Could you repeat?"
                    : cleaned);
        } catch (Exception e) {
            log.error("[generateSpeakingResponse] Error: {}", e.getMessage());
            return new SpeakingResponseResult("I'm sorry, I didn't catch that. Could you repeat?");
        }
    }

    // ========================================================================
    // 1b. generateSpeakingHint — Suggest what the user could say
    // ========================================================================

    /**
     * Generate a sample response hint that the user can read aloud.
     * Shows what the user COULD say in this conversation, at their level.
     */
    public SpeakingHintResult generateSpeakingHint(
            ScenarioConfig scenario,
            List<Map<String, String>> history
    ) {
        if (client == null) {
            return new SpeakingHintResult("I would like to ask about that, please.");
        }

        var levelDesc = scenario.level() != null
                ? "The user is at %s level. Use %s.".formatted(
                scenario.level(), getLevelGuidance(scenario.level()))
                : "Use moderate vocabulary.";

        var systemPrompt = """
                You are helping an English learner practice speaking through roleplay.
                
                SCENARIO: %s
                USER ROLE: %s
                BOT ROLE: %s
                GOAL: %s
                %s
                
                The user doesn't know what to say next. Generate a SAMPLE RESPONSE that the user could say.
                
                Rules:
                1. The response should be from the USER's perspective (playing their role: %s)
                2. Keep it natural, 1-2 sentences
                3. Match the user's CEFR level — don't use vocabulary beyond their ability
                4. Make it relevant to the last thing the tutor said
                5. Return ONLY the sample text the user should say, nothing else
                6. Do NOT add quotation marks, labels, or explanations
                """.formatted(
                scenario.context(),
                scenario.userRole() != null ? scenario.userRole() : "a learner",
                scenario.botRole() != null ? scenario.botRole() : "a tutor",
                scenario.goal() != null ? scenario.goal() : "Complete the conversation",
                levelDesc,
                scenario.userRole() != null ? scenario.userRole() : "a learner");

        try {
            var messages = buildMessages(systemPrompt, history, "Give me a hint for what I should say next.");
            var responseText = callOpenAi(messages, 0.8, 256);
            // Clean any accidental quotes/labels
            var cleaned = responseText.strip()
                    .replaceAll("^[\"']|[\"']$", "")
                    .replaceAll("^(User|You|Hint|Sample|Response|Suggested):\\s*", "");
            return new SpeakingHintResult(cleaned.isBlank()
                    ? "I would like to ask about that, please."
                    : cleaned);
        } catch (Exception e) {
            log.error("[generateSpeakingHint] Error: {}", e.getMessage());
            return new SpeakingHintResult("I would like to ask about that, please.");
        }
    }

    // ========================================================================
    // 2. analyzeSessionConversation — Post-session analysis
    // ========================================================================

    public record TurnError(String word, String correction, String errorType, int startIndex, int endIndex) {}
    public record TurnAnalysis(int turnIndex, List<TurnError> errors) {}
    public record SessionAnalysisResult(
            String feedbackTitle, String feedbackSummary, String feedbackRating, String feedbackTip,
            int grammarScore, int relevanceScore, List<TurnAnalysis> turnAnalyses) {}

    /**
     * Analyze session conversation for errors and scoring.
     * Ports: analyzeSessionConversation() from gemini.ts
     */
    public SessionAnalysisResult analyzeSessionConversation(
            String scenarioContext,
            List<Map<String, String>> turns
    ) {
        // Filter user turns
        var userTurns = turns.stream().filter(t -> "user".equals(t.get("role"))).toList();

        if (userTurns.isEmpty()) {
            return new SessionAnalysisResult(
                    "Session Complete", "Start speaking to get feedback!",
                    "N/A", "Try to speak more in your next session.",
                    0, 0, List.of());
        }

        if (client == null) {
            return fallbackAnalysis(userTurns);
        }

        // Build conversation text with turn indices
        var sb = new StringBuilder();
        int userIdx = 0;
        for (var turn : turns) {
            var role = "user".equals(turn.get("role")) ? "User" : "Tutor";
            var indexLabel = "user".equals(turn.get("role")) ? " [UserTurnIndex: " + (userIdx++) + "]" : "";
            sb.append("%s%s: \"%s\"\n".formatted(role, indexLabel, turn.get("text")));
        }

        var prompt = """
                You are a STRICT but fair English language evaluator. Analyze this conversation with HONEST and ACCURATE scoring.
                
                SCENARIO CONTEXT: %s
                
                CONVERSATION:
                %s
                
                YOUR TASK - BE STRICT AND THOROUGH:
                1. For each USER turn, identify ALL errors (grammar, articles, prepositions, vocabulary, verb tense, word choice).
                2. For each error, provide EXACT position (startIndex, endIndex) in the original text.
                3. Calculate HONEST scores - do NOT inflate.
                
                STRICT SCORING GUIDELINES:
                GRAMMAR: 90-100 (perfect), 80-89 (1-2 errors), 70-79 (3-4 errors), 60-69 (5-7 errors), below 60 (8+ errors)
                RELEVANCE: 90-100 (perfectly on-topic), 80-89 (mostly relevant), 70-79 (generally relevant), below 70 (off-topic)
                FEEDBACK RATING: "Excellent" (both 85+), "Good" (both 70+), "Average" (one 60-69), "Needs Improvement" (any below 60)
                
                Return JSON ONLY:
                {
                  "feedbackTitle": "<max 5 words>",
                  "feedbackSummary": "<2-sentence honest feedback>",
                  "feedbackRating": "<Excellent|Good|Average|Needs Improvement>",
                  "feedbackTip": "<specific actionable tip>",
                  "grammarScore": <0-100>,
                  "relevanceScore": <0-100>,
                  "turnAnalyses": [
                    {
                      "turnIndex": <index>,
                      "errors": [
                        {"word": "<incorrect>", "correction": "<correct>", "errorType": "<Grammar|Vocabulary|Preposition|Article|Verb Tense|Word Choice>", "startIndex": <int>, "endIndex": <int>}
                      ]
                    }
                  ]
                }
                """.formatted(scenarioContext, sb.toString());

        try {
            var messages = List.of(
                    ChatCompletionMessageParam.ofUser(
                            ChatCompletionUserMessageParam.builder()
                                    .content(prompt).build()));
            var responseText = callOpenAi(messages, 0.3, 16384);
            return objectMapper.readValue(responseText, SessionAnalysisResult.class);
        } catch (Exception e) {
            log.error("[analyzeSessionConversation] Error: {}", e.getMessage());
            return fallbackAnalysis(userTurns);
        }
    }

    // ========================================================================
    // 3. generateScenario — Custom/Random scenario creation
    // ========================================================================

    public record GeneratedScenario(
            String title, String description, String goal, String level,
            String context, String image, String imageKeyword,
            String userRole, String botRole, String openingLine, List<String> objectives) {}

    /**
     * Generate a speaking scenario via AI.
     * Ports: generateScenario() from gemini.ts
     */
    public GeneratedScenario generateScenario(String topic, String userLevel) {
        if (client == null) {
            return fallbackScenario(topic, userLevel);
        }

        var levelInstruction = userLevel != null
                ? "The scenario MUST be appropriate for %s level learners. Use %s.".formatted(
                        userLevel, getLevelGuidance(userLevel))
                : "The scenario should be appropriate for B1 (intermediate) level learners.";

        var topicInstruction = topic != null
                ? "Create a speaking roleplay scenario based on: \"%s\".".formatted(topic)
                : "Create a RANDOM, creative speaking roleplay scenario. Choose from diverse topics like: travel, shopping, dining, job interviews, doctor visits, customer service, making friends, etc.";

        var prompt = """
                %s
                
                %s
                
                IMPORTANT: Generate a complete, engaging roleplay scenario. ALL content MUST be in ENGLISH.
                
                Output JSON format ONLY:
                {
                  "title": "Short catchy title (2-5 words)",
                  "description": "Brief description (1-2 sentences)",
                  "goal": "What the user needs to achieve",
                  "level": "%s",
                  "context": "Detailed user-facing situation description (2-3 sentences)",
                  "image": "/learning.png",
                  "imageKeyword": "2-3 word search term for stock photo",
                  "userRole": "The role the learner plays",
                  "botRole": "The role the AI plays",
                  "openingLine": "The AI's first message to start the conversation",
                  "objectives": ["Objective 1", "Objective 2", "Objective 3"]
                }
                """.formatted(topicInstruction, levelInstruction, userLevel != null ? userLevel : "B1");

        try {
            var messages = List.of(
                    ChatCompletionMessageParam.ofUser(
                            ChatCompletionUserMessageParam.builder()
                                    .content(prompt).build()));
            var responseText = callOpenAi(messages, 0.8, 8192);
            var parsed = objectMapper.readValue(responseText, GeneratedScenario.class);
            // Fill fallbacks for missing fields
            return new GeneratedScenario(
                    parsed.title() != null ? parsed.title() : (topic != null ? topic.substring(0, Math.min(50, topic.length())) : "Random Scenario"),
                    parsed.description() != null ? parsed.description() : "Practice speaking in this scenario",
                    parsed.goal() != null ? parsed.goal() : "Complete the conversation successfully",
                    parsed.level() != null ? parsed.level() : (userLevel != null ? userLevel : "B1"),
                    parsed.context() != null ? parsed.context() : "You are having a conversation.",
                    "/learning.png",
                    parsed.imageKeyword() != null ? parsed.imageKeyword() : "english learning",
                    parsed.userRole() != null ? parsed.userRole() : "Learner",
                    parsed.botRole() != null ? parsed.botRole() : "English Tutor",
                    parsed.openingLine() != null ? parsed.openingLine() : "Hello! How can I help you today?",
                    parsed.objectives() != null ? parsed.objectives() : List.of("Practice speaking naturally", "Use appropriate vocabulary"));
        } catch (Exception e) {
            log.error("[generateScenario] Error: {}", e.getMessage());
            return fallbackScenario(topic, userLevel);
        }
    }

    // ========================================================================
    // 4. generateDoraraResponse — AI Chatbot
    // ========================================================================

    /**
     * Generate Dorara AI chatbot response.
     * Ports: generateDoraraResponse() from gemini.ts
     */
    public String generateDoraraResponse(
            String systemInstruction,
            List<Map<String, String>> history,
            String userMessage
    ) {
        if (client == null) {
            return "Xin lỗi, tôi gặp chút trục trặc. Bạn có thể hỏi lại được không?";
        }

        try {
            var messages = buildMessages(systemInstruction, history, userMessage);
            var responseText = callOpenAi(messages, 0.7, 2048);
            // Clean any accidental markdown
            return responseText
                    .replaceAll("\\*\\*", "")
                    .replaceAll("\\*", "")
                    .replaceAll("#{1,6}\\s", "")
                    .replaceAll("```[\\s\\S]*?```", "")
                    .replaceAll("`", "")
                    .trim();
        } catch (Exception e) {
            log.error("[generateDoraraResponse] Error: {}", e.getMessage());
            return "Xin lỗi, tôi gặp chút trục trặc. Bạn có thể hỏi lại được không?";
        }
    }

    // ========================================================================
    // Private helpers
    // ========================================================================

    private List<ChatCompletionMessageParam> buildMessages(
            String systemPrompt,
            List<Map<String, String>> history,
            String userMessage
    ) {
        var messages = new ArrayList<ChatCompletionMessageParam>();

        // System message
        messages.add(ChatCompletionMessageParam.ofSystem(
                ChatCompletionSystemMessageParam.builder()
                        .content(systemPrompt).build()));

        // History
        if (history != null) {
            for (var msg : history) {
                var role = msg.get("role");
                var text = msg.get("text") != null ? msg.get("text") : msg.get("content");
                if (text == null) continue;

                if ("user".equals(role)) {
                    messages.add(ChatCompletionMessageParam.ofUser(
                            ChatCompletionUserMessageParam.builder()
                                    .content(text).build()));
                } else {
                    messages.add(ChatCompletionMessageParam.ofAssistant(
                            ChatCompletionAssistantMessageParam.builder()
                                    .content(text).build()));
                }
            }
        }

        // Current user message
        messages.add(ChatCompletionMessageParam.ofUser(
                ChatCompletionUserMessageParam.builder()
                        .content(userMessage).build()));

        return messages;
    }

    private String callOpenAi(List<ChatCompletionMessageParam> messages, double temperature, int maxTokens) {
        var model = appProperties.getOpenai().getModel();
        var params = ChatCompletionCreateParams.builder()
                .model(model)
                .messages(messages)
                .temperature(temperature)
                .maxCompletionTokens((long) maxTokens)
                .build();

        var completion = client.chat().completions().create(params);
        var choice = completion.choices().getFirst();
        var content = choice.message().content().orElse("");

        // Strip markdown code fences if present
        if (content.startsWith("```")) {
            content = content.replaceAll("^```(?:json)?\\s*", "").replaceAll("\\s*```$", "");
        }
        return content;
    }

    private SessionAnalysisResult fallbackAnalysis(List<Map<String, String>> userTurns) {
        var analyses = new ArrayList<TurnAnalysis>();
        for (int i = 0; i < userTurns.size(); i++) {
            analyses.add(new TurnAnalysis(i, List.of()));
        }
        return new SessionAnalysisResult(
                "Session Complete",
                "Great effort! Keep practicing to improve your English speaking skills.",
                "Good", "Focus on grammar and vocabulary to improve your speaking.",
                70, 70, analyses);
    }

    private GeneratedScenario fallbackScenario(String topic, String userLevel) {
        return new GeneratedScenario(
                topic != null ? topic.substring(0, Math.min(50, topic.length())) : "Practice Conversation",
                "Custom speaking scenario", "Practice conversation",
                userLevel != null ? userLevel : "B1",
                topic != null ? "Roleplay about " + topic : "Have a casual English conversation",
                "/learning.png",
                topic != null ? topic.split(" ")[0] : "conversation practice",
                "Learner", "English Tutor",
                "Hello! I'm here to help you practice English. What would you like to talk about?",
                List.of("Practice speaking naturally", "Build confidence"));
    }
}
