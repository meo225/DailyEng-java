package com.dailyeng.dto.dorara;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public final class DoraraDtos {

    private DoraraDtos() {}

    public record DoraraChatMessage(
            String id,
            @Pattern(regexp = "user|tutor") String role,
            @NotBlank String content
    ) {}

    public record DoraraChatRequest(
            @NotNull @Valid List<DoraraChatMessage> messages,
            @NotBlank String userMessage,
            String currentPage
    ) {}

    public record DoraraChatResponse(
            String response,
            String error
    ) {}
}
