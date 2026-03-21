package com.dailyeng.service;

import com.dailyeng.config.AppProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Pexels API integration for fetching scenario images.
 * Ports: fetchPexelsImage() from speaking.ts lines 346-415
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PexelsService {

    private final AppProperties appProperties;
    private final ObjectMapper objectMapper;

    private static final HttpClient HTTP_CLIENT = HttpClient.newHttpClient();
    private static final String PEXELS_API_URL = "https://api.pexels.com/v1/search";
    private static final String FALLBACK_IMAGE = "/learning.png";

    /**
     * Fetch a landscape image URL from Pexels based on keyword.
     * Returns medium-sized image URL or fallback.
     */
    public String fetchImage(String keyword) {
        var apiKey = appProperties.getPexels().getApiKey();
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("[fetchImage] PEXELS_API_KEY not set, using fallback");
            return FALLBACK_IMAGE;
        }

        try {
            var encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            var url = "%s?query=%s&per_page=3&orientation=landscape".formatted(PEXELS_API_URL, encodedKeyword);

            var request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", apiKey)
                    .GET()
                    .build();

            var response = HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("[fetchImage] Pexels API error: {}", response.statusCode());
                return FALLBACK_IMAGE;
            }

            var data = objectMapper.readTree(response.body());
            var photos = data.path("photos");

            if (!photos.isArray() || photos.isEmpty()) {
                log.info("[fetchImage] No photos found for \"{}\"", keyword);
                return FALLBACK_IMAGE;
            }

            // Randomly pick from top results for variety
            int randomIndex = ThreadLocalRandom.current().nextInt(Math.min(3, photos.size()));
            var imageUrl = photos.get(randomIndex).path("src").path("medium").asText(FALLBACK_IMAGE);

            log.info("[fetchImage] Found image for \"{}\": {}", keyword, imageUrl);
            return imageUrl;
        } catch (Exception e) {
            log.error("[fetchImage] Error fetching image for \"{}\": {}", keyword, e.getMessage());
            return FALLBACK_IMAGE;
        }
    }
}
