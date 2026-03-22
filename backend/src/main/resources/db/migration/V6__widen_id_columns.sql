-- =============================================
-- V6: Widen VARCHAR(30) ID columns to VARCHAR(100)
-- The seed data uses composite IDs (e.g. "arts-and-culture-festivals-and-traditions-c2-reverberate")
-- that exceed the original 30-character limit.
-- =============================================

-- TopicGroup
ALTER TABLE "TopicGroup" ALTER COLUMN "id" TYPE VARCHAR(100);

-- Topic (PK + FK to TopicGroup)
ALTER TABLE "Topic" ALTER COLUMN "id" TYPE VARCHAR(100);
ALTER TABLE "Topic" ALTER COLUMN "topicGroupId" TYPE VARCHAR(100);

-- VocabItem (PK + FK to Topic)
ALTER TABLE "VocabItem" ALTER COLUMN "id" TYPE VARCHAR(100);
ALTER TABLE "VocabItem" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- VocabBookmark (FK to Topic)
ALTER TABLE "VocabBookmark" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- UserVocabProgress (FK to VocabItem)
ALTER TABLE "UserVocabProgress" ALTER COLUMN "vocabItemId" TYPE VARCHAR(100);

-- GrammarNote (FK to Topic)
ALTER TABLE "GrammarNote" ALTER COLUMN "id" TYPE VARCHAR(100);
ALTER TABLE "GrammarNote" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- GrammarBookmark (FK to Topic)
ALTER TABLE "GrammarBookmark" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- QuizItem (FK to Topic)
ALTER TABLE "QuizItem" ALTER COLUMN "id" TYPE VARCHAR(100);
ALTER TABLE "QuizItem" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- ListeningTask (FK to Topic)
ALTER TABLE "ListeningTask" ALTER COLUMN "id" TYPE VARCHAR(100);
ALTER TABLE "ListeningTask" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- ReadingPassage (FK to Topic)
ALTER TABLE "ReadingPassage" ALTER COLUMN "id" TYPE VARCHAR(100);
ALTER TABLE "ReadingPassage" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- SpeakingScenario (FK to Topic, TopicGroup)
ALTER TABLE "SpeakingScenario" ALTER COLUMN "topicId" TYPE VARCHAR(100);
ALTER TABLE "SpeakingScenario" ALTER COLUMN "topicGroupId" TYPE VARCHAR(100);

-- Lesson (FK to Topic)
ALTER TABLE "Lesson" ALTER COLUMN "topicId" TYPE VARCHAR(100);

-- UserTopicProgress (FK to Topic)
ALTER TABLE "UserTopicProgress" ALTER COLUMN "topicId" TYPE VARCHAR(100);
