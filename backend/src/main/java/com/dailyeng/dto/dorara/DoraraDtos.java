package com.dailyeng.dto.dorara;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class DoraraDtos {

    public record DoraraChatMessage(
            String id,
            String role, // "user" or "tutor"
            String content
    ) {}

    public record DoraraChatRequest(
            @NotNull List<DoraraChatMessage> messages,
            @NotBlank String userMessage,
            String currentPage
    ) {}

    public record DoraraChatResponse(
            String response,
            String error
    ) {}
}
