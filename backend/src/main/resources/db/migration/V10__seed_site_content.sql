-- =============================================
-- V10: Site Content CMS table + seed data
-- Stores FAQs, reviews, stats, benefits, grammar samples
-- =============================================

CREATE TABLE "SiteContent" (
    "id"          VARCHAR(30) PRIMARY KEY,
    "contentKey"  VARCHAR(100) NOT NULL UNIQUE,
    "content"     JSONB NOT NULL
);

-- ═══ FAQs ═══
INSERT INTO "SiteContent" ("id", "contentKey", "content")
VALUES ('sc-faqs', 'faqs', '[
    {"question":"How does the spaced repetition system work?","answer":"Our SRS uses the FSRS algorithm to optimize your learning. Cards are reviewed at increasing intervals based on how well you remember them. Rate your recall from ''Again'' to ''Perfect'' to adjust the next review date."},
    {"question":"Can I create my own topics?","answer":"Yes! Click ''Create with AI'' in the Vocabulary Hub to create custom topics. You can also create custom speaking scenarios in the Speaking Room."},
    {"question":"How are my speaking sessions scored?","answer":"Your speaking is evaluated on four criteria: Pronunciation (accent and sound clarity), Fluency (speed and smoothness), Grammar (correct sentence structure), and Content (relevance and completeness)."},
    {"question":"What do the different learning levels mean?","answer":"A1-A2 are beginner levels, B1-B2 are intermediate. Choose your level during onboarding to get personalized content."},
    {"question":"How can I maintain my streak?","answer":"Complete at least one task per day to maintain your streak. Your daily tasks are customized based on your study plan."},
    {"question":"Is my data saved?","answer":"Yes, your progress is securely saved in our database. Your flashcards, speaking sessions, and study plan are all preserved across devices."}
]'::jsonb)
ON CONFLICT ("id") DO NOTHING;

-- ═══ Sign In Stats ═══
INSERT INTO "SiteContent" ("id", "contentKey", "content")
VALUES ('sc-signin-stats', 'signin_stats', '[
    {"value":"50K+","label":"Active Learners"},
    {"value":"1000+","label":"Lessons"},
    {"value":"4.9","label":"User Rating"}
]'::jsonb)
ON CONFLICT ("id") DO NOTHING;

-- ═══ Sign Up Benefits ═══
INSERT INTO "SiteContent" ("id", "contentKey", "content")
VALUES ('sc-signup-benefits', 'signup_benefits', '[
    "Access to 1000+ interactive lessons",
    "AI-powered speaking practice",
    "Personalized learning paths",
    "Progress tracking & analytics",
    "Vocabulary builder with spaced repetition"
]'::jsonb)
ON CONFLICT ("id") DO NOTHING;

-- ═══ Reviews / Testimonials ═══
INSERT INTO "SiteContent" ("id", "contentKey", "content")
VALUES ('sc-reviews', 'reviews', '[
    {"name":"Alex Nguyen","avatar":"/avatars/alex.png","ielts":"IELTS 7.5","content":"DailyEng really helped me improve my speaking confidence. The AI tutor Dorara feels just like a real person!","direction":"Academic","fullFeedback":"Before using DailyEng, I was very shy when speaking English. The virtual speaking room and personalized study plan not only guided me on what to learn each day but also gave me instant feedback on my pronunciation. I eventually achieved IELTS 7.5 in my recent exam. Highly recommended!","courses":["IELTS Speaking Mastery","Advanced Grammar"],"result":{"type":"IELTS","score":"7.5","previousScore":"6.0"},"duration":"3 months","photo":"/reviews/alex-result.png"},
    {"name":"Mai Le","avatar":"/avatars/mai.png","ielts":"TOEIC 900","content":"The vocabulary hub is amazing. I learned so many new words without feeling overwhelmed.","direction":"General","fullFeedback":"As a working professional, I didn''t have much time to study. DailyEng broke everything down into bite-sized lessons. The smart spaced repetition system helped me remember vocabulary perfectly. I reached my target TOEIC score much faster than expected.","courses":["Business English","Toeic 800+"],"result":{"type":"TOEIC","score":"900","previousScore":"650"},"duration":"2 months","photo":"/reviews/mai-result.png"},
    {"name":"Tuan Vu","avatar":"/avatars/tuan.png","ielts":"IELTS 8.0","content":"A game changer! The learning profile tracking kept me motivated every single day.","direction":"Academic","fullFeedback":"I''ve tried many apps but DailyEng is by far the most comprehensive. From grammar to speaking, everything is well structured. Dorara AI is incredibly smart and points out my mistakes without making me feel bad. I wouldn''t have reached 8.0 without this platform.","courses":["Intensive Speaking","Academic Writing"],"result":{"type":"IELTS","score":"8.0","previousScore":"7.0"},"duration":"4 months","photo":"/reviews/tuan-result.png"}
]'::jsonb)
ON CONFLICT ("id") DO NOTHING;

-- ═══ Notebook Sample Grammar ═══
INSERT INTO "SiteContent" ("id", "contentKey", "content")
VALUES ('sc-grammar-samples', 'grammar_samples', '[
    {"id":"g1","title":"Present Perfect Tense","rule":"Subject + have/has + past participle","explanation":"Used to describe actions that happened at an unspecified time before now, or actions that started in the past and continue to the present.","examples":[{"en":"I have visited Paris three times.","vi":"Tôi đã đến Paris ba lần."},{"en":"She has lived here since 2010.","vi":"Cô ấy đã sống ở đây từ năm 2010."}],"level":"A2","category":"Tenses","collectionId":"grammar","masteryLevel":75,"lastReviewed":"1 day ago"},
    {"id":"g2","title":"Conditional Type 2","rule":"If + past simple, would + base verb","explanation":"Used to talk about unreal or hypothetical situations in the present or future.","examples":[{"en":"If I had more money, I would travel the world.","vi":"Nếu tôi có nhiều tiền hơn, tôi sẽ đi du lịch vòng quanh thế giới."}],"level":"B1","category":"Conditionals","collectionId":"grammar","masteryLevel":45,"lastReviewed":"3 days ago"},
    {"id":"g3","title":"Passive Voice","rule":"Subject + be + past participle (+ by agent)","explanation":"Used when the focus is on the action rather than who performs it.","examples":[{"en":"The book was written by J.K. Rowling.","vi":"Cuốn sách được viết bởi J.K. Rowling."}],"level":"B1","category":"Voice","collectionId":"grammar","masteryLevel":60,"lastReviewed":"5 days ago"},
    {"id":"g4","title":"Relative Clauses","rule":"who/which/that/where/when + clause","explanation":"Used to give more information about a noun without starting a new sentence.","examples":[{"en":"The man who called you is my brother.","vi":"Người đàn ông đã gọi cho bạn là anh trai tôi."}],"level":"B1","category":"Clauses","collectionId":"grammar","masteryLevel":30,"lastReviewed":"1 week ago"},
    {"id":"g5","title":"Reported Speech","rule":"Reporting verb + (that) + reported clause","explanation":"Used to report what someone said without using their exact words.","examples":[{"en":"She said that she was tired.","vi":"Cô ấy nói rằng cô ấy mệt."}],"level":"B2","category":"Speech","collectionId":"grammar","masteryLevel":20,"lastReviewed":"2 weeks ago"}
]'::jsonb)
ON CONFLICT ("id") DO NOTHING;
