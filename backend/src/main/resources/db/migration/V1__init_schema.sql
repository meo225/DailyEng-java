-- =============================================
-- V1: Initial schema for DailyEng
-- Generated from JPA entities
-- =============================================

-- ─── Enum Types ─────────────────────────────────────

CREATE TYPE "Level" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');
CREATE TYPE "Role" AS ENUM ('user', 'tutor');
CREATE TYPE "HubType" AS ENUM ('speaking', 'grammar', 'vocab');
CREATE TYPE "StudyGoal" AS ENUM ('casual', 'intermediate', 'fluent', 'conversation', 'travel', 'work', 'exam');
CREATE TYPE "TaskType" AS ENUM ('vocab', 'grammar', 'speaking', 'listening');
CREATE TYPE "NotificationType" AS ENUM ('notebook', 'plan', 'achievement', 'system');
CREATE TYPE "PartOfSpeech" AS ENUM ('noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'interjection', 'phrase');
CREATE TYPE "QuizType" AS ENUM ('multiple-choice', 'fill-blank', 'matching');
CREATE TYPE "LessonType" AS ENUM ('vocabulary', 'translate', 'listening', 'reading', 'writing', 'quiz');
CREATE TYPE "LessonStatus" AS ENUM ('not_started', 'in_progress', 'completed');

-- ─── User & Auth ────────────────────────────────────

CREATE TABLE "User" (
    "id"             VARCHAR(30) PRIMARY KEY,
    "name"           VARCHAR(255) NOT NULL,
    "email"          VARCHAR(255) NOT NULL UNIQUE,
    "emailVerified"  TIMESTAMP,
    "password"       VARCHAR(255),
    "image"          VARCHAR(255),
    "phoneNumber"    VARCHAR(255),
    "dateOfBirth"    TIMESTAMP,
    "gender"         VARCHAR(255),
    "address"        VARCHAR(255),
    "level"          "Level",
    "createdAt"      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Account" (
    "id"                VARCHAR(30) PRIMARY KEY,
    "userId"            VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "type"              VARCHAR(255) NOT NULL,
    "provider"          VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    "refresh_token"     TEXT,
    "access_token"      TEXT,
    "expires_at"        INTEGER,
    "token_type"        VARCHAR(255),
    "scope"             VARCHAR(255),
    "id_token"          TEXT,
    "session_state"     VARCHAR(255),
    UNIQUE ("provider", "providerAccountId")
);

CREATE TABLE "Session" (
    "id"           VARCHAR(30) PRIMARY KEY,
    "sessionToken" VARCHAR(255) NOT NULL UNIQUE,
    "userId"       VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "expires"      TIMESTAMP NOT NULL
);

CREATE TABLE "VerificationToken" (
    "internalId"  SERIAL PRIMARY KEY,
    "identifier"  VARCHAR(255) NOT NULL,
    "token"       VARCHAR(255) NOT NULL,
    "expires"     TIMESTAMP NOT NULL,
    UNIQUE ("identifier", "token")
);

-- ─── Profile & Study ───────────────────────────────

CREATE TABLE "ProfileStats" (
    "id"                   VARCHAR(30) PRIMARY KEY,
    "userId"               VARCHAR(30) NOT NULL UNIQUE REFERENCES "User"("id") ON DELETE CASCADE,
    "xp"                   INTEGER DEFAULT 0,
    "streak"               INTEGER DEFAULT 0,
    "totalLearningMinutes" INTEGER DEFAULT 0,
    "badges"               TEXT[] DEFAULT '{}',
    "coins"                INTEGER DEFAULT 0,
    "vocabScore"           INTEGER DEFAULT 0,
    "grammarScore"         INTEGER DEFAULT 0,
    "speakingScore"        INTEGER DEFAULT 0,
    "listeningScore"       INTEGER DEFAULT 0,
    "readingScore"         INTEGER DEFAULT 0,
    "writingScore"         INTEGER DEFAULT 0,
    "lastStreakDate"       TIMESTAMP
);

CREATE TABLE "StudyPlan" (
    "id"            VARCHAR(30) PRIMARY KEY,
    "userId"        VARCHAR(30) NOT NULL UNIQUE REFERENCES "User"("id") ON DELETE CASCADE,
    "goal"          "StudyGoal" NOT NULL,
    "level"         "Level" NOT NULL,
    "minutesPerDay" INTEGER DEFAULT 0,
    "wordsPerDay"   INTEGER DEFAULT 10,
    "interests"     TEXT[] DEFAULT '{}',
    "preferences"   JSONB,
    "examDate"      TIMESTAMP,
    "createdAt"     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "StudyTask" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "planId"    VARCHAR(30) NOT NULL REFERENCES "StudyPlan"("id") ON DELETE CASCADE,
    "date"      TIMESTAMP NOT NULL,
    "type"      "TaskType" NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE,
    "title"     VARCHAR(255),
    "startTime" VARCHAR(255),
    "endTime"   VARCHAR(255),
    "link"      VARCHAR(255)
);

-- ─── Content: Topics & Groups ──────────────────────

CREATE TABLE "TopicGroup" (
    "id"              VARCHAR(30) PRIMARY KEY,
    "name"            VARCHAR(255) NOT NULL,
    "order"           INTEGER DEFAULT 0,
    "hubType"         "HubType" NOT NULL,
    "subcategories"   TEXT[] DEFAULT '{}',
    UNIQUE ("name", "hubType")
);

CREATE TABLE "Topic" (
    "id"            VARCHAR(30) PRIMARY KEY,
    "title"         VARCHAR(255) NOT NULL,
    "subtitle"      VARCHAR(255),
    "description"   VARCHAR(255) NOT NULL,
    "level"         "Level" NOT NULL,
    "wordCount"     INTEGER DEFAULT 0,
    "estimatedTime" INTEGER DEFAULT 0,
    "thumbnail"     VARCHAR(255),
    "category"      VARCHAR(255),
    "subcategory"   VARCHAR(255),
    "order"         INTEGER DEFAULT 0,
    "topicGroupId"  VARCHAR(30) REFERENCES "TopicGroup"("id") ON DELETE SET NULL
);

-- ─── Content: Vocab ────────────────────────────────

CREATE TABLE "VocabItem" (
    "id"                 VARCHAR(30) PRIMARY KEY,
    "topicId"            VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "word"               VARCHAR(255) NOT NULL,
    "pronunciation"      VARCHAR(255),
    "phonBr"             VARCHAR(255),
    "phonNAm"            VARCHAR(255),
    "meaning"            VARCHAR(255) NOT NULL,
    "vietnameseMeaning"  VARCHAR(255) NOT NULL,
    "partOfSpeech"       "PartOfSpeech" NOT NULL,
    "collocations"       TEXT[] DEFAULT '{}',
    "exampleSentence"    VARCHAR(255) NOT NULL,
    "exampleTranslation" VARCHAR(255) NOT NULL,
    "definitions"        JSONB,
    "synonyms"           TEXT[] DEFAULT '{}',
    "antonyms"           TEXT[] DEFAULT '{}'
);

CREATE TABLE "VocabBookmark" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "topicId"   VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "topicId")
);

