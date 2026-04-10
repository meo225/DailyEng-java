-- =============================================
-- V11: Add language support + seed Japanese content
-- 1. Add 'language' column with default 'en' to content tables
-- 2. Update unique constraints to include language
-- 3. Seed initial Japanese vocab, grammar, and speaking scenarios
-- =============================================


-- ═══════════════════════════════════════════════════════
-- STEP 1: Schema changes — add 'language' column
-- ═══════════════════════════════════════════════════════

-- TopicGroup
ALTER TABLE "TopicGroup" ADD COLUMN IF NOT EXISTS "language" VARCHAR(10) DEFAULT 'en' NOT NULL;
ALTER TABLE "TopicGroup" DROP CONSTRAINT IF EXISTS "TopicGroup_name_hubType_key";
ALTER TABLE "TopicGroup" ADD CONSTRAINT "TopicGroup_name_hubType_language_key" UNIQUE ("name", "hubType", "language");

-- SpeakingScenario
ALTER TABLE "SpeakingScenario" ADD COLUMN IF NOT EXISTS "language" VARCHAR(10) DEFAULT 'en' NOT NULL;

-- Notebook
ALTER TABLE "Notebook" ADD COLUMN IF NOT EXISTS "language" VARCHAR(10) DEFAULT 'en' NOT NULL;
ALTER TABLE "Notebook" DROP CONSTRAINT IF EXISTS "Notebook_userId_name_key";
ALTER TABLE "Notebook" ADD CONSTRAINT "Notebook_userId_name_language_key" UNIQUE ("userId", "name", "language");

-- StudyPlan
ALTER TABLE "StudyPlan" ADD COLUMN IF NOT EXISTS "language" VARCHAR(10) DEFAULT 'en' NOT NULL;

-- PlacementTestResult
ALTER TABLE "PlacementTestResult" ADD COLUMN IF NOT EXISTS "language" VARCHAR(10) DEFAULT 'en' NOT NULL;


-- ═══════════════════════════════════════════════════════
-- STEP 2: Seed Japanese Vocabulary
-- ═══════════════════════════════════════════════════════

-- TopicGroup: Basic Japanese (vocab)
INSERT INTO "TopicGroup" ("id", "name", "order", "hubType", "language", "subcategories")
VALUES ('ja-vocab-basic', 'Basic Japanese', 1, 'vocab', 'ja', ARRAY['greetings','numbers','daily phrases']::text[])
ON CONFLICT ("name", "hubType", "language") DO NOTHING;

