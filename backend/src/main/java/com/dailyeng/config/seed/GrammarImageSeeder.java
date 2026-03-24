package com.dailyeng.config.seed;


import com.dailyeng.vocabulary.Topic;
import com.dailyeng.common.enums.HubType;
import com.dailyeng.vocabulary.TopicRepository;
import com.dailyeng.ai.PexelsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Map;

/**
 * One-time seeder that assigns Pexels images to grammar AND vocab topics
 * that don't yet have a thumbnail.
 */
@Slf4j
@Component
@Order(10)  // run after data seeders
@Profile("!test")
@RequiredArgsConstructor
public class GrammarImageSeeder implements CommandLineRunner {

    private final TopicRepository topicRepo;
    private final PexelsService pexelsService;
    private final EntityManager entityManager;

    /**
     * Keyword overrides: subcategory or category → Pexels search keyword.
     * Used when the name itself yields poor image results on Pexels.
     */
    private static final Map<String, String> KEYWORD_OVERRIDES = Map.ofEntries(
            // Grammar categories (abstract concepts need concrete imagery)
            Map.entry("Tenses",              "time clock hourglass"),
            Map.entry("Sentence Structure",  "writing notebook pen"),
            Map.entry("Modals",              "choices decision making"),
            Map.entry("Conditionals",        "road crossroads path"),
            Map.entry("Passive Voice",       "teamwork collaboration office"),
            Map.entry("Reported Speech",     "conversation people talking"),
            Map.entry("Articles",            "reading books library"),
            Map.entry("Prepositions",        "map directions compass"),
            // Vocab subcategories that benefit from refined keywords
            Map.entry("Exams & Tests",       "exam student studying"),
            Map.entry("Higher Education",    "university campus students"),
            Map.entry("Teaching & Learning", "classroom teacher whiteboard"),
            Map.entry("School Life",         "school children classroom"),
            Map.entry("Rights & Duties",     "justice scales law"),
            Map.entry("Social Issues",       "community people diversity"),
            Map.entry("Crime & Justice",     "courthouse gavel law"),
            Map.entry("AI",                  "artificial intelligence robot"),
            Map.entry("Home Living",         "cozy home interior living room"),
            Map.entry("Body Parts",          "anatomy human body"),
            Map.entry("Physics & Chemistry", "laboratory science experiment"),
            Map.entry("Space & Astronomy",   "galaxy stars space"),
            Map.entry("At the Airport",      "airport terminal airplane"),
            Map.entry("Office Basics",       "modern office desk workspace"),
            Map.entry("Job Hunting",         "job interview resume"),
            Map.entry("Business Terms",      "business meeting corporate"),
            Map.entry("Meetings",            "conference room meeting"),
            Map.entry("Festivals & Traditions", "cultural festival celebration")
    );

    @Override
    @Transactional
    public void run(String... args) {
        seedHubType(HubType.grammar);
        seedHubType(HubType.vocab);
    }

    private void seedHubType(HubType hubType) {
        @SuppressWarnings("unchecked")
        List<Topic> topics = entityManager.createQuery("""
                SELECT t FROM Topic t
                WHERE t.topicGroup.hubType = :hubType
                  AND (t.thumbnail IS NULL OR t.thumbnail = '')
                """)
                .setParameter("hubType", hubType)
                .getResultList();

        if (topics.isEmpty()) {
            log.info("✅ All {} topics already have thumbnails — skipping", hubType);
            return;
        }

        log.info("🖼️ Assigning Pexels images to {} {} topics...", topics.size(), hubType);

        // Cache: reuse images for topics with the same subcategory
        Map<String, String> imageCache = new java.util.HashMap<>();
        int count = 0;

        for (Topic topic : topics) {
            // Use subcategory first, then category as fallback for keyword lookup
            String lookupKey = topic.getSubcategory() != null ? topic.getSubcategory() : topic.getCategory();
            String keyword = KEYWORD_OVERRIDES.getOrDefault(lookupKey,
                    KEYWORD_OVERRIDES.getOrDefault(topic.getCategory(), lookupKey));

            // Reuse cached image for same subcategory to reduce API calls
            // and give visual consistency within subcategory groups
            String imageUrl = imageCache.get(keyword);
            if (imageUrl == null) {
                imageUrl = pexelsService.fetchImage(keyword);
                imageCache.put(keyword, imageUrl);

                // Respect Pexels rate limit (200 req/hr → 1 per 350ms is safe)
                try { Thread.sleep(350); } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }

            topic.setThumbnail(imageUrl);
            topicRepo.save(topic);
            count++;

            log.info("  ✅ [{}] {} → {}", lookupKey, topic.getTitle(),
                    imageUrl.length() > 60 ? imageUrl.substring(0, 60) + "..." : imageUrl);
        }

        log.info("🖼️ Assigned images to {}/{} {} topics", count, topics.size(), hubType);
    }
}
