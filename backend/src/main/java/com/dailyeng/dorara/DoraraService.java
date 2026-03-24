package com.dailyeng.dorara;

import com.dailyeng.ai.GeminiService;

import com.dailyeng.dorara.DoraraDtos.*;
import com.dailyeng.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DoraraService {

    private final GeminiService geminiService;
    private final UserRepository userRepository;
    private final DoraraLearnerDataService learnerDataService;
    private final ObjectMapper objectMapper;

    public DoraraChatResponse sendDoraraMessage(String userId, String language, DoraraChatRequest request) {
        try {
            var user = userRepository.findById(userId).orElse(null);
            String name = (user != null) ? user.getName() : "User";
            String level = (user != null && user.getLevel() != null) ? user.getLevel().name() : null;

            String pageDesc = getPageDescription(request.currentPage());

            // Build learner intelligence context from DB data
            String learnerContext = buildLearnerContextSafely(userId, language);

            String systemInstruction = DoraraContext.buildSystemInstruction(
                    name, level, pageDesc, learnerContext);

            List<Map<String, String>> history = request.messages() == null
                    ? List.of()
                    : request.messages().stream()
                            .map(msg -> Map.of("role", msg.role(), "content", msg.content()))
                            .toList();

            String aiResponse = geminiService.generateDoraraResponse(
                    systemInstruction, history, request.userMessage());

            return parseStructuredResponse(aiResponse);

        } catch (Exception e) {
            log.error("[sendDoraraMessage] Error generating AI response", e);
            return DoraraChatResponse.error("Something went wrong. Please try again.");
        }
    }

    /**
     * Stream Dorara's response via a chunk consumer (for SSE).
     * Builds the same enriched prompt but uses streaming API.
     */
    public void streamDoraraMessage(
            String userId, String language, DoraraChatRequest request,
            java.util.function.Consumer<String> chunkConsumer) {
        try {
            var user = userRepository.findById(userId).orElse(null);
            String name = (user != null) ? user.getName() : "User";
            String level = (user != null && user.getLevel() != null) ? user.getLevel().name() : null;

            String pageDesc = getPageDescription(request.currentPage());
            String learnerContext = buildLearnerContextSafely(userId, language);
            String systemInstruction = DoraraContext.buildSystemInstruction(
                    name, level, pageDesc, learnerContext);

            List<Map<String, String>> history = request.messages() == null
                    ? List.of()
                    : request.messages().stream()
                            .map(msg -> Map.of("role", msg.role(), "content", msg.content()))
                            .toList();

            geminiService.generateDoraraResponseStream(
                    systemInstruction, history, request.userMessage(), chunkConsumer);

        } catch (Exception e) {
            log.error("[streamDoraraMessage] Error", e);
            chunkConsumer.accept(
                    "{\"response\":\"Something went wrong. Please try again.\",\"suggestedActions\":[],\"vocabHighlights\":[],\"quizQuestion\":null}");
        }
    }

    /**
     * Parse the Gemini JSON response into a structured DoraraChatResponse.
     * Falls back gracefully to plain text if JSON parsing fails.
     */
    private DoraraChatResponse parseStructuredResponse(String aiResponse) {
        try {
            var tree = objectMapper.readTree(aiResponse);

            String response = tree.path("response").asText("");

            // Parse suggestedActions
            List<String> suggestedActions = List.of();
            var actionsNode = tree.path("suggestedActions");
            if (actionsNode.isArray()) {
                suggestedActions = objectMapper.convertValue(actionsNode,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
            }

            // Parse vocabHighlights
            List<VocabHighlight> vocabHighlights = List.of();
            var vocabNode = tree.path("vocabHighlights");
            if (vocabNode.isArray() && !vocabNode.isEmpty()) {
                vocabHighlights = objectMapper.convertValue(vocabNode,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, VocabHighlight.class));
            }

            // Parse quizQuestion
            QuizQuestion quizQuestion = null;
            var quizNode = tree.path("quizQuestion");
            if (quizNode.isObject() && quizNode.has("question")) {
                quizQuestion = objectMapper.convertValue(quizNode, QuizQuestion.class);
            }

            return new DoraraChatResponse(response, suggestedActions, vocabHighlights, quizQuestion, null);

        } catch (Exception e) {
            log.debug("[parseStructuredResponse] Failed to parse JSON, using raw text: {}", e.getMessage());
            // Graceful fallback: treat the entire response as plain text
            return new DoraraChatResponse(
                    aiResponse,
                    List.of("Tell me more", "Teach me a word"),
                    List.of(),
                    null,
                    null);
        }
    }

    /**
     * Safely build learner context — never let DB errors break the chat.
     */
    private String buildLearnerContextSafely(String userId, String language) {
        try {
            return learnerDataService.buildLearnerContext(userId, language);
        } catch (Exception e) {
            log.warn("[buildLearnerContextSafely] Failed to build learner context: {}", e.getMessage());
            return "";
        }
    }

    /**
     * Map website paths to contextual hints for the AI.
     */
    private String getPageDescription(String path) {
        if (path == null)
            return "Page: Unknown";

        String cleanPath = path.split("\\?")[0].replaceAll("/$", "");
        if (cleanPath.isEmpty())
            cleanPath = "/";

        return switch (cleanPath) {
            case "/" -> "Home Page";
            case "/speaking" -> "Speaking Practice Page — Practice English speaking with AI roleplay";
            case "/vocab" -> "Vocabulary Hub Page — Learn vocabulary by topic and level";
            case "/grammar" -> "Grammar Hub Page — Learn English grammar rules";
            case "/notebook" -> "Notebook Page — Personal vocabulary with SRS review";
            case "/user/profile" -> "Profile Page — View XP, streaks, skill scores";
            case "/user/settings" -> "Settings Page — Account and preferences";
            case "/user/notifications" -> "Notifications Page";
            case "/placement-test" -> "Placement Test Page — Level assessment";
            case "/study-plan" -> "Study Plan Page — Personalized learning schedule";
            case "/helps" -> "Help Page";
            case "/auth/signin" -> "Sign In Page";
            case "/auth/signup" -> "Sign Up Page";
            default -> {
                if (cleanPath.startsWith("/speaking/session/"))
                    yield "Active Speaking Session — User is practicing with AI";
                if (cleanPath.startsWith("/vocab/"))
                    yield "Viewing a vocabulary topic";
                if (cleanPath.startsWith("/grammar/"))
                    yield "Viewing a grammar lesson";
                yield "Page: " + cleanPath;
            }
        };
    }
}
