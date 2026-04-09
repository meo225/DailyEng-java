package com.dailyeng.dorara;

import com.dailyeng.ai.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service xử lý logic của Chatbot.
 */
@Service
@RequiredArgsConstructor
public class DoraraService {

    private final GeminiService geminiService;

    /**
     * Đem câu hỏi của người dùng đi hỏi Google AI.
     */
    public void chatWithDoraraStream(com.dailyeng.dorara.DoraraDtos.ChatRequest request, java.util.function.Consumer<String> chunkConsumer) {
        
        // 1. Lấy thông tin ngữ cảnh biến
        String currentPage = request.currentPage() != null ? request.currentPage() : "trang chủ";
        String lang = request.targetLanguage() != null ? request.targetLanguage() : "tiếng Anh";

        // 1. Bản đồ chỉ đường thu nhỏ của website để Dorara có thể hướng dẫn người dùng
        String siteMapInfo = """
        - /dashboard hoặc /study-plan: Trang Lộ trình học tập (giúp phân bổ mục tiêu và xem thống kê giờ học).
        - /speaking: Luyện nói với AI (đóng vai, chấm điểm phát âm).
        - /notifications: Hộp thư thông báo.
        (Ngoài ra còn các bài học ngữ pháp, từ vựng)""";

        String systemPrompt = """
            Bạn là Dorara, Trợ lý học tập %s AI trí tuệ và chuyên nghiệp của nền tảng DailyEng.
            Đặc điểm nhận dạng & Thái độ:
            - Chuyên ngiệp, tận tâm, lịch sự nhưng vẫn thân thiện. Xưng hô là "tớ/mình" và "bạn/cậu" (hoặc linh hoạt theo cách người dùng gọi).
            - Nhiệm vụ cốt lõi: Giải đáp các thắc mắc về Ngữ pháp, Từ vựng, Dịch thuật, Luyện viết, và Phương pháp học tiếng Anh.
            
            Ngữ cảnh Hệ thống (Cực kỳ quan trọng):
            - Ngay lúc này, người dùng đang mở tính năng/trang web ở định tuyến: %s.
            - Nếu họ hỏi về cách dùng trang web, hãy dựa vào vị trí hiện tại và Bản đồ hệ thống sau để hướng dẫn họ:
            %s
            
            Định dạng Phản hồi (Tiết kiệm Token nhưng không cụt ngủn):
            - Đi thẳng vào trọng tâm câu hỏi. Đưa ra giải thích rõ ràng, súc tích (khoảng 2-3 đoạn văn ngắn nếu cần giải thích ngữ pháp).
            - Trình bày thông minh bằng Bullet điểm (dấu gạch đầu dòng) để dễ đọc.
            - Không cần quá chắt chiu, nhưng hãy loại bỏ những câu rào trước đón sau dư thừa.
            - LUÔN LUÔN giao tiếp bằng tiếng Việt nhưng sử dụng tiếng Anh chính xác khi đưa ra ví dụ.
            """.formatted(lang, currentPage, siteMapInfo);
            
        // 2. Lấy lại trí nhớ (Chỉ nhớ tối đa 5-6 tin nhắn gần nhất để chống tràn Token)
        List<java.util.Map<String, String>> historyMaps = new java.util.ArrayList<>();
        if (request.messages() != null) {
            var msgs = request.messages();
            // Lọc lấy 6 tin nhắn cuối cùng (3 cặp QA)
            int startIndex = Math.max(0, msgs.size() - 6);
            for (int i = startIndex; i < msgs.size(); i++) {
                var msg = msgs.get(i);
                historyMaps.add(java.util.Map.of(
                        "role", msg.role() != null ? msg.role() : "user",
                        "text", msg.content() != null ? msg.content() : ""
                ));
            }
        }
        
        // 3. Gọi hàm lõi V2 (nhả chữ thuần)
        geminiService.generateDoraraStreamV2(
                systemPrompt,
                historyMaps, // Truyền trí nhớ vào
                request.userMessage(),
                chunkConsumer
        );
    }
}
