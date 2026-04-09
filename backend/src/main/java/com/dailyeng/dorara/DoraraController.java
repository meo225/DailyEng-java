package com.dailyeng.dorara;

import com.dailyeng.dorara.DoraraDtos.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * Controller: Người gác cổng. Nhận câu hỏi từ Next.js và trả lời chữ tưng tửng (Stream)
 */
@CrossOrigin
@RestController
@RequestMapping("/dorara")
@RequiredArgsConstructor
public class DoraraController {

    private final DoraraService doraraService;

    @PostMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter chatStream(@RequestBody ChatRequest request) {
        
        // 1. Mở một đường ống Stream chờ gửi chữ về cho Next.js (chờ max 2 phút)
        SseEmitter emitter = new SseEmitter(120_000L);

        // 2. Chạy ngầm luồng AI để không làm treo máy chủ
        Thread.startVirtualThread(() -> {
            try {
                // Đẩy tòan bộ dữ liệu nhận từ giao diện qua cho Quản lý (Service) đánh giá
                doraraService.chatWithDoraraStream(request, chunk -> {
                    try {
                        // Mã hóa dấu xuống dòng thành chữ \n (String) để SseEmitter không bị ngáo gãy cấu trúc data: liên tục
                        String safeChunk = chunk.replace("\n", "\\n");
                        emitter.send(safeChunk);
                    } catch (Exception e) {
                        emitter.completeWithError(e);
                    }
                });

                // Google nói xong rồi thì báo cho Frontend biết là đóng ống lại
                emitter.complete();

            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });

        // 3. Cuối cùng trả về cái ống ban đầu
        return emitter;
    }
}
