/**
 * Vocab Expansion Generator
 * 
 * Uses Gemini API to bulk-generate vocabulary items for new topic groups.
 * Outputs Prisma seed files in the exact same format as existing seed_vocab_*.ts files.
 * 
 * Usage: npx tsx prisma/generate-vocab.ts
 * 
 * Environment: Requires GEMINI_API_KEY in .env or .env.local
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

// Simple .env parser (no dotenv dependency needed)
function loadEnvFile(filePath: string): void {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

// Load env from multiple possible locations
loadEnvFile(path.resolve(__dirname, "../.env.local"));
loadEnvFile(path.resolve(__dirname, "../.env"));
loadEnvFile(path.resolve(__dirname, "../backend/src/main/resources/application.properties"));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY not found.");
  console.error("   Set it via: GEMINI_API_KEY=your_key npx tsx prisma/generate-vocab.ts");
  console.error("   Or uncomment it in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// ============================================================================
// Topic Group Definitions (NEW groups to generate)
// ============================================================================

interface TopicGroupDef {
  name: string;
  order: number;
  subcategories: string[];
  slug: string;
  fileIndex: number; // seed_vocab_{fileIndex}.ts
}

const NEW_TOPIC_GROUPS: TopicGroupDef[] = [
  {
    name: "Education",
    order: 7,
    subcategories: ["School Life", "Higher Education", "Exams & Tests", "Teaching & Learning"],
    slug: "education",
    fileIndex: 7,
  },
  {
    name: "Travel",
    order: 8,
    subcategories: ["Transportation", "Accommodation", "Sightseeing", "At the Airport"],
    slug: "travel",
    fileIndex: 8,
  },
  {
    name: "Food & Cooking",
    order: 9,
    subcategories: ["Ingredients", "Cooking Methods", "Restaurants", "Drinks & Beverages"],
    slug: "food-and-cooking",
    fileIndex: 9,
  },
  {
    name: "Law & Society",
    order: 10,
    subcategories: ["Crime & Justice", "Government", "Rights & Duties", "Social Issues"],
    slug: "law-and-society",
    fileIndex: 10,
  },
  {
    name: "Science",
    order: 11,
    subcategories: ["Physics & Chemistry", "Biology", "Environment", "Space & Astronomy"],
    slug: "science",
    fileIndex: 11,
  },
  {
    name: "Arts & Culture",
    order: 12,
    subcategories: ["Music", "Visual Arts", "Literature", "Festivals & Traditions"],
    slug: "arts-and-culture",
    fileIndex: 12,
  },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const VALID_POS = ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun", "interjection", "phrase"];

// ============================================================================
// Gemini API Call
// ============================================================================

interface VocabGenItem {
  word: string;
  phonBr: string;
  phonNAm: string;
  meaning: string;
  vietnameseMeaning: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
}

async function generateVocabBatch(
  subcategory: string,
  level: string,
  topicGroupName: string,
  existingWords: Set<string>
): Promise<VocabGenItem[]> {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  const existingWordsList = [...existingWords].slice(0, 100).join(", ");

  const prompt = `Generate exactly 10 English vocabulary items for Vietnamese English learners.

TOPIC GROUP: ${topicGroupName}
SUBCATEGORY: ${subcategory}
CEFR LEVEL: ${level}

LEVEL GUIDANCE:
- A1: Most basic, everyday words. Simple nouns, verbs, adjectives. Words a complete beginner needs.
- A2: Common words for daily situations. Simple but slightly more specific than A1.
- B1: Intermediate. Words needed for regular communication. Some abstract concepts.
- B2: Upper-intermediate. More precise vocabulary. Idioms, expressions, formal register.
- C1: Advanced. Sophisticated words. Academic, professional, nuanced meanings.
- C2: Near-native. Rare, literary, or highly specialized words. Obscure but useful terms.

DO NOT use any of these words (they already exist): ${existingWordsList}

REQUIREMENTS:
1. Each word MUST be directly related to "${subcategory}" within "${topicGroupName}"
2. Words must be appropriate for the ${level} CEFR level
3. All 10 words must be UNIQUE — no duplicates
4. partOfSpeech must be one of: noun, verb, adjective, adverb, phrase
5. Pronunciation must be in IPA format with slashes (e.g., /wɜːrd/)
6. phonBr = British English IPA, phonNAm = North American English IPA
7. exampleSentence must be natural and use the word correctly
8. exampleTranslation must be the Vietnamese translation of the example sentence
9. vietnameseMeaning must be accurate Vietnamese translation of the word's meaning
10. Provide 1-2 synonyms, 0-1 antonyms, and 1-2 common collocations

Return a JSON array of exactly 10 objects:
[
  {
    "word": "string",
    "phonBr": "/.../" ,
    "phonNAm": "/.../",
    "meaning": "short English definition",
    "vietnameseMeaning": "Vietnamese meaning",
    "partOfSpeech": "noun|verb|adjective|adverb|phrase",
    "exampleSentence": "A natural example sentence.",
    "exampleTranslation": "Vietnamese translation of example.",
    "synonyms": ["syn1"],
    "antonyms": ["ant1"],
    "collocations": ["common collocation"]
  }
]`;

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text) as VocabGenItem[];

      // Validate
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error(`Expected array, got ${typeof parsed}`);
      }

      // Clean and validate each item
      const cleaned = parsed
        .filter((item) => item.word && item.meaning && item.vietnameseMeaning)
        .map((item) => ({
          word: (item.word || "").toLowerCase().trim(),
          phonBr: item.phonBr || "",
          phonNAm: item.phonNAm || "",
          meaning: item.meaning || "",
          vietnameseMeaning: item.vietnameseMeaning || "",
          partOfSpeech: VALID_POS.includes(item.partOfSpeech?.toLowerCase())
            ? item.partOfSpeech.toLowerCase()
            : "noun",
          exampleSentence: item.exampleSentence || "",
          exampleTranslation: item.exampleTranslation || "",
          synonyms: Array.isArray(item.synonyms) ? item.synonyms.filter(Boolean) : [],
          antonyms: Array.isArray(item.antonyms) ? item.antonyms.filter(Boolean) : [],
          collocations: Array.isArray(item.collocations) ? item.collocations.filter(Boolean) : [],
        }))
        .filter((item) => item.word && !existingWords.has(item.word));

      if (cleaned.length < 5) {
        console.warn(`  ⚠️ Only ${cleaned.length} valid items for ${subcategory}-${level}, retrying...`);
        if (attempt < maxRetries) continue;
      }

      // Add to existing words set to avoid duplicates in subsequent calls
      cleaned.forEach((item) => existingWords.add(item.word));

      return cleaned;
    } catch (error: any) {
      console.error(`  ❌ Attempt ${attempt}/${maxRetries} failed for ${subcategory}-${level}: ${error.message}`);
      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = 2000 * Math.pow(2, attempt - 1);
        console.log(`  ⏳ Waiting ${delay / 1000}s before retry...`);
        await sleep(delay);
      } else {
        console.error(`  ❌ All retries exhausted for ${subcategory}-${level}`);
        return [];
      }
    }
  }
  return [];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// Seed File Generator
// ============================================================================

function escapeString(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}

function generateSeedFile(
  group: TopicGroupDef,
  vocabData: Record<string, Record<string, VocabGenItem[]>>
): string {
  // Build the vocab data object as code
  const varName = group.slug.replace(/-/g, "") + "Vocab";

  let vocabCode = `const ${varName} = {\n`;

  for (const [subcat, levelsData] of Object.entries(vocabData)) {
    vocabCode += `  "${subcat}": {\n`;

    for (const [level, items] of Object.entries(levelsData)) {
      if (items.length === 0) continue;

      vocabCode += `    ${level}: [\n`;
      for (const item of items) {
        const synonymsStr = item.synonyms.map((s) => `"${escapeString(s)}"`).join(", ");
        const antonymsStr = item.antonyms.map((s) => `"${escapeString(s)}"`).join(", ");
        const collocationsStr = item.collocations.map((s) => `"${escapeString(s)}"`).join(", ");

        vocabCode += `      v("${escapeString(item.word)}", "${escapeString(item.phonBr)}", "${escapeString(item.phonNAm)}", "${escapeString(item.meaning)}", "${escapeString(item.vietnameseMeaning)}", "${item.partOfSpeech}", "${escapeString(item.exampleSentence)}", "${escapeString(item.exampleTranslation)}", [${synonymsStr}], [${antonymsStr}], [${collocationsStr}]),\n`;
      }
      vocabCode += `    ],\n`;
    }

    vocabCode += `  },\n`;
  }

  vocabCode += `};\n`;

  // Build the complete seed file
  const subcatArray = group.subcategories.map((s) => `        "${s}"`).join(",\n");

  return `import { PrismaClient, Level, PartOfSpeech } from "@prisma/client";

const prisma = new PrismaClient();

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Helper to create vocab item
const v = (
  word: string,
  phonBr: string,
  phonNAm: string,
  meaning: string,
  vietnameseMeaning: string,
  partOfSpeech: PartOfSpeech,
  exampleSentence: string,
  exampleTranslation: string,
  synonyms: string[] = [],
  antonyms: string[] = [],
  collocations: string[] = []
) => ({
  word,
  phonBr,
  phonNAm,
  meaning,
  vietnameseMeaning,
  partOfSpeech,
  exampleSentence,
  exampleTranslation,
  synonyms,
  antonyms,
  collocations,
});

// ============================================
// TOPIC GROUP ${group.order}: ${group.name.toUpperCase()}
// ============================================

${vocabCode}

// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - ${group.name}...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "${group.name}", hubType: "vocab" } },
    update: {},
    create: {
      name: "${group.name}",
      order: ${group.order},
      hubType: "vocab",
      subcategories: [
${subcatArray},
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(${varName})) {
    console.log(\`Processing Subcategory: \${subcat}\`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = \`${group.slug}-\${slugify(subcat)}-\${currentLevel.toLowerCase()}\`;

      const topic = await prisma.topic.upsert({
        where: { id: topicId },
        update: { wordCount: items.length },
        create: {
          id: topicId,
          title: \`\${subcat} - \${currentLevel}\`,
          subtitle: \`Vocabulary about \${subcat.toLowerCase()}\`,
          description: \`Learn essential vocabulary about \${subcat.toLowerCase()} at \${currentLevel} level.\`,
          level: currentLevel,
          wordCount: items.length,
          estimatedTime: Math.ceil(items.length * 2),
          category: "${group.name}",
          subcategory: subcat,
          order: LEVELS.indexOf(currentLevel),
          topicGroupId: topicGroup.id,
        },
      });

      // Seed vocab items
      for (const vocab of items) {
        const vocabId = \`\${topic.id}-\${vocab.word.toLowerCase().replace(/\\s+/g, "-")}\`;
        await prisma.vocabItem.upsert({
          where: { id: vocabId },
          update: vocab,
          create: {
            id: vocabId,
            topicId: topic.id,
            ...vocab,
          },
        });
      }
      console.log(\`✅ Created: \${subcat} - \${currentLevel} (\${items.length} words)\`);
    }
  }

  console.log("✅ ${group.name} seeded successfully!");
}

async function main() {
  try {
    await seedVocab();
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
`;
}

// ============================================================================
// Collect existing words from seed files to avoid duplicates
// ============================================================================

function collectExistingWords(): Set<string> {
  const words = new Set<string>();
  const prismaDir = path.resolve(__dirname);

  for (let i = 1; i <= 6; i++) {
    const filePath = path.join(prismaDir, `seed_vocab_${i}.ts`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      // Extract words from v("word", ...) calls
      const matches = content.matchAll(/v\(\s*"([^"]+)"/g);
      for (const match of matches) {
        words.add(match[1].toLowerCase());
      }
    }
  }

  console.log(`📚 Found ${words.size} existing words from seed files 1-6`);
  return words;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log("🚀 Vocab Expansion Generator");
  console.log("============================\n");

  // Collect existing words
  const existingWords = collectExistingWords();

  // Process each topic group
  for (const group of NEW_TOPIC_GROUPS) {
    console.log(`\n📖 Generating Topic Group ${group.order}: ${group.name}`);
    console.log(`   Subcategories: ${group.subcategories.join(", ")}`);

    const vocabData: Record<string, Record<string, VocabGenItem[]>> = {};

    for (const subcat of group.subcategories) {
      vocabData[subcat] = {};

      for (const level of LEVELS) {
        console.log(`   🔄 Generating: ${subcat} - ${level}...`);
        const items = await generateVocabBatch(subcat, level, group.name, existingWords);
        vocabData[subcat][level] = items;
        console.log(`   ✅ Got ${items.length} words for ${subcat} - ${level}`);

        // Rate limit: wait between API calls
        await sleep(1500);
      }
    }

    // Generate seed file
    const seedContent = generateSeedFile(group, vocabData);
    const outputPath = path.join(__dirname, `seed_vocab_${group.fileIndex}.ts`);
    fs.writeFileSync(outputPath, seedContent, "utf-8");
    console.log(`\n   📝 Written: ${outputPath}`);

    // Count total words in this group
    let totalWords = 0;
    for (const levelsData of Object.values(vocabData)) {
      for (const items of Object.values(levelsData)) {
        totalWords += items.length;
      }
    }
    console.log(`   📊 Total words for ${group.name}: ${totalWords}`);

    // Pause between topic groups to be nice to the API
    console.log(`   ⏳ Pausing 5s before next group...`);
    await sleep(5000);
  }

  console.log("\n============================");
  console.log("✅ All seed files generated!");
  console.log("Run: npx tsx prisma/seed_vocab_N.ts  (where N = 7-12)");
}

main().catch(console.error);