CREATE TABLE "UserVocabProgress" (
    "id"           VARCHAR(30) PRIMARY KEY,
    "userId"       VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "vocabItemId"  VARCHAR(30) NOT NULL REFERENCES "VocabItem"("id") ON DELETE CASCADE,
    "masteryLevel" INTEGER DEFAULT 0,
    "lastReviewed" TIMESTAMP,
    "nextReview"   TIMESTAMP,
    "createdAt"    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "vocabItemId")
);

-- ─── Content: Grammar ──────────────────────────────

CREATE TABLE "GrammarNote" (
    "id"          VARCHAR(30) PRIMARY KEY,
    "topicId"     VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "title"       VARCHAR(255) NOT NULL,
    "explanation" TEXT NOT NULL,
    "examples"    JSONB NOT NULL
);

CREATE TABLE "GrammarBookmark" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "topicId"   VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "topicId")
);

-- ─── Content: Quiz, Listening, Reading ─────────────

CREATE TABLE "QuizItem" (
    "id"            VARCHAR(30) PRIMARY KEY,
    "topicId"       VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "question"      VARCHAR(255) NOT NULL,
    "type"          "QuizType" NOT NULL,
    "options"       TEXT[] DEFAULT '{}',
    "correctAnswer" VARCHAR(255) NOT NULL,
    "explanation"   VARCHAR(255) NOT NULL
);

CREATE TABLE "ListeningTask" (
    "id"            VARCHAR(30) PRIMARY KEY,
    "topicId"       VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "type"          VARCHAR(255) NOT NULL,
    "question"      VARCHAR(255) NOT NULL,
    "audioUrl"      VARCHAR(255) NOT NULL,
    "transcript"    TEXT NOT NULL,
    "options"       TEXT[] DEFAULT '{}',
    "correctAnswer" VARCHAR(255) NOT NULL
);

CREATE TABLE "ReadingPassage" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "topicId"   VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "title"     VARCHAR(255) NOT NULL,
    "content"   TEXT NOT NULL,
    "glossary"  JSONB,
    "questions" JSONB
);