-- Topic: Essential Greetings (挨拶) - A1
INSERT INTO "Topic" ("id", "title", "subtitle", "description", "level", "wordCount", "estimatedTime", "category", "subcategory", "order", "topicGroupId")
VALUES ('ja-greetings-a1', 'Essential Greetings (挨拶)', 'Basic Japanese greetings', 'Learn the most important daily greetings in Japanese.', 'A1', 10, 15, 'Basic Japanese', 'greetings', 0, 'ja-vocab-basic')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "VocabItem" ("id", "topicId", "word", "phonBr", "phonNAm", "meaning", "vietnameseMeaning", "partOfSpeech", "exampleSentence", "exampleTranslation", "synonyms", "antonyms", "collocations") VALUES
('ja-greet-konnichiwa', 'ja-greetings-a1', E'こんにちは (Konnichiwa)', E'/koɴ.ni.tɕi.wa/', E'/koɴ.ni.tɕi.wa/', E'Hello / Good afternoon', E'Xin chào (buổi chiều)', 'phrase', E'こんにちは、お元気ですか？', E'Hello, how are you?', '{}', '{}', ARRAY['daytime greeting']::text[]),
('ja-greet-ohayou', 'ja-greetings-a1', E'おはようございます (Ohayou gozaimasu)', E'/o.ha.joː.ɡo.za.i.ma.sɯ/', E'/o.ha.joː.ɡo.za.i.ma.sɯ/', E'Good morning (polite)', E'Chào buổi sáng (lịch sự)', 'phrase', E'おはようございます、先生。', E'Good morning, teacher.', '{}', '{}', ARRAY['morning greeting']::text[]),
('ja-greet-konbanwa', 'ja-greetings-a1', E'こんばんは (Konbanwa)', E'/koɴ.baɴ.wa/', E'/koɴ.baɴ.wa/', E'Good evening', E'Xin chào buổi tối', 'phrase', E'こんばんは、今日はどうでしたか？', E'Good evening, how was your day?', '{}', '{}', ARRAY['evening greeting']::text[]),
('ja-greet-arigatou', 'ja-greetings-a1', E'ありがとうございます (Arigatou gozaimasu)', E'/a.ɾi.ɡa.toː.ɡo.za.i.ma.sɯ/', E'/a.ɾi.ɡa.toː.ɡo.za.i.ma.sɯ/', E'Thank you very much (polite)', E'Cám ơn rất nhiều (lịch sự)', 'phrase', E'プレゼントをありがとうございます。', E'Thank you very much for the present.', '{}', '{}', ARRAY['polite thanks']::text[]),
('ja-greet-sumimasen', 'ja-greetings-a1', E'すみません (Sumimasen)', E'/sɯ.mi.ma.seɴ/', E'/sɯ.mi.ma.seɴ/', E'Excuse me / I''m sorry', E'Xin lỗi / Xin phép', 'phrase', E'すみません、駅はどこですか？', E'Excuse me, where is the station?', '{}', '{}', ARRAY['apology','getting attention']::text[]),
('ja-greet-sayounara', 'ja-greetings-a1', E'さようなら (Sayounara)', E'/sa.joː.na.ɾa/', E'/sa.joː.na.ɾa/', E'Goodbye (formal)', E'Tạm biệt (trang trọng)', 'phrase', E'さようなら、また明日。', E'Goodbye, see you tomorrow.', '{}', '{}', ARRAY['formal farewell']::text[]),
('ja-greet-hajimemashite', 'ja-greetings-a1', E'はじめまして (Hajimemashite)', E'/ha.dʑi.me.ma.ɕi.te/', E'/ha.dʑi.me.ma.ɕi.te/', E'Nice to meet you (first time)', E'Hân hạnh được gặp (lần đầu)', 'phrase', E'はじめまして、田中です。', E'Nice to meet you, I am Tanaka.', '{}', '{}', ARRAY['first meeting']::text[]),
('ja-greet-onegaishimasu', 'ja-greetings-a1', E'お願いします (Onegaishimasu)', E'/o.ne.ɡa.i.ɕi.ma.sɯ/', E'/o.ne.ɡa.i.ɕi.ma.sɯ/', E'Please (polite request)', E'Xin vui lòng / Làm ơn', 'phrase', E'水をお願いします。', E'Water, please.', '{}', '{}', ARRAY['polite request']::text[]),
('ja-greet-gomen', 'ja-greetings-a1', E'ごめんなさい (Gomen nasai)', E'/ɡo.meɴ.na.sa.i/', E'/ɡo.meɴ.na.sa.i/', E'I''m sorry (apology)', E'Xin lỗi (xin tha thứ)', 'phrase', E'遅くなってごめんなさい。', E'I''m sorry for being late.', '{}', '{}', ARRAY['apology']::text[]),
('ja-greet-ittekimasu', 'ja-greetings-a1', E'行ってきます (Ittekimasu)', E'/it.te.ki.ma.sɯ/', E'/it.te.ki.ma.sɯ/', E'I''m leaving (said when going out)', E'Tôi đi đây (nói khi ra khỏi nhà)', 'phrase', E'行ってきます！', E'I''m heading out!', '{}', '{}', ARRAY['leaving home']::text[])
ON CONFLICT ("id") DO NOTHING;

