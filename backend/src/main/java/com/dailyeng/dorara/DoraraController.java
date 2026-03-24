package com.dailyeng.dorara;

import com.dailyeng.common.web.BaseController;

import com.dailyeng.dorara.DoraraDtos.DoraraChatRequest;
import com.dailyeng.dorara.DoraraDtos.DoraraChatResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/dorara")
@RequiredArgsConstructor
public class DoraraController extends BaseController {

    private final DoraraService doraraService;

    /**
     * Standard chat endpoint — returns full structured JSON response.
     */
    @PostMapping("/chat")
    public ResponseEntity<DoraraChatResponse> chat(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language,
            @Valid @RequestBody DoraraChatRequest request) {
        String userId = requireUserId();
        return ResponseEntity.ok(doraraService.sendDoraraMessage(userId, language, request));
    }

    /**
     * SSE streaming chat endpoint — streams the response word-by-word.
     * Returns an SseEmitter that sends text chunks as Server-Sent Events.
     *
     * <p>After all chunks are streamed, a final {@code [DONE]} event is sent
     * to signal the client to close the connection.</p>
     */
    @PostMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter chatStream(
            @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language,
            @Valid @RequestBody DoraraChatRequest request) {
        String userId = requireUserId();

        // 120-second timeout for long AI responses
        var emitter = new SseEmitter(120_000L);

        // Run streaming in a separate thread to not block the servlet thread
        Thread.startVirtualThread(() -> {
            try {
                doraraService.streamDoraraMessage(userId, language, request, chunk -> {
                    try {
                        emitter.send(SseEmitter.event()
                                .name("chunk")
                                .data(chunk));
                    } catch (Exception e) {
                        emitter.completeWithError(e);
                    }
                });

                // Signal completion
                emitter.send(SseEmitter.event().name("done").data("[DONE]"));
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });

        return emitter;
    }
}
