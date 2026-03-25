package com.dailyeng.config;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

/**
 * Centralized application properties mapped from {@code app.*} in
 * application.yml.
 * Uses Java 21+ and Spring Boot 3.x configuration properties binding.
 */
@Configuration
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class AppProperties {

    private Jwt jwt = new Jwt();
    private Cookie cookie = new Cookie();
    private Cors cors = new Cors();
    private Gemini gemini = new Gemini();
    private AzureSpeech azureSpeech = new AzureSpeech();
    private AzureTranslator azureTranslator = new AzureTranslator();
    private AzureVision azureVision = new AzureVision();
    private Pexels pexels = new Pexels();
    private Google google = new Google();
    private String frontendUrl = "http://localhost:3000";

    @PostConstruct
    public void validate() {
        if (!StringUtils.hasText(jwt.getSecret())) {
            throw new IllegalStateException(
                    "JWT_SECRET environment variable is not set. A secret is required for secure operation.");
        }
        if (jwt.getSecret().length() < 32) {
            throw new IllegalStateException(
                    "JWT_SECRET must be at least 32 characters (256 bits) long for secure HS256 algorithm usage.");
        }
    }

    @Getter
    @Setter
    public static class Jwt {
        private String secret;
        private long expirationMs = 86400000; // 24 hours
        private long refreshExpirationMs = 604800000; // 7 days
    }

    @Getter
    @Setter
    public static class Cookie {
        private boolean secure = false; // true in production (HTTPS)
        private String sameSite = "Lax";
        private String domain = ""; // empty = current domain
        private int accessMaxAge = 86400; // 24 hours in seconds
        private int refreshMaxAge = 604800; // 7 days in seconds
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
        private double temperature = 0.7;
        private int maxTokens = 4096;
    }

    @Getter
    @Setter
    public static class AzureSpeech {
        private String subscriptionKey;
        private String region = "eastjp";
        private String sttLanguage = "en-US";
        private String ttsVoice = "en-US-JennyNeural";
    }

    @Getter
    @Setter
    public static class AzureTranslator {
        private String subscriptionKey;
        private String region = "japaneast";
    }

    @Getter
    @Setter
    public static class AzureVision {
        private String subscriptionKey;
        private String endpoint;
    }

    @Getter
    @Setter
    public static class Pexels {
        private String apiKey;
    }

    @Getter
    @Setter
    public static class Google {
        private String clientId;
        private String clientSecret;
    }
}