-- Topic: Numbers & Counting (数字) - A1
INSERT INTO "Topic" ("id", "title", "subtitle", "description", "level", "wordCount", "estimatedTime", "category", "subcategory", "order", "topicGroupId")
VALUES ('ja-numbers-a1', 'Numbers & Counting (数字)', 'Japanese number system', 'Learn to count and use numbers in Japanese.', 'A1', 10, 15, 'Basic Japanese', 'numbers', 1, 'ja-vocab-basic')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "VocabItem" ("id", "topicId", "word", "phonBr", "phonNAm", "meaning", "vietnameseMeaning", "partOfSpeech", "exampleSentence", "exampleTranslation", "synonyms", "antonyms", "collocations") VALUES
('ja-num-ichi', 'ja-numbers-a1', E'一 (Ichi)', E'/i.tɕi/', E'/i.tɕi/', E'One', E'Một', 'noun', E'一つください。', E'One, please.', '{}', '{}', ARRAY['counting']::text[]),
('ja-num-ni', 'ja-numbers-a1', E'二 (Ni)', E'/ni/', E'/ni/', E'Two', E'Hai', 'noun', E'二人います。', E'There are two people.', '{}', '{}', ARRAY['counting']::text[]),
('ja-num-san', 'ja-numbers-a1', E'三 (San)', E'/saɴ/', E'/saɴ/', E'Three', E'Ba', 'noun', E'三時に会いましょう。', E'Let''s meet at three o''clock.', '{}', '{}', ARRAY['counting','time']::text[]),
('ja-num-yon', 'ja-numbers-a1', E'四 (Yon/Shi)', E'/joɴ/', E'/joɴ/', E'Four', E'Bốn', 'noun', E'四月は春です。', E'April is spring.', '{}', '{}', ARRAY['counting','months']::text[]),
('ja-num-go', 'ja-numbers-a1', E'五 (Go)', E'/ɡo/', E'/ɡo/', E'Five', E'Năm', 'noun', E'五分待ってください。', E'Please wait five minutes.', '{}', '{}', ARRAY['counting','time']::text[]),
('ja-num-roku', 'ja-numbers-a1', E'六 (Roku)', E'/ɾo.kɯ/', E'/ɾo.kɯ/', E'Six', E'Sáu', 'noun', E'六時に起きます。', E'I wake up at six o''clock.', '{}', '{}', ARRAY['counting','time']::text[]),
('ja-num-nana', 'ja-numbers-a1', E'七 (Nana/Shichi)', E'/na.na/', E'/na.na/', E'Seven', E'Bảy', 'noun', E'七月は暑いです。', E'July is hot.', '{}', '{}', ARRAY['counting','months']::text[]),
('ja-num-hachi', 'ja-numbers-a1', E'八 (Hachi)', E'/ha.tɕi/', E'/ha.tɕi/', E'Eight', E'Tám', 'noun', E'八百円です。', E'It''s 800 yen.', '{}', '{}', ARRAY['counting','price']::text[]),
('ja-num-kyuu', 'ja-numbers-a1', E'九 (Kyuu/Ku)', E'/kjɯː/', E'/kjɯː/', E'Nine', E'Chín', 'noun', E'九月に日本へ行きます。', E'I''m going to Japan in September.', '{}', '{}', ARRAY['counting','months']::text[]),
('ja-num-juu', 'ja-numbers-a1', E'十 (Juu)', E'/dʑɯː/', E'/dʑɯː/', E'Ten', E'Mười', 'noun', E'十個あります。', E'There are ten.', '{}', '{}', ARRAY['counting']::text[])
ON CONFLICT ("id") DO NOTHING;

