// Server Component - Notebook Page
import NotebookPageClient from "@/components/page/NotebookPageClient";
import type { CollectionData, NotebookItem, GrammarItem } from "@/components/page/NotebookPageClient";

// Mock grammar data (static — no API call needed)
const grammarItems: GrammarItem[] = [
  {
    id: "g1", title: "Present Perfect Tense", rule: "Subject + have/has + past participle",
    explanation: "Used to describe actions that happened at an unspecified time before now, or actions that started in the past and continue to the present.",
    examples: [
      { en: "I have visited Paris three times.", vi: "Tôi đã đến Paris ba lần." },
      { en: "She has lived here since 2010.", vi: "Cô ấy đã sống ở đây từ năm 2010." },
    ],
    level: "A2", category: "Tenses", collectionId: "grammar", masteryLevel: 75, lastReviewed: "1 day ago",
  },
  {
    id: "g2", title: "Conditional Type 2", rule: "If + past simple, would + base verb",
    explanation: "Used to talk about unreal or hypothetical situations in the present or future.",
    examples: [
      { en: "If I had more money, I would travel the world.", vi: "Nếu tôi có nhiều tiền hơn, tôi sẽ đi du lịch vòng quanh thế giới." },
    ],
    level: "B1", category: "Conditionals", collectionId: "grammar", masteryLevel: 45, lastReviewed: "3 days ago",
  },
  {
    id: "g3", title: "Passive Voice", rule: "Subject + be + past participle (+ by agent)",
    explanation: "Used when the focus is on the action rather than who performs it.",
    examples: [
      { en: "The book was written by J.K. Rowling.", vi: "Cuốn sách được viết bởi J.K. Rowling." },
    ],
    level: "B1", category: "Voice", collectionId: "grammar", masteryLevel: 60, lastReviewed: "5 days ago",
  },
  {
    id: "g4", title: "Relative Clauses", rule: "who/which/that/where/when + clause",
    explanation: "Used to give more information about a noun without starting a new sentence.",
    examples: [
      { en: "The man who called you is my brother.", vi: "Người đàn ông đã gọi cho bạn là anh trai tôi." },
    ],
    level: "B1", category: "Clauses", collectionId: "grammar", masteryLevel: 30, lastReviewed: "1 week ago",
  },
  {
    id: "g5", title: "Reported Speech", rule: "Reporting verb + (that) + reported clause",
    explanation: "Used to report what someone said without using their exact words.",
    examples: [
      { en: "She said that she was tired.", vi: "Cô ấy nói rằng cô ấy mệt." },
    ],
    level: "B2", category: "Speech", collectionId: "grammar", masteryLevel: 20, lastReviewed: "2 weeks ago",
  },
];

// Default sample collections (used when user has no notebooks)
const defaultCollections: CollectionData[] = [
  { id: "sample-vocab", name: "IELTS Words", count: 5, mastered: 1, color: "primary", type: "vocabulary" },
  { id: "sample-grammar", name: "Essential Tenses", count: 5, mastered: 0, color: "secondary", type: "grammar" },
];

const sampleGrammarItems = grammarItems.map(item => ({ ...item, collectionId: "sample-grammar" }));

export default async function NotebookPage() {
  // Notebook data is now fetched client-side via apiClient (see useNotebookData hook).
  // Server component only provides static sample data.
  return (
    <NotebookPageClient
      collections={defaultCollections}
      vocabularyItems={[]}
      grammarItems={sampleGrammarItems}
      dueCount={0}
    />
  );
}
