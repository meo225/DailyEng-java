package com.dailyeng.dorara;
import com.dailyeng.user.User;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link DoraraContext}.
 * Pure static method tests — no Spring context or mocks needed.
 */
class DoraraContextTest {

    @Test
    @DisplayName("buildSystemInstruction includes user name and level")
    void includesUserInfo() {
        String result = DoraraContext.buildSystemInstruction(
                "Alice", "B2", "Home Page", "");
        assertTrue(result.contains("Alice"), "Should contain user name");
        assertTrue(result.contains("B2"), "Should contain level");
        assertTrue(result.contains("Home Page"), "Should contain page description");
    }

    @Test
    @DisplayName("handles null name gracefully (defaults to 'User')")
    void nullNameDefaultsToUser() {
        String result = DoraraContext.buildSystemInstruction(
                null, "A1", "Vocab Page", "");
        assertTrue(result.contains("- Name: User"), "Null name should default to 'User' in user context");
    }

    @Test
    @DisplayName("handles null level gracefully (defaults to 'Not determined')")
    void nullLevelDefaultsToNotDetermined() {
        String result = DoraraContext.buildSystemInstruction(
                "Bob", null, "Grammar Page", "");
        assertTrue(result.contains("Not determined"), "Null level should default to 'Not determined'");
    }

    @Test
    @DisplayName("handles literal 'null' level string")
    void literalNullLevel() {
        String result = DoraraContext.buildSystemInstruction(
                "Bob", "null", "Page", "");
        assertTrue(result.contains("Not determined"), "Literal 'null' should be treated as unknown");
    }

    @Test
    @DisplayName("includes Dorara role instructions")
    void includesDororaRole() {
        String result = DoraraContext.buildSystemInstruction(
                "Test", "A1", "Home", "");
        assertTrue(result.contains("You are Dorara"), "Should include Dorara's role");
        assertTrue(result.contains("suggestedActions"), "Should include JSON output format");
    }

    @Test
    @DisplayName("includes DailyEng context")
    void includesDailyEngContext() {
        String result = DoraraContext.buildSystemInstruction(
                "Test", "A1", "Home", "");
        assertTrue(result.contains("DailyEng"), "Should include app context");
        assertTrue(result.contains("Speaking Practice"), "Should include feature descriptions");
    }

    @Test
    @DisplayName("includes learner context when provided")
    void includesLearnerContext() {
        String learnerCtx = "## Learner Intelligence Report\n- XP: 1500";
        String result = DoraraContext.buildSystemInstruction(
                "Test", "B1", "Home", learnerCtx);
        assertTrue(result.contains("Learner Intelligence Report"), "Should include learner context");
        assertTrue(result.contains("XP: 1500"), "Should include learner data");
    }

    @Test
    @DisplayName("omits learner context when blank")
    void omitsBlankLearnerContext() {
        String withCtx = DoraraContext.buildSystemInstruction(
                "Test", "B1", "Home", "some context");
        String without = DoraraContext.buildSystemInstruction(
                "Test", "B1", "Home", "   ");
        assertTrue(withCtx.length() > without.length(),
                "Non-blank context should make output longer");
    }

    @Test
    @DisplayName("includes final reminders")
    void includesFinalReminders() {
        String result = DoraraContext.buildSystemInstruction(
                "Test", "A1", "Home", "");
        assertTrue(result.contains("FINAL REMINDERS"), "Should include final instructions");
        assertTrue(result.contains("valid JSON"), "Should remind about JSON output");
    }
}
