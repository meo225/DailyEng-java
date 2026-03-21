package com.dailyeng.service;

import com.dailyeng.dto.dorara.DoraraDtos.*;
import com.dailyeng.entity.User;
import com.dailyeng.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DoraraService {

    private final GeminiService geminiService;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DoraraChatResponse sendDoraraMessage(String userId, DoraraChatRequest request) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            String name = (user != null) ? user.getName() : "User";
            String level = (user != null && user.getLevel() != null) ? user.getLevel().name() : null;

            // 1. Convert current page URL to human-readable context
            String pageDesc = getPageDescription(request.currentPage());

            // 2. Build massive system instruction with user details
            String systemInstruction = DoraraContext.buildSystemInstruction(name, level, pageDesc);

            // 3. Convert DTO messages into GeminiService history format
            List<Map<String, String>> history = new ArrayList<>();
            if (request.messages() != null) {
                for (DoraraChatMessage msg : request.messages()) {
                    Map<String, String> map = new HashMap<>();
                    map.put("role", msg.role());
                    map.put("content", msg.content());
                    history.add(map);
                }
            }

            // 4. Call existing teammate's GeminiService
            String aiResponse = geminiService.generateDoraraResponse(systemInstruction, history, request.userMessage());
            return new DoraraChatResponse(aiResponse, null);
            
        } catch (Exception e) {
            log.error("[sendDoraraMessage] Error generating AI response: {}", e.getMessage());
            return new DoraraChatResponse("", "Something went wrong. Please try again.");
        }
    }

    /**
     * Map website paths to contextual hints for the AI
     */
    private String getPageDescription(String path) {
        if (path == null) return "Page: Unknown";

        String cleanPath = path.split("\\?")[0].replaceAll("/$", "");
        if (cleanPath.isEmpty()) cleanPath = "/";

        return switch (cleanPath) {
            case "/" -> "Home Page";
            case "/speaking" -> "Speaking Practice Page - Practice English speaking";
            case "/vocab" -> "Vocabulary Hub Page - Learn vocabulary";
            case "/grammar" -> "Grammar Hub Page - Learn grammar";
            case "/notebook" -> "Notebook Page - Personal notes";
            case "/user/profile" -> "Profile Page - User information";
            case "/user/settings" -> "Settings Page - Account settings";
            case "/user/notifications" -> "Notifications Page";
            case "/placement-test" -> "Placement Test Page - Level assessment";
            case "/helps" -> "Help Page";
            case "/auth/signin" -> "Sign In Page";
            case "/auth/signup" -> "Sign Up Page";
            default -> {
                if (cleanPath.startsWith("/speaking/session/")) yield "Speaking Session - Practicing with AI";
                if (cleanPath.startsWith("/vocab/")) yield "Viewing a vocabulary topic";
                if (cleanPath.startsWith("/grammar/")) yield "Viewing a grammar lesson";
                yield "Page: " + cleanPath;
            }
        };
    }
}
