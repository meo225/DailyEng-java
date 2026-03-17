import SpeakingPageClient from "@/components/page/SpeakingPageClient";
import type { CriteriaItem } from "@/components/page/SpeakingPageClient";

// Demo criteria - will be calculated from real session data later
const DEMO_CRITERIA: CriteriaItem[] = [
  { title: "Vocabulary", score: 95 },
  { title: "Grammar", score: 92 },
  { title: "Pronounciation", score: 93 },
  { title: "Fluency", score: 85 },
  { title: "Coherence", score: 83 },
];

export default function SpeakingPage() {
  // userId is resolved client-side via useAuth() inside SpeakingPageClient
  // Server-side auth() can't read cross-origin httpOnly cookies
  return <SpeakingPageClient demoCriteria={DEMO_CRITERIA} userId="" />;
}
