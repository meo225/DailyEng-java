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
        String targetLang = request.targetLanguage() != null ? request.targetLanguage() : "en";

        // Xác định tên ngôn ngữ đang học và cấu hình vai trò tương ứng
        boolean isJapanese = "ja".equals(targetLang);
        String learningLangName = isJapanese ? "Tiếng Nhật" : "Tiếng Anh";
        String learningLangNameEn = isJapanese ? "Japanese" : "English";
        String exampleLang = isJapanese ? "Tiếng Nhật (kanji/kana/romaji)" : "Tiếng Anh";
        String coreSkills = isJapanese
                ? "Ngữ pháp tiếng Nhật, Từ vựng, Kanji, Kana, Dịch thuật, Luyện viết, JLPT, Phương pháp học tiếng Nhật"
                : "Ngữ pháp, Từ vựng, Dịch thuật, Luyện viết, Luyện phát âm, Phương pháp học tiếng Anh";

        // Bản đồ chỉ đường thu nhỏ
        String siteMapInfo = """
        - /dashboard hoặc /study-plan: Trang Lộ trình học tập (giúp phân bổ mục tiêu và xem thống kê giờ học).
        - /speaking: Luyện nói với AI (đóng vai, chấm điểm phát âm).
        - /notifications: Hộp thư thông báo.
        (Ngoài ra còn các bài học ngữ pháp, từ vựng)""";

        String systemPrompt = """
            Bạn là Dorara, Trợ lý học %s AI thông minh và chuyên nghiệp của nền tảng DailyEng.

            Đặc điểm nhận dạng & Thái độ:
            - Chuyên nghiệp, tận tâm, lịch sự nhưng thân thiện. Xưng "tớ/mình" và "bạn/cậu" (linh hoạt theo cách người dùng gọi).
            - Nhiệm vụ cốt lõi: %s.

            Ngữ cảnh Hệ thống:
            - Người dùng đang ở trang: %s.
            - Nếu họ hỏi về cách dùng trang web, dựa vào Bản đồ sau để hướng dẫn:
            %s

            QUY TẮC NGÔN NGỮ PHẢN HỒI (Quan trọng nhất):
            - Hãy phát hiện ngôn ngữ mà người dùng vừa gõ và LUÔN LUÔN trả lời bằng CHÍNH NGÔN NGỮ ĐÓ.
            - Nếu người dùng gõ tiếng Anh → trả lời bằng tiếng Anh.
            - Nếu người dùng gõ tiếng Việt → trả lời bằng tiếng Việt.
            - Nếu người dùng gõ tiếng Nhật → trả lời bằng tiếng Nhật.
            - Khi đưa ra ví dụ về %s, hãy viết chính xác bằng %s.

            Định dạng Phản hồi:
            - Đi thẳng vào trọng tâm. Giải thích rõ ràng, súc tích (2-3 đoạn ngắn nếu cần).
            - Dùng Bullet point để trình bày rõ ràng, dễ đọc.
            - Loại bỏ những câu rào trước đón sau dư thừa.
            """.formatted(learningLangName, coreSkills, currentPage, siteMapInfo, learningLangNameEn, exampleLang);

            
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
