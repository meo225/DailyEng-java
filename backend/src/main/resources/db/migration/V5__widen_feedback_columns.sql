-- =============================================
-- V5: Widen feedback columns from VARCHAR(255) to TEXT
-- Gemini-generated feedback frequently exceeds 255 characters
-- =============================================

ALTER TABLE "SpeakingSession" ALTER COLUMN "feedbackTitle"   TYPE TEXT;
ALTER TABLE "SpeakingSession" ALTER COLUMN "feedbackSummary" TYPE TEXT;
ALTER TABLE "SpeakingSession" ALTER COLUMN "feedbackRating"  TYPE TEXT;
ALTER TABLE "SpeakingSession" ALTER COLUMN "feedbackTip"     TYPE TEXT;
