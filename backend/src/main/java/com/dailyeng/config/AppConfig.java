package com.dailyeng.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.client.RestClient;

/**
 * Application-wide bean configuration.
 * <p>
 * - RestClient for external API calls (Pexels, Gemini)
 * - Jackson ObjectMapper with Java 8 Date/Time support
 */
@Configuration
public class AppConfig {

    /**
     * RestClient for calling external HTTP APIs (Pexels, Gemini REST endpoints).
     * Uses virtual threads support out of the box with Spring Boot 3.4+.
     */
    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return Jackson2ObjectMapperBuilder.json()
                .modules(new JavaTimeModule())
                .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .build();
    }
}
