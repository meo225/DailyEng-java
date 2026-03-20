-- Reconcile Prisma-created schema with Spring Boot JPA entities (idempotent)
DO $$
BEGIN
    -- SpeakingSession renames (if not already done by V2)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingSession' AND column_name='pronunciationScore') THEN
        ALTER TABLE "SpeakingSession" RENAME COLUMN "pronunciationScore" TO "accuracyScore";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingSession' AND column_name='intonationScore') THEN
        ALTER TABLE "SpeakingSession" RENAME COLUMN "intonationScore" TO "prosodyScore";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingSession' AND column_name='relevanceScore') THEN
        ALTER TABLE "SpeakingSession" RENAME COLUMN "relevanceScore" TO "topicScore";
    END IF;

    -- SpeakingTurn rename
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SpeakingTurn' AND column_name='pronunciationScore') THEN
        ALTER TABLE "SpeakingTurn" RENAME COLUMN "pronunciationScore" TO "accuracyScore";
    END IF;
END $$;

-- Add wordAssessmentsJson (exists in JPA entity, not in Prisma schema)
ALTER TABLE "SpeakingTurn" ADD COLUMN IF NOT EXISTS "wordAssessmentsJson" JSONB;

-- Add internalId to VerificationToken (JPA @Id @GeneratedValue)
ALTER TABLE "VerificationToken" ADD COLUMN IF NOT EXISTS "internalId" SERIAL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_name = 'VerificationToken' AND constraint_type = 'PRIMARY KEY'
    ) THEN
        ALTER TABLE "VerificationToken" ADD PRIMARY KEY ("internalId");
    END IF;
END $$;
