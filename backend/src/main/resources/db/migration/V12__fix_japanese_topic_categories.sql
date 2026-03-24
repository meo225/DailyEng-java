-- Fix Japanese grammar topic categories to match TopicGroup names
UPDATE "Topic" SET category = 'Basic Particles (助詞)' WHERE "topicGroupId" = 'ja-grammar-particles';
UPDATE "Topic" SET subcategory = 'Subject Markers' WHERE id = 'ja-particles-subject-a1';
UPDATE "Topic" SET subcategory = 'Object Markers' WHERE id = 'ja-particles-object-a1';

-- Fix Japanese vocab topic subcategories to match TopicGroup.subcategories (title case)
UPDATE "Topic" SET subcategory = 'Greetings' WHERE id = 'ja-greetings-a1';
UPDATE "Topic" SET subcategory = 'Numbers' WHERE id = 'ja-numbers-a1';
UPDATE "Topic" SET subcategory = 'Daily Phrases' WHERE id = 'ja-daily-phrases-a1';

-- Fix Japanese speaking scenario categories to match TopicGroup names
UPDATE "SpeakingScenario" SET category = 'Daily Life (日常生活)' WHERE "topicGroupId" = 'ja-speaking-daily';
UPDATE "SpeakingScenario" SET subcategory = 'Introductions' WHERE id = 'ja-speak-intro-a1';
UPDATE "SpeakingScenario" SET subcategory = 'Dining' WHERE id = 'ja-speak-restaurant-a1';
UPDATE "SpeakingScenario" SET subcategory = 'Transportation' WHERE id = 'ja-speak-directions-a2';
UPDATE "SpeakingScenario" SET subcategory = 'Shopping' WHERE id = 'ja-speak-shopping-a1';

-- Fix Japanese TopicGroup subcategories to title case
UPDATE "TopicGroup" SET subcategories = '{Introductions,Shopping,Dining,Transportation}' WHERE id = 'ja-speaking-daily';
UPDATE "TopicGroup" SET subcategories = '{Greetings,Numbers,"Daily Phrases"}' WHERE id = 'ja-vocab-basic';