-- Topic: Daily Phrases (日常フレーズ) - A1
INSERT INTO "Topic" ("id", "title", "subtitle", "description", "level", "wordCount", "estimatedTime", "category", "subcategory", "order", "topicGroupId")
VALUES ('ja-daily-phrases-a1', 'Daily Phrases (日常フレーズ)', 'Everyday Japanese expressions', 'Learn essential expressions used in daily life in Japan.', 'A1', 10, 15, 'Basic Japanese', 'daily phrases', 2, 'ja-vocab-basic')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "VocabItem" ("id", "topicId", "word", "phonBr", "phonNAm", "meaning", "vietnameseMeaning", "partOfSpeech", "exampleSentence", "exampleTranslation", "synonyms", "antonyms", "collocations") VALUES
('ja-daily-hai', 'ja-daily-phrases-a1', E'はい (Hai)', E'/ha.i/', E'/ha.i/', E'Yes', E'Vâng / Dạ', 'phrase', E'はい、そうです。', E'Yes, that''s right.', '{}', '{}', ARRAY['affirmation']::text[]),
('ja-daily-iie', 'ja-daily-phrases-a1', E'いいえ (Iie)', E'/iː.e/', E'/iː.e/', E'No', E'Không', 'phrase', E'いいえ、違います。', E'No, that''s not right.', '{}', '{}', ARRAY['negation']::text[]),
('ja-daily-daijobu', 'ja-daily-phrases-a1', E'大丈夫 (Daijoubu)', E'/da.i.dʑoː.bɯ/', E'/da.i.dʑoː.bɯ/', E'It''s OK / I''m fine', E'Không sao / Ổn mà', 'phrase', E'大丈夫ですか？', E'Are you OK?', '{}', '{}', ARRAY['reassurance']::text[]),
('ja-daily-wakarimasen', 'ja-daily-phrases-a1', E'わかりません (Wakarimasen)', E'/wa.ka.ɾi.ma.seɴ/', E'/wa.ka.ɾi.ma.seɴ/', E'I don''t understand', E'Tôi không hiểu', 'phrase', E'すみません、わかりません。', E'I''m sorry, I don''t understand.', '{}', '{}', ARRAY['comprehension']::text[]),
('ja-daily-ikura', 'ja-daily-phrases-a1', E'いくらですか (Ikura desu ka)', E'/i.kɯ.ɾa.de.sɯ.ka/', E'/i.kɯ.ɾa.de.sɯ.ka/', E'How much is it?', E'Bao nhiêu tiền?', 'phrase', E'これはいくらですか？', E'How much is this?', '{}', '{}', ARRAY['shopping','price']::text[]),
('ja-daily-oishii', 'ja-daily-phrases-a1', E'おいしい (Oishii)', E'/o.i.ɕiː/', E'/o.i.ɕiː/', E'Delicious', E'Ngon', 'adjective', E'このラーメンはおいしいです。', E'This ramen is delicious.', '{}', '{}', ARRAY['food','compliment']::text[]),
('ja-daily-kawaii', 'ja-daily-phrases-a1', E'かわいい (Kawaii)', E'/ka.wa.iː/', E'/ka.wa.iː/', E'Cute', E'Dễ thương', 'adjective', E'この猫はかわいいです。', E'This cat is cute.', '{}', '{}', ARRAY['compliment']::text[]),
('ja-daily-sugoi', 'ja-daily-phrases-a1', E'すごい (Sugoi)', E'/sɯ.ɡo.i/', E'/sɯ.ɡo.i/', E'Amazing / Wow', E'Tuyệt vời / Wow', 'adjective', E'すごい！上手ですね。', E'Amazing! You''re good at it.', '{}', '{}', ARRAY['exclamation']::text[]),
('ja-daily-tabemasu', 'ja-daily-phrases-a1', E'食べます (Tabemasu)', E'/ta.be.ma.sɯ/', E'/ta.be.ma.sɯ/', E'To eat (polite)', E'Ăn (lịch sự)', 'verb', E'昼ごはんを食べます。', E'I eat lunch.', '{}', '{}', ARRAY['dining','daily activity']::text[]),
('ja-daily-nomimasu', 'ja-daily-phrases-a1', E'飲みます (Nomimasu)', E'/no.mi.ma.sɯ/', E'/no.mi.ma.sɯ/', E'To drink (polite)', E'Uống (lịch sự)', 'verb', E'お茶を飲みます。', E'I drink tea.', '{}', '{}', ARRAY['dining','daily activity']::text[])
ON CONFLICT ("id") DO NOTHING;


-- ═══════════════════════════════════════════════════════
-- STEP 3: Seed Japanese Grammar
-- ═══════════════════════════════════════════════════════

-- TopicGroup: Basic Particles (grammar)
INSERT INTO "TopicGroup" ("id", "name", "order", "hubType", "language", "subcategories")
VALUES ('ja-grammar-particles', 'Basic Particles (助詞)', 1, 'grammar', 'ja', ARRAY['subject markers','object markers','direction markers']::text[])
ON CONFLICT ("name", "hubType", "language") DO NOTHING;

