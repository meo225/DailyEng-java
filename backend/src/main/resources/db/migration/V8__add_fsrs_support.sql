-- =============================================
-- V8: Add FSRS (Free Spaced Repetition Scheduler) support
-- Adds per-card SRS state to UserVocabProgress,
-- per-user FSRS weights to ProfileStats,
-- and ReviewLog table for optimizer training data.
-- =============================================

-- 1) Add FSRS columns to UserVocabProgress
ALTER TABLE "UserVocabProgress"
    ADD COLUMN IF NOT EXISTS "stability"   DOUBLE PRECISION DEFAULT 0.0,
    ADD COLUMN IF NOT EXISTS "difficulty"  DOUBLE PRECISION DEFAULT 5.0,
    ADD COLUMN IF NOT EXISTS "repetitions" INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "lapses"      INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "srsState"    VARCHAR(20) DEFAULT 'NEW';

-- 2) Add FSRS weights to ProfileStats (JSONB array of 17 doubles, null = use defaults)
ALTER TABLE "ProfileStats"
    ADD COLUMN IF NOT EXISTS "fsrsWeights" JSONB;

-- 3) Create ReviewLog table for FSRS weight optimization
CREATE TABLE IF NOT EXISTS "ReviewLog" (
    "id"             VARCHAR(30) PRIMARY KEY,
    "userId"         VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "vocabItemId"    VARCHAR(100) NOT NULL REFERENCES "VocabItem"("id") ON DELETE CASCADE,
    "rating"         INTEGER NOT NULL,
    "elapsedDays"    DOUBLE PRECISION DEFAULT 0,
    "stability"      DOUBLE PRECISION DEFAULT 0,
    "difficulty"     DOUBLE PRECISION DEFAULT 0,
    "state"          VARCHAR(20),
    "newStability"   DOUBLE PRECISION DEFAULT 0,
    "newDifficulty"  DOUBLE PRECISION DEFAULT 0,
    "createdAt"      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_review_log_user ON "ReviewLog" ("userId");