-- ─── Speaking ──────────────────────────────────────

CREATE TABLE "SpeakingScenario" (
    "id"             VARCHAR(30) PRIMARY KEY,
    "topicId"        VARCHAR(30) REFERENCES "Topic"("id") ON DELETE SET NULL,
    "title"          VARCHAR(255) NOT NULL,
    "description"    TEXT NOT NULL,
    "goal"           TEXT NOT NULL,
    "difficulty"     "Level",
    "context"        TEXT NOT NULL,
    "category"       VARCHAR(255),
    "subcategory"    VARCHAR(255),
    "image"          VARCHAR(255),
    "objectives"     JSONB,
    "keyExpressions" JSONB,
    "userRole"       VARCHAR(255),
    "botRole"        VARCHAR(255),
    "openingLine"    TEXT,
    "createdById"    VARCHAR(30) REFERENCES "User"("id") ON DELETE SET NULL,
    "isCustom"       BOOLEAN DEFAULT FALSE,
    "topicGroupId"   VARCHAR(30) REFERENCES "TopicGroup"("id") ON DELETE SET NULL
);

CREATE TABLE "SpeakingSession" (
    "id"                 VARCHAR(30) PRIMARY KEY,
    "userId"             VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "scenarioId"         VARCHAR(30) NOT NULL REFERENCES "SpeakingScenario"("id") ON DELETE CASCADE,
    "createdAt"          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "endedAt"            TIMESTAMP,
    "duration"           INTEGER,
    "overallScore"       INTEGER,
    "grammarScore"       INTEGER,
    "relevanceScore"     INTEGER,
    "fluencyScore"       INTEGER,
    "pronunciationScore" INTEGER,
    "intonationScore"    INTEGER,
    "vocabularyScore"    INTEGER,
    "feedbackTitle"      VARCHAR(255),
    "feedbackSummary"    VARCHAR(255),
    "feedbackRating"     VARCHAR(255),
    "feedbackTip"        VARCHAR(255),
    "variationSeed"      INTEGER
);

CREATE TABLE "SpeakingTurn" (
    "id"                  VARCHAR(30) PRIMARY KEY,
    "sessionId"           VARCHAR(30) NOT NULL REFERENCES "SpeakingSession"("id") ON DELETE CASCADE,
    "role"                "Role" NOT NULL,
    "text"                TEXT NOT NULL,
    "audioUrl"            VARCHAR(255),
    "timestamp"           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "pronunciationScore"  INTEGER,
    "fluencyScore"        INTEGER,
    "confidenceScores"    DOUBLE PRECISION[] DEFAULT '{}',
    "wordCount"           INTEGER,
    "speakingDurationMs"  INTEGER,
    "pauseCount"          INTEGER,
    "pitchVariance"       DOUBLE PRECISION,
    "avgPitch"            DOUBLE PRECISION,
    "pitchSamplesCount"   INTEGER,
    "wordAssessmentsJson" JSONB
);

CREATE TABLE "SpeakingTurnError" (
    "id"         VARCHAR(30) PRIMARY KEY,
    "turnId"     VARCHAR(30) NOT NULL REFERENCES "SpeakingTurn"("id") ON DELETE CASCADE,
    "word"       VARCHAR(255) NOT NULL,
    "correction" VARCHAR(255) NOT NULL,
    "errorType"  VARCHAR(255) NOT NULL,
    "startIndex" INTEGER DEFAULT 0,
    "endIndex"   INTEGER DEFAULT 0
);

CREATE TABLE "SpeakingBookmark" (
    "id"         VARCHAR(30) PRIMARY KEY,
    "userId"     VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "scenarioId" VARCHAR(30) NOT NULL REFERENCES "SpeakingScenario"("id") ON DELETE CASCADE,
    "createdAt"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "scenarioId")
);

-- ─── Lessons ───────────────────────────────────────

CREATE TABLE "Lesson" (
    "id"          VARCHAR(30) PRIMARY KEY,
    "topicId"     VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "title"       VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "duration"    VARCHAR(255),
    "type"        "LessonType" NOT NULL,
    "order"       INTEGER DEFAULT 0
);

CREATE TABLE "UserLessonProgress" (
    "id"          VARCHAR(30) PRIMARY KEY,
    "userId"      VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "lessonId"    VARCHAR(30) NOT NULL REFERENCES "Lesson"("id") ON DELETE CASCADE,
    "status"      "LessonStatus" DEFAULT 'not_started',
    "progress"    INTEGER DEFAULT 0,
    "score"       INTEGER,
    "completedAt" TIMESTAMP,
    "updatedAt"   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "lessonId")
);

-- ─── Flashcards ────────────────────────────────────

