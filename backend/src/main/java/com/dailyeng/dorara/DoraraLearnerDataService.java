package com.dailyeng.dorara;
import com.dailyeng.studyplan.StudyPlanRepository;
import com.dailyeng.user.ProfileStatsRepository;
import com.dailyeng.xp.UserActivityRepository;
import com.dailyeng.notebook.NotebookItemRepository;
import com.dailyeng.speaking.SpeakingSessionRepository;

import com.dailyeng.notebook.NotebookItem;
import com.dailyeng.user.ProfileStats;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Gathers user learning data from the database and builds a rich context
 * string that is injected into Dorara's system prompt, making the AI
 * aware of the learner's journey, strengths, and weak areas.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DoraraLearnerDataService {

    private final ProfileStatsRepository profileStatsRepository;
    private final SpeakingSessionRepository speakingSessionRepository;
    private final NotebookItemRepository notebookItemRepository;
    private final UserActivityRepository userActivityRepository;
    private final StudyPlanRepository studyPlanRepository;

    /**
     * Build a multi-section learner context string for the AI system prompt.
     */
    public String buildLearnerContext(String userId, String language) {
        var sb = new StringBuilder();
        sb.append("## Learner Intelligence Report\n\n");

        appendProfileStats(sb, userId);
        appendRecentSpeaking(sb, userId);
        appendNotebookSummary(sb, userId);
        appendTodayActivity(sb, userId);
        appendStudyGoal(sb, userId, language);

        return sb.toString();
    }

    // ── Profile stats ───────────────────────────────────────────────────

    private void appendProfileStats(StringBuilder sb, String userId) {
        profileStatsRepository.findByUserId(userId).ifPresent(stats -> {
            sb.append("### Learning Stats\n");
            sb.append("- XP: %d | Streak: %d days | Total study: %d minutes\n".formatted(
                    stats.getXp(), stats.getStreak(), stats.getTotalLearningMinutes()));
            sb.append("- Skill scores → Vocab: %d, Grammar: %d, Speaking: %d, Listening: %d, Reading: %d, Writing: %d\n".formatted(
                    stats.getVocabScore(), stats.getGrammarScore(), stats.getSpeakingScore(),
                    stats.getListeningScore(), stats.getReadingScore(), stats.getWritingScore()));

            // Identify weakest skill
            var weakest = findWeakestSkill(stats);
            if (weakest != null) {
                sb.append("- ⚠ Weakest skill area: **%s** (score %d) — consider guiding the user here\n".formatted(
                        weakest.name, weakest.score));
            }
            sb.append("\n");
        });
    }

    // ── Recent speaking sessions ────────────────────────────────────────

    private void appendRecentSpeaking(StringBuilder sb, String userId) {
        var recentSessions = speakingSessionRepository
                .findByUserIdAndEndedAtIsNotNull(userId, PageRequest.of(0, 3))
                .getContent();

        if (!recentSessions.isEmpty()) {
            sb.append("### Recent Speaking Practice (last %d sessions)\n".formatted(recentSessions.size()));
            for (var session : recentSessions) {
                var rating = session.getFeedbackRating() != null ? session.getFeedbackRating() : "N/A";
                var grammar = session.getGrammarScore() != null ? session.getGrammarScore() : 0;
                sb.append("- Rating: %s | Grammar: %d/100".formatted(rating, grammar));
                if (session.getFeedbackTip() != null) {
                    sb.append(" | Tip: %s".formatted(session.getFeedbackTip()));
                }
                sb.append("\n");
            }
            sb.append("\n");
        }
    }

    // ── Notebook summary ────────────────────────────────────────────────

    private void appendNotebookSummary(StringBuilder sb, String userId) {
        // Items due for SRS review right now
        var dueItems = notebookItemRepository.findByUserIdAndNextReviewBefore(
                userId, LocalDateTime.now());

        if (!dueItems.isEmpty()) {
            sb.append("### Notebook & SRS\n");
            sb.append("- %d words due for review right now!\n".formatted(dueItems.size()));
            var sampleWords = dueItems.stream()
                    .limit(5)
                    .map(NotebookItem::getWord)
                    .toList();
            sb.append("- Sample due words: %s\n".formatted(String.join(", ", sampleWords)));
            sb.append("\n");
        }
    }

    // ── Today's activity ────────────────────────────────────────────────

    private void appendTodayActivity(StringBuilder sb, String userId) {
        userActivityRepository.findByUserIdAndDate(userId, LocalDate.now()).ifPresent(activity -> {
            sb.append("### Today's Activity\n");
            sb.append("- Minutes studied: %d | Words learned: %d | XP earned: %d\n\n".formatted(
                    activity.getMinutesSpent(), activity.getWordsLearned(), activity.getXpEarned()));
        });
    }

    // ── Study plan goal ─────────────────────────────────────────────────

    private void appendStudyGoal(StringBuilder sb, String userId, String language) {
        studyPlanRepository.findByUserIdAndLanguage(userId, language).ifPresent(plan -> {
            sb.append("### Study Plan\n");
            sb.append("- Goal: %s | Target level: %s | Daily target: %d minutes, %d words/day\n\n".formatted(
                    plan.getGoal(), plan.getLevel(), plan.getMinutesPerDay(), plan.getWordsPerDay()));
        });
    }

    // ── Helpers ─────────────────────────────────────────────────────────

    private record SkillScore(String name, int score) {}

    private SkillScore findWeakestSkill(ProfileStats stats) {
        var skills = List.of(
                new SkillScore("Vocabulary", stats.getVocabScore()),
                new SkillScore("Grammar", stats.getGrammarScore()),
                new SkillScore("Speaking", stats.getSpeakingScore()),
                new SkillScore("Listening", stats.getListeningScore()),
                new SkillScore("Reading", stats.getReadingScore()),
                new SkillScore("Writing", stats.getWritingScore())
        );

        // Only report weakest if there's meaningful data (at least one non-zero)
        boolean hasData = skills.stream().anyMatch(s -> s.score > 0);
        if (!hasData) return null;

        return skills.stream()
                .min((a, b) -> Integer.compare(a.score, b.score))
                .orElse(null);
    }
}
