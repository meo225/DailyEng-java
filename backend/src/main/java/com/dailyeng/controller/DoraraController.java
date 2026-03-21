package com.dailyeng.controller;

import com.dailyeng.dto.dorara.DoraraDtos.DoraraChatRequest;
import com.dailyeng.dto.dorara.DoraraDtos.DoraraChatResponse;
import com.dailyeng.service.DoraraService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dorara")
@RequiredArgsConstructor
public class DoraraController {

    private final DoraraService doraraService;

    @PostMapping("/chat")
    public ResponseEntity<DoraraChatResponse> chat(
            @Valid @RequestBody DoraraChatRequest request,
            HttpServletRequest httpServletRequest
    ) {
        String userId = requireUserId(httpServletRequest);
        return ResponseEntity.ok(doraraService.sendDoraraMessage(userId, request));
    }

    private String requireUserId(HttpServletRequest request) {
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName();
        }
        throw new com.dailyeng.exception.UnauthorizedException("Authentication required");
    }
}
