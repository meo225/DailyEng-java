package com.dailyeng.dorara;

import com.dailyeng.dorara.DoraraDtos.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * Controller
 */
@RestController
@RequestMapping("/dorara")
@RequiredArgsConstructor
public class DoraraController {

    private final DoraraService doraraService;

    @PostMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter chatStream(@RequestBody ChatRequest request) {

        SseEmitter emitter = new SseEmitter(120_000L);

        Thread.startVirtualThread(() -> {
            try {
                doraraService.chatWithDoraraStream(request, chunk -> {
                    try {
                        String safeChunk = chunk.replace("\n", "\\n");
                        emitter.send(safeChunk);
                    } catch (Exception e) {
                        emitter.completeWithError(e);
                    }
                });

                emitter.complete();

            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });

        return emitter;
    }
}
