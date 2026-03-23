package com.dailyeng.controller;

import com.dailyeng.service.SiteContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Public endpoint for CMS-style site content (FAQs, reviews, stats, etc.)
 */
@RestController
@RequestMapping("/site-content")
@RequiredArgsConstructor
public class SiteContentController {

    private final SiteContentService siteContentService;

    /** GET /api/site-content/{key} — returns the JSONB content for a given key */
    @GetMapping("/{key}")
    public ResponseEntity<Object> getContent(@PathVariable String key) {
        return siteContentService.getContentByKey(key)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** GET /api/site-content — returns all content as a map of key→content */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllContent() {
        return ResponseEntity.ok(siteContentService.getAllContent());
    }
}
