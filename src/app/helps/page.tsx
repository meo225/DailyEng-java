// Server Component - FAQ page fetches from backend
import HelpPageClient from "@/components/page/HelpPageClient";
import type { FAQ } from "@/components/page/HelpPageClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchFaqs(): Promise<FAQ[]> {
  try {
    const res = await fetch(`${API_BASE}/site-content/faqs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } catch {
    // Fallback
    return [
      { question: "How does the spaced repetition system work?", answer: "Our SRS uses the FSRS algorithm to optimize your learning. Cards are reviewed at increasing intervals based on how well you remember them." },
      { question: "Can I create my own topics?", answer: "Yes! Click 'Create with AI' in the Vocabulary Hub to create custom topics. You can also create custom speaking scenarios in the Speaking Room." },
      { question: "How are my speaking sessions scored?", answer: "Your speaking is evaluated on four criteria: Pronunciation, Fluency, Grammar, and Content." },
      { question: "What do the different learning levels mean?", answer: "A1-A2 are beginner levels, B1-B2 are intermediate. Choose your level during onboarding to get personalized content." },
      { question: "How can I maintain my streak?", answer: "Complete at least one task per day to maintain your streak. Your daily tasks are customized based on your study plan." },
      { question: "Is my data saved?", answer: "Yes, your progress is securely saved in our database. Your flashcards, speaking sessions, and study plan are all preserved across devices." },
    ];
  }
}

export default async function HelpPage() {
  const faqs = await fetchFaqs();
  return <HelpPageClient faqs={faqs} />;
}
