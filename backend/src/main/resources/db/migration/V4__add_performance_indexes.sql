-- =============================================
-- V4: Add performance indexes
-- Based on Supabase Postgres Best Practices audit
-- Rule 4.2 (FK indexes), 1.3 (composite), 1.5 (partial)
-- =============================================

-- ─── 1. Foreign Key Indexes ──────────────────────────
-- PostgreSQL does NOT auto-index FK columns.
-- Without these, JOINs and ON DELETE CASCADE do full table scans.

CREATE INDEX IF NOT EXISTS idx_account_user_id
    ON "Account" ("userId");

CREATE INDEX IF NOT EXISTS idx_session_user_id
    ON "Session" ("userId");

CREATE INDEX IF NOT EXISTS idx_study_task_plan_id
    ON "StudyTask" ("planId");

CREATE INDEX IF NOT EXISTS idx_topic_topic_group_id
    ON "Topic" ("topicGroupId");

CREATE INDEX IF NOT EXISTS idx_vocab_item_topic_id
    ON "VocabItem" ("topicId");

CREATE INDEX IF NOT EXISTS idx_grammar_note_topic_id
    ON "GrammarNote" ("topicId");

CREATE INDEX IF NOT EXISTS idx_quiz_item_topic_id
    ON "QuizItem" ("topicId");

CREATE INDEX IF NOT EXISTS idx_listening_task_topic_id
    ON "ListeningTask" ("topicId");

CREATE INDEX IF NOT EXISTS idx_reading_passage_topic_id
    ON "ReadingPassage" ("topicId");

CREATE INDEX IF NOT EXISTS idx_speaking_scenario_topic_group_id
    ON "SpeakingScenario" ("topicGroupId");

CREATE INDEX IF NOT EXISTS idx_speaking_scenario_created_by_id
    ON "SpeakingScenario" ("createdById");

CREATE INDEX IF NOT EXISTS idx_speaking_session_user_id
    ON "SpeakingSession" ("userId");

CREATE INDEX IF NOT EXISTS idx_speaking_session_scenario_id
    ON "SpeakingSession" ("scenarioId");

CREATE INDEX IF NOT EXISTS idx_speaking_turn_session_id
    ON "SpeakingTurn" ("sessionId");

CREATE INDEX IF NOT EXISTS idx_speaking_turn_error_turn_id
    ON "SpeakingTurnError" ("turnId");

CREATE INDEX IF NOT EXISTS idx_lesson_topic_id
    ON "Lesson" ("topicId");

CREATE INDEX IF NOT EXISTS idx_flashcard_user_id
    ON "Flashcard" ("userId");

CREATE INDEX IF NOT EXISTS idx_notebook_item_notebook_id
    ON "NotebookItem" ("notebookId");

CREATE INDEX IF NOT EXISTS idx_notebook_item_user_id
    ON "NotebookItem" ("userId");

CREATE INDEX IF NOT EXISTS idx_notification_user_id
    ON "Notification" ("userId");

CREATE INDEX IF NOT EXISTS idx_placement_test_result_user_id
    ON "PlacementTestResult" ("userId");

CREATE INDEX IF NOT EXISTS idx_feedback_user_id
    ON "Feedback" ("userId");

CREATE INDEX IF NOT EXISTS idx_user_daily_mission_mission_id
    ON "UserDailyMission" ("missionId");

-- ─── 2. Composite Indexes ────────────────────────────
-- For multi-column WHERE clauses (equality columns first, range last)

CREATE INDEX IF NOT EXISTS idx_speaking_session_user_ended
    ON "SpeakingSession" ("userId", "endedAt");

CREATE INDEX IF NOT EXISTS idx_speaking_session_user_scenario
    ON "SpeakingSession" ("userId", "scenarioId");

CREATE INDEX IF NOT EXISTS idx_study_task_plan_date
    ON "StudyTask" ("planId", "date");

CREATE INDEX IF NOT EXISTS idx_user_vocab_progress_user_next_review
    ON "UserVocabProgress" ("userId", "nextReview");

CREATE INDEX IF NOT EXISTS idx_user_daily_mission_user_date
    ON "UserDailyMission" ("userId", "date");

CREATE INDEX IF NOT EXISTS idx_notification_user_created
    ON "Notification" ("userId", "createdAt");

CREATE INDEX IF NOT EXISTS idx_notification_user_is_read
    ON "Notification" ("userId", "isRead");

-- ─── 3. Partial Indexes ──────────────────────────────
-- Smaller indexes that only cover relevant rows

CREATE INDEX IF NOT EXISTS idx_flashcard_user_next_review_due
    ON "Flashcard" ("userId", "nextReviewDate")
    WHERE "nextReviewDate" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_speaking_scenario_public
    ON "SpeakingScenario" ("difficulty")
    WHERE "isCustom" = FALSE;
