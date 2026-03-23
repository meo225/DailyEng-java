-- =============================================
-- V9: Placement Test Question Set table + seed data
-- Modeled after github.com/merzann/english-level-test:
--   15 vocabulary, 15 grammar, 5 reading comprehension
--   Questions progress from easy (A1) to hard (C2)
-- =============================================

CREATE TABLE "PlacementTestQuestionSet" (
    "id"              VARCHAR(30) PRIMARY KEY,
    "version"         VARCHAR(50) NOT NULL UNIQUE,
    "active"          BOOLEAN NOT NULL DEFAULT TRUE,
    "testSteps"       JSONB NOT NULL,
    "questions"       JSONB NOT NULL,
    "readingPassage"  JSONB NOT NULL,
    "createdAt"       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed the default question set (v1)
INSERT INTO "PlacementTestQuestionSet" ("id", "version", "active", "testSteps", "questions", "readingPassage")
VALUES (
    'pt-question-set-v1',
    'v1',
    TRUE,
    -- ═══ Test Steps ═══
    '[
        {"id":"vocabulary","label":"Vocabulary","color":"accent","description":"Test your word knowledge"},
        {"id":"grammar","label":"Grammar","color":"primary","description":"Assess grammar understanding"},
        {"id":"reading","label":"Reading","color":"warning","description":"Reading comprehension"},
        {"id":"listening","label":"Listening","color":"info","description":"Test listening skills"},
        {"id":"speaking","label":"Speaking","color":"secondary","description":"Assess speaking ability"},
        {"id":"writing","label":"Writing","color":"primary","description":"Evaluate writing skills"}
    ]'::jsonb,

    -- ═══ Questions (15 vocab + 15 grammar + reading + listening + speaking + writing) ═══
    '{
        "vocabulary": [
            {"id":1,"type":"multiple-choice","question":"What is the synonym of ''happy''?","options":["Sad","Joyful","Angry","Tired"],"correctAnswer":1},
            {"id":2,"type":"multiple-choice","question":"What is the opposite of ''big''?","options":["Tall","Small","Wide","Long"],"correctAnswer":1},
            {"id":3,"type":"multiple-choice","question":"Choose the correct word: ''The weather is ___ today.''","options":["beauty","beautiful","beautifully","beautify"],"correctAnswer":1},
            {"id":4,"type":"multiple-choice","question":"What does ''buy'' mean?","options":["To sell something","To get something with money","To give a gift","To throw away"],"correctAnswer":1},
            {"id":5,"type":"multiple-choice","question":"Which word means ''not difficult''?","options":["Hard","Easy","Heavy","Strong"],"correctAnswer":1},
            {"id":6,"type":"multiple-choice","question":"Select the antonym of ''generous'':","options":["Kind","Selfish","Wealthy","Poor"],"correctAnswer":1},
            {"id":7,"type":"multiple-choice","question":"Which word means ''to make something better''?","options":["Worsen","Improve","Destroy","Ignore"],"correctAnswer":1},
            {"id":8,"type":"multiple-choice","question":"What does ''reliable'' mean?","options":["Unpredictable","Dependable","Careless","Wasteful"],"correctAnswer":1},
            {"id":9,"type":"multiple-choice","question":"Choose the word closest in meaning to ''diligent'':","options":["Lazy","Hardworking","Careless","Slow"],"correctAnswer":1},
            {"id":10,"type":"multiple-choice","question":"What does ''ubiquitous'' mean?","options":["Rare","Present everywhere","Ancient","Modern"],"correctAnswer":1},
            {"id":11,"type":"multiple-choice","question":"What is the meaning of ''inevitable''?","options":["Avoidable","Certain to happen","Unlikely","Impossible"],"correctAnswer":1},
            {"id":12,"type":"multiple-choice","question":"Choose the correct definition of ''pragmatic'':","options":["Idealistic","Practical","Romantic","Theoretical"],"correctAnswer":1},
            {"id":13,"type":"multiple-choice","question":"What does ''ephemeral'' mean?","options":["Lasting forever","Short-lived","Very important","Extremely large"],"correctAnswer":1},
            {"id":14,"type":"multiple-choice","question":"Select the word closest in meaning to ''sycophant'':","options":["Leader","Flatterer","Philosopher","Rebel"],"correctAnswer":1},
            {"id":15,"type":"fill-blank","question":"Complete: ''The politician''s speech was deliberately ___, avoiding any clear commitments.'' (meaning vague, unclear)","correctAnswer":"ambiguous"}
        ],
        "grammar": [
            {"id":1,"type":"multiple-choice","question":"Choose the correct form: ''She ___ to school every day.''","options":["go","goes","going","gone"],"correctAnswer":1},
            {"id":2,"type":"multiple-choice","question":"Select the correct sentence:","options":["He don''t like coffee.","He doesn''t likes coffee.","He doesn''t like coffee.","He not like coffee."],"correctAnswer":2},
            {"id":3,"type":"multiple-choice","question":"Which is correct? ''I have been waiting ___ two hours.''","options":["since","for","from","during"],"correctAnswer":1},
            {"id":4,"type":"multiple-choice","question":"Choose the correct past tense: ''Yesterday, I ___ a great movie.''","options":["watch","watched","watching","watches"],"correctAnswer":1},
            {"id":5,"type":"multiple-choice","question":"Choose the correct article: ''___ apple a day keeps the doctor away.''","options":["A","An","The","No article"],"correctAnswer":1},
            {"id":6,"type":"multiple-choice","question":"Which sentence uses the adverb correctly?","options":["He ran quick.","He ran quickly.","He ran more quick.","He ran the most quick."],"correctAnswer":1},
            {"id":7,"type":"multiple-choice","question":"Select the correct comparative: ''This book is ___ than that one.''","options":["interestinger","more interesting","most interesting","interesting"],"correctAnswer":1},
            {"id":8,"type":"multiple-choice","question":"Which uses present perfect correctly?","options":["I have see that.","I have saw that.","I have seen that.","I seen that."],"correctAnswer":2},
            {"id":9,"type":"multiple-choice","question":"Select the correct conditional: ''If I ___ rich, I would travel the world.''","options":["am","was","were","be"],"correctAnswer":2},
            {"id":10,"type":"multiple-choice","question":"Select the correct passive: ''The cake ___ by my mother.''","options":["baked","was baked","is bake","baking"],"correctAnswer":1},
            {"id":11,"type":"multiple-choice","question":"Choose the correct relative pronoun: ''The man ___ lives next door is a doctor.''","options":["which","what","who","whom"],"correctAnswer":2},
            {"id":12,"type":"multiple-choice","question":"Which sentence uses the subjunctive correctly?","options":["I suggest he goes.","I suggest he go.","I suggest he went.","I suggest he will go."],"correctAnswer":1},
            {"id":13,"type":"multiple-choice","question":"Identify the correct sentence with an inverted conditional:","options":["Had I known, I would have called.","If I had known, I would have called.","I had known, I would have called.","Knowing I had, I would have called."],"correctAnswer":0},
            {"id":14,"type":"multiple-choice","question":"Which sentence correctly uses a cleft structure?","options":["It was John who broke the window.","John it was who broke the window.","Who broke the window it was John.","John who broke the window it was."],"correctAnswer":0},
            {"id":15,"type":"multiple-choice","question":"Select the sentence with the correct use of the past perfect continuous:","options":["She has been working before he arrived.","She had been working when he arrived.","She was being worked when he arrived.","She had been worked when he arrived."],"correctAnswer":1}
        ],
        "reading": [
            {"id":1,"type":"reading","passage":"Climate change is one of the most pressing issues of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary cause.","question":"What is the main cause of climate change according to the passage?","options":["Natural cycles","Human activities","Solar radiation","Volcanic eruptions"],"correctAnswer":1},
            {"id":2,"type":"reading","passage":"The invention of the printing press by Gutenberg in the 15th century revolutionized information spread. Before this, books were copied by hand, making them expensive and rare. The press made books cheaper and more accessible, increasing literacy rates.","question":"What was the main effect of the printing press?","options":["Books became more expensive","Literacy rates increased","Books were only for the wealthy","Information spread more slowly"],"correctAnswer":1},
            {"id":3,"type":"reading","passage":"Sleep is essential for good health. During sleep, the body repairs tissues, consolidates memories, and releases growth hormones. Adults typically need 7-9 hours per night. Lack of sleep can lead to obesity, heart disease, and decreased cognitive function.","question":"How many hours of sleep do adults typically need?","options":["5-6 hours","7-9 hours","10-12 hours","4-5 hours"],"correctAnswer":1},
            {"id":4,"type":"reading","passage":"The Great Barrier Reef, located off Australia''s coast, is the world''s largest coral reef system, stretching over 2,300 kilometers. It is home to thousands of marine species but is threatened by climate change, pollution, and overfishing.","question":"Where is the Great Barrier Reef located?","options":["Caribbean Sea","Mediterranean Sea","Off Australia''s coast","Pacific Islands"],"correctAnswer":2}
        ],
        "listening": [
            {"id":1,"type":"listening","question":"What time does the train depart?","options":["8:00 AM","8:30 AM","9:00 AM","9:30 AM"],"correctAnswer":1},
            {"id":2,"type":"listening","question":"Where is the meeting being held?","options":["Conference Room A","Conference Room B","Main Hall","Office 201"],"correctAnswer":0},
            {"id":3,"type":"listening","question":"What does the speaker recommend?","options":["Taking a break","Working harder","Changing jobs","Getting more sleep"],"correctAnswer":3},
            {"id":4,"type":"listening","question":"How much does the item cost?","options":["$15","$25","$35","$45"],"correctAnswer":2}
        ],
        "speaking": [
            {"id":1,"type":"speaking","prompt":"Introduce yourself and talk about your hobbies.","question":"Record your response (1-2 minutes)"},
            {"id":2,"type":"speaking","prompt":"Describe your favorite place to visit and explain why.","question":"Record your response (1-2 minutes)"},
            {"id":3,"type":"speaking","prompt":"Discuss the advantages and disadvantages of social media.","question":"Record your response (2-3 minutes)"}
        ],
        "writing": [
            {"id":1,"type":"writing","prompt":"Write a short paragraph (50-100 words) about your daily routine.","question":"Describe your typical day from morning to evening."},
            {"id":2,"type":"writing","prompt":"Write an email (100-150 words) inviting a friend to your birthday party.","question":"Include date, time, location, and special instructions."},
            {"id":3,"type":"writing","prompt":"Write a short essay (150-200 words) about learning a foreign language.","question":"Discuss at least two benefits of being bilingual."}
        ]
    }'::jsonb,

    -- ═══ Reading Passage (comprehension section, modeled after NatGeo-style passage) ═══
    '{
        "title": "Global Warming and Climate Change",
        "content": "Global warming refers to the long-term increase in Earth''s average surface temperature due to human activities, primarily the burning of fossil fuels such as coal, oil, and natural gas. These activities release large amounts of carbon dioxide and other greenhouse gases into the atmosphere, which trap heat and cause the planet to warm.\n\nThe effects of global warming are far-reaching and increasingly visible. Glaciers and ice caps are melting at unprecedented rates, contributing to rising sea levels that threaten coastal communities worldwide. Weather patterns have become more extreme, with more frequent and severe hurricanes, droughts, floods, and heat waves.\n\nThe scientific community is in broad agreement that immediate action is needed to address climate change. The Intergovernmental Panel on Climate Change (IPCC) has recommended limiting global temperature rise to 1.5°C above pre-industrial levels to avoid the most catastrophic effects.\n\nCountries around the world have begun taking steps to reduce their carbon emissions. The Paris Agreement, signed in 2015, committed 196 nations to reducing their greenhouse gas emissions. Many countries are investing heavily in renewable energy sources like solar and wind power, which produce electricity without emitting greenhouse gases.\n\nIndividuals can also contribute to the fight against climate change by making sustainable choices in their daily lives. Reducing energy consumption, using public transportation, eating less meat, and supporting companies with strong environmental policies are all ways that individuals can help reduce their carbon footprint.\n\nDespite the challenges, there is reason for optimism. Renewable energy costs have plummeted in recent years, making clean energy increasingly competitive with fossil fuels. Electric vehicles are becoming more affordable and widespread. And a growing global movement of young people is demanding urgent action on climate change, putting pressure on governments and corporations to accelerate the transition to a sustainable future.",
        "questions": [
            {"question":"What is the primary cause of global warming according to the passage?","options":["Natural temperature cycles","Volcanic eruptions","Burning of fossil fuels","Deforestation"],"correctAnswer":2,"explanation":"The passage states that global warming is ''due to human activities, primarily the burning of fossil fuels such as coal, oil, and natural gas.''"},
            {"question":"What temperature limit has the IPCC recommended?","options":["1.0°C above pre-industrial levels","1.5°C above pre-industrial levels","2.0°C above pre-industrial levels","2.5°C above pre-industrial levels"],"correctAnswer":1,"explanation":"The passage states the IPCC recommended ''limiting global temperature rise to 1.5°C above pre-industrial levels.''"},
            {"question":"How many nations signed the Paris Agreement?","options":["150","175","196","210"],"correctAnswer":2,"explanation":"The passage states ''The Paris Agreement, signed in 2015, committed 196 nations to reducing their greenhouse gas emissions.''"},
            {"question":"Which of the following is NOT mentioned as an individual action against climate change?","options":["Reducing energy consumption","Planting trees","Eating less meat","Using public transportation"],"correctAnswer":1,"explanation":"The passage mentions reducing energy consumption, using public transportation, eating less meat, and supporting green companies, but does not mention planting trees."},
            {"question":"What reason for optimism does the passage mention?","options":["Fossil fuel reserves are increasing","Renewable energy costs have decreased significantly","All countries have banned fossil fuels","Global temperatures have started decreasing"],"correctAnswer":1,"explanation":"The passage states ''Renewable energy costs have plummeted in recent years, making clean energy increasingly competitive with fossil fuels.''"}
        ]
    }'::jsonb
) ON CONFLICT ("id") DO NOTHING;