-- Topic: Subject & Topic Markers - A1
INSERT INTO "Topic" ("id", "title", "subtitle", "description", "level", "wordCount", "estimatedTime", "category", "subcategory", "order", "topicGroupId")
VALUES ('ja-particles-subject-a1', 'Subject & Topic Markers (は・が)', 'は (wa) and が (ga)', 'Learn the difference between は and が, the two most important Japanese particles.', 'A1', 0, 20, 'Basic Particles', 'subject markers', 0, 'ja-grammar-particles')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "GrammarNote" ("id", "topicId", "title", "explanation", "examples") VALUES
('ja-gn-wa-particle', 'ja-particles-subject-a1', 'Topic Marker は (wa)',
 'The particle は (written as は but pronounced "wa") marks the topic of a sentence — what you are talking about. It sets the context for the rest of the sentence. Think of it as "As for X..." Example: 私は学生です (Watashi wa gakusei desu) = As for me, I am a student.',
 '["私は田中です。(Watashi wa Tanaka desu.) — I am Tanaka.", "今日は暑いです。(Kyou wa atsui desu.) — Today is hot.", "これは本です。(Kore wa hon desu.) — This is a book."]'::jsonb),
('ja-gn-ga-particle', 'ja-particles-subject-a1', 'Subject Marker が (ga)',
 'The particle が marks the grammatical subject — who or what performs the action. Use が when introducing new information or answering "who/what" questions. Example: 誰が来ましたか？(Dare ga kimashita ka?) = Who came?',
 '["猫がいます。(Neko ga imasu.) — There is a cat.", "雨が降っています。(Ame ga futte imasu.) — It is raining.", "私が行きます。(Watashi ga ikimasu.) — I will go (emphasis on I)."]'::jsonb)
ON CONFLICT ("id") DO NOTHING;

-- Topic: Object & Direction Markers - A1
INSERT INTO "Topic" ("id", "title", "subtitle", "description", "level", "wordCount", "estimatedTime", "category", "subcategory", "order", "topicGroupId")
VALUES ('ja-particles-object-a1', 'Object & Direction Markers (を・に・へ)', 'を (wo), に (ni), へ (e)', 'Learn particles for marking objects and directions in Japanese sentences.', 'A1', 0, 20, 'Basic Particles', 'object markers', 1, 'ja-grammar-particles')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "GrammarNote" ("id", "topicId", "title", "explanation", "examples") VALUES
('ja-gn-wo-particle', 'ja-particles-object-a1', 'Object Marker を (wo)',
 'The particle を (pronounced "o") marks the direct object of a verb — the thing that receives the action. Example: りんごを食べます (Ringo wo tabemasu) = I eat an apple.',
 '["水を飲みます。(Mizu wo nomimasu.) — I drink water.", "本を読みます。(Hon wo yomimasu.) — I read a book.", "映画を見ます。(Eiga wo mimasu.) — I watch a movie."]'::jsonb),
('ja-gn-ni-particle', 'ja-particles-object-a1', 'Direction/Location Marker に (ni)',
 'The particle に indicates a destination, time, or location of existence. Example: 学校に行きます (Gakkou ni ikimasu) = I go to school.',
 '["東京に住んでいます。(Tokyo ni sunde imasu.) — I live in Tokyo.", "七時に起きます。(Shichi-ji ni okimasu.) — I wake up at 7.", "ここに座ってください。(Koko ni suwatte kudasai.) — Please sit here."]'::jsonb)
ON CONFLICT ("id") DO NOTHING;


-- ═══════════════════════════════════════════════════════
-- STEP 4: Seed Japanese Speaking Scenarios
-- ═══════════════════════════════════════════════════════

-- TopicGroup: Daily Life Speaking (speaking)
INSERT INTO "TopicGroup" ("id", "name", "order", "hubType", "language", "subcategories")
VALUES ('ja-speaking-daily', 'Daily Life (日常生活)', 1, 'speaking', 'ja', ARRAY['introductions','shopping','dining','transportation']::text[])
ON CONFLICT ("name", "hubType", "language") DO NOTHING;

