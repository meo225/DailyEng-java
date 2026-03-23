// Server Component - Notebook Page
import NotebookPageClient from "@/components/page/NotebookPageClient";
import type { CollectionData, GrammarItem } from "@/components/page/NotebookPageClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchGrammarSamples(): Promise<GrammarItem[]> {
  try {
    const res = await fetch(`${API_BASE}/site-content/grammar_samples`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } catch {
    return [
      { id: "g1", title: "Present Perfect Tense", rule: "Subject + have/has + past participle", explanation: "Used to describe actions that happened at an unspecified time before now.", examples: [{ en: "I have visited Paris three times.", vi: "Tôi đã đến Paris ba lần." }], level: "A2", category: "Tenses", collectionId: "grammar", masteryLevel: 75, lastReviewed: "1 day ago" },
      { id: "g2", title: "Conditional Type 2", rule: "If + past simple, would + base verb", explanation: "Used to talk about unreal or hypothetical situations.", examples: [{ en: "If I had more money, I would travel the world.", vi: "Nếu tôi có nhiều tiền hơn, tôi sẽ đi du lịch vòng quanh thế giới." }], level: "B1", category: "Conditionals", collectionId: "grammar", masteryLevel: 45, lastReviewed: "3 days ago" },
      { id: "g3", title: "Passive Voice", rule: "Subject + be + past participle (+ by agent)", explanation: "Used when the focus is on the action rather than who performs it.", examples: [{ en: "The book was written by J.K. Rowling.", vi: "Cuốn sách được viết bởi J.K. Rowling." }], level: "B1", category: "Voice", collectionId: "grammar", masteryLevel: 60, lastReviewed: "5 days ago" },
    ];
  }
}

// Default sample collections (used when user has no notebooks)
const defaultCollections: CollectionData[] = [
  { id: "sample-vocab", name: "IELTS Words", count: 5, mastered: 1, color: "primary", type: "vocabulary" },
  { id: "sample-grammar", name: "Essential Tenses", count: 5, mastered: 0, color: "secondary", type: "grammar" },
];

export default async function NotebookPage() {
  const grammarItems = await fetchGrammarSamples();
  const sampleGrammarItems = grammarItems.map(item => ({ ...item, collectionId: "sample-grammar" }));

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
