-- Rename assessment score columns (idempotent — safe to re-run)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingSession' AND column_name='pronunciationScore') THEN
        ALTER TABLE "SpeakingSession" RENAME COLUMN "pronunciationScore" TO "accuracyScore";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingSession' AND column_name='intonationScore') THEN
        ALTER TABLE "SpeakingSession" RENAME COLUMN "intonationScore" TO "prosodyScore";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingSession' AND column_name='relevanceScore') THEN
        ALTER TABLE "SpeakingSession" RENAME COLUMN "relevanceScore" TO "topicScore";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingTurn' AND column_name='pronunciationScore') THEN
        ALTER TABLE "SpeakingTurn" RENAME COLUMN "pronunciationScore" TO "accuracyScore";
    END IF;
END $$;
