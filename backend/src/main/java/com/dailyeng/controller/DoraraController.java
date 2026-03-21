package com.dailyeng.controller;

import com.dailyeng.dto.dorara.DoraraDtos.DoraraChatRequest;
import com.dailyeng.dto.dorara.DoraraDtos.DoraraChatResponse;
import com.dailyeng.service.DoraraService;
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
    public ResponseEntity<DoraraChatResponse> chat(@Valid @RequestBody DoraraChatRequest request) {
        String userId = requireUserId();
        return ResponseEntity.ok(doraraService.sendDoraraMessage(userId, request));
    }

    /**
     * SSE streaming chat endpoint — streams the response word-by-word.
     * Returns an SseEmitter that sends text chunks as Server-Sent Events.
     *
     * <p>After all chunks are streamed, a final {@code [DONE]} event is sent
     * to signal the client to close the connection.</p>
     */
    @PostMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter chatStream(@Valid @RequestBody DoraraChatRequest request) {
        String userId = requireUserId();

        // 120-second timeout for long AI responses
        var emitter = new SseEmitter(120_000L);

        // Run streaming in a separate thread to not block the servlet thread
        Thread.startVirtualThread(() -> {
            try {
                doraraService.streamDoraraMessage(userId, request, chunk -> {
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