-- Scenario: Self Introduction (自己紹介)
INSERT INTO "SpeakingScenario" ("id", "topicGroupId", "language", "category", "subcategory", "difficulty", "title", "description", "goal", "context", "userRole", "botRole", "openingLine", "objectives", "image", "isCustom") VALUES
('ja-speak-intro-a1', 'ja-speaking-daily', 'ja', 'Daily Life', 'introductions', 'A1',
 'Self Introduction (自己紹介)',
 'Introduce yourself to a new colleague at a Japanese office.',
 'Successfully exchange names, nationalities, and occupations in Japanese.',
 'You are meeting a new colleague at the office in Tokyo on your first day. Practice introducing yourself using polite Japanese.',
 'New Employee', 'Japanese Colleague',
 'はじめまして。私は佐藤です。よろしくお願いします。(Nice to meet you. I am Sato. Please take care of me.)',
 '["Say はじめまして (Hajimemashite)", "Introduce your name using ～です", "Say where you are from using ～から来ました", "End with よろしくお願いします"]'::jsonb,
 '/learning.png', false)
ON CONFLICT ("id") DO NOTHING;

-- Scenario: Ordering at a Restaurant (レストランで注文する)
INSERT INTO "SpeakingScenario" ("id", "topicGroupId", "language", "category", "subcategory", "difficulty", "title", "description", "goal", "context", "userRole", "botRole", "openingLine", "objectives", "image", "isCustom") VALUES
('ja-speak-restaurant-a1', 'ja-speaking-daily', 'ja', 'Daily Life', 'dining', 'A1',
 'Ordering at a Restaurant (レストランで注文)',
 'Order food at a Japanese restaurant using basic phrases.',
 'Successfully order a meal and drink at a Japanese restaurant.',
 'You are at a casual Japanese restaurant. The waiter is ready to take your order. Use polite Japanese to order.',
 'Customer', 'Waiter (ウェイター)',
 'いらっしゃいませ！何名様ですか？(Welcome! How many people?)',
 '["Say how many people: ～人です", "Order food using ～をください", "Ask about recommendations: おすすめは何ですか？", "Say thank you: ありがとうございます"]'::jsonb,
 '/learning.png', false)
ON CONFLICT ("id") DO NOTHING;

-- Scenario: Asking for Directions (道を聞く)
INSERT INTO "SpeakingScenario" ("id", "topicGroupId", "language", "category", "subcategory", "difficulty", "title", "description", "goal", "context", "userRole", "botRole", "openingLine", "objectives", "image", "isCustom") VALUES
('ja-speak-directions-a2', 'ja-speaking-daily', 'ja', 'Daily Life', 'transportation', 'A2',
 'Asking for Directions (道を聞く)',
 'Ask for and understand directions in Japanese.',
 'Successfully ask for directions and understand basic responses.',
 'You are lost in Tokyo and need to find the nearest train station. You approach a local person for help.',
 'Tourist', 'Local Person (地元の人)',
 'こんにちは。何かお手伝いしましょうか？(Hello. Can I help you with something?)',
 '["Ask where the station is: 駅はどこですか？", "Understand directions: まっすぐ (straight), 右 (right), 左 (left)", "Ask about distance: どのくらいかかりますか？", "Thank them: どうもありがとうございます"]'::jsonb,
 '/learning.png', false)
ON CONFLICT ("id") DO NOTHING;

-- Scenario: Shopping at a Convenience Store (コンビニで買い物)
INSERT INTO "SpeakingScenario" ("id", "topicGroupId", "language", "category", "subcategory", "difficulty", "title", "description", "goal", "context", "userRole", "botRole", "openingLine", "objectives", "image", "isCustom") VALUES
('ja-speak-shopping-a1', 'ja-speaking-daily', 'ja', 'Daily Life', 'shopping', 'A1',
 'Shopping at a Convenience Store (コンビニで買い物)',
 'Buy items at a Japanese convenience store.',
 'Successfully find items, ask about prices, and complete a purchase in Japanese.',
 'You are at a convenience store (konbini) in Japan and need to buy a few items. The cashier speaks polite Japanese.',
 'Customer', 'Cashier (店員)',
 'いらっしゃいませ！(Welcome!)',
 '["Ask where an item is: ～はどこですか？", "Ask the price: いくらですか？", "Say you want to buy it: これをください", "Handle payment: カードで払えますか？"]'::jsonb,
 '/learning.png', false)
ON CONFLICT ("id") DO NOTHING;
