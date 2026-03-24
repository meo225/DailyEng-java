package com.dailyeng.content;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service layer for CMS-style site content (FAQs, reviews, stats, benefits).
 */
@Service
@RequiredArgsConstructor
public class SiteContentService {

    private final SiteContentRepository siteContentRepository;

    /** Get content by key, returning the JSONB payload or empty. */
    public Optional<Object> getContentByKey(String key) {
        return siteContentRepository.findByContentKey(key)
                .map(sc -> sc.getContent());
    }

    /** Get all content as a key→content map. */
    public Map<String, Object> getAllContent() {
        return siteContentRepository.findAll().stream()
                .collect(Collectors.toMap(
                        sc -> sc.getContentKey(),
                        sc -> sc.getContent()));
    }
}
