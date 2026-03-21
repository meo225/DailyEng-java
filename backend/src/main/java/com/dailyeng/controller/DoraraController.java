package com.dailyeng.controller;

import com.dailyeng.dto.dorara.DoraraDtos.DoraraChatRequest;
import com.dailyeng.dto.dorara.DoraraDtos.DoraraChatResponse;
import com.dailyeng.service.DoraraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dorara")
@RequiredArgsConstructor
public class DoraraController extends BaseController {

    private final DoraraService doraraService;

    @PostMapping("/chat")
    public ResponseEntity<DoraraChatResponse> chat(@Valid @RequestBody DoraraChatRequest request) {
        String userId = requireUserId();
        return ResponseEntity.ok(doraraService.sendDoraraMessage(userId, request));
    }
}