CREATE TABLE "Flashcard" (
    "id"             VARCHAR(30) PRIMARY KEY,
    "userId"         VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "topicId"        VARCHAR(30),
    "front"          VARCHAR(255) NOT NULL,
    "back"           VARCHAR(255) NOT NULL,
    "createdAt"      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "lastReviewed"   TIMESTAMP,
    "interval"       INTEGER DEFAULT 0,
    "easeFactor"     DOUBLE PRECISION DEFAULT 2.5,
    "repetitions"    INTEGER DEFAULT 0,
    "nextReviewDate" TIMESTAMP
);

-- ─── Notebooks ─────────────────────────────────────

CREATE TABLE "Notebook" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "name"      VARCHAR(255) NOT NULL,
    "type"      VARCHAR(255) NOT NULL,
    "color"     VARCHAR(255) DEFAULT 'primary',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "name")
);

CREATE TABLE "NotebookItem" (
    "id"           VARCHAR(30) PRIMARY KEY,
    "userId"       VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "word"         VARCHAR(255) NOT NULL,
    "pronunciation" VARCHAR(255),
    "meaning"      TEXT[] DEFAULT '{}',
    "vietnamese"   TEXT[] DEFAULT '{}',
    "examples"     JSONB NOT NULL,
    "partOfSpeech" VARCHAR(255),
    "level"        VARCHAR(255),
    "note"         VARCHAR(255),
    "tags"         TEXT[] DEFAULT '{}',
    "notebookId"   VARCHAR(30) NOT NULL REFERENCES "Notebook"("id") ON DELETE CASCADE,
    "masteryLevel" INTEGER DEFAULT 0,
    "isStarred"    BOOLEAN DEFAULT FALSE,
    "lastReviewed" TIMESTAMP,
    "nextReview"   TIMESTAMP,
    "createdAt"    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Progress & Activity ───────────────────────────

CREATE TABLE "UserTopicProgress" (
    "id"       VARCHAR(30) PRIMARY KEY,
    "userId"   VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "topicId"  VARCHAR(30) NOT NULL REFERENCES "Topic"("id") ON DELETE CASCADE,
    "progress" INTEGER DEFAULT 0,
    UNIQUE ("userId", "topicId")
);

CREATE TABLE "UserActivity" (
    "id"            VARCHAR(30) PRIMARY KEY,
    "userId"        VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "date"          DATE NOT NULL,
    "lessonsCount"  INTEGER DEFAULT 0,
    "minutesSpent"  INTEGER DEFAULT 0,
    "wordsLearned"  INTEGER DEFAULT 0,
    "xpEarned"      INTEGER DEFAULT 0,
    UNIQUE ("userId", "date")
);

-- ─── Notifications ─────────────────────────────────

CREATE TABLE "Notification" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "title"     VARCHAR(255) NOT NULL,
    "message"   VARCHAR(255) NOT NULL,
    "type"      "NotificationType" NOT NULL,
    "isRead"    BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Placement Test ────────────────────────────────

CREATE TABLE "PlacementTestResult" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "score"     INTEGER DEFAULT 0,
    "level"     "Level" NOT NULL,
    "breakdown" JSONB,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Feedback ──────────────────────────────────────

CREATE TABLE "Feedback" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) REFERENCES "User"("id") ON DELETE SET NULL,
    "content"   TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Daily Missions ────────────────────────────────

CREATE TABLE "DailyMission" (
    "id"          VARCHAR(30) PRIMARY KEY,
    "title"       VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "points"      INTEGER DEFAULT 0,
    "type"        VARCHAR(255) NOT NULL,
    "requirement" INTEGER DEFAULT 1,
    "isActive"    BOOLEAN DEFAULT TRUE
);

CREATE TABLE "UserDailyMission" (
    "id"          VARCHAR(30) PRIMARY KEY,
    "userId"      VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "missionId"   VARCHAR(30) NOT NULL REFERENCES "DailyMission"("id") ON DELETE CASCADE,
    "progress"    INTEGER DEFAULT 0,
    "completed"   BOOLEAN DEFAULT FALSE,
    "completedAt" TIMESTAMP,
    "date"        DATE,
    UNIQUE ("userId", "missionId", "date")
);

-- ─── Leaderboard ───────────────────────────────────

CREATE TABLE "LeaderboardEntry" (
    "id"        VARCHAR(30) PRIMARY KEY,
    "userId"    VARCHAR(30) NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "period"    VARCHAR(255) NOT NULL,
    "type"      VARCHAR(255) NOT NULL,
    "xp"        INTEGER DEFAULT 0,
    "rank"      INTEGER,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("userId", "period", "type")
);
