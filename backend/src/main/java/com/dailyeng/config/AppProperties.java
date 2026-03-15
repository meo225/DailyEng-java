package com.dailyeng.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Centralized application properties mapped from {@code app.*} in application.yml.
 * Uses Java 21+ and Spring Boot 3.x configuration properties binding.
 */
@Configuration
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class AppProperties {

    private Jwt jwt = new Jwt();
    private Cors cors = new Cors();
    private Gemini gemini = new Gemini();
    private Pexels pexels = new Pexels();
    private String frontendUrl = "http://localhost:3000";

    @Getter
    @Setter
    public static class Jwt {
        private String secret;
        private long expirationMs = 86400000; // 24 hours
        private long refreshExpirationMs = 604800000; // 7 days
    }

    @Getter
    @Setter
    public static class Cors {
        private String allowedOrigins = "http://localhost:3000";
        private String allowedMethods = "GET,POST,PUT,DELETE,PATCH,OPTIONS";
        private String allowedHeaders = "*";
        private boolean allowCredentials = true;
        private long maxAge = 3600;
    }

    @Getter
    @Setter
    public static class Gemini {
        private String apiKey;
        private String model = "gemini-2.5-flash";
    }

    @Getter
    @Setter
    public static class Pexels {
        private String apiKey;
    }
}
