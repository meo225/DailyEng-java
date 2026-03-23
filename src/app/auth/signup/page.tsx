// Server Component - Sign Up page fetches benefits from backend
import SignUpPageClient from "@/components/page/SignUpPageClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchBenefits(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/site-content/signup_benefits`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } catch {
    return [
      "Access to 1000+ interactive lessons",
      "AI-powered speaking practice",
      "Personalized learning paths",
      "Progress tracking & analytics",
      "Vocabulary builder with spaced repetition",
    ];
  }
}

export default async function SignUpPage() {
  const benefits = await fetchBenefits();
  return <SignUpPageClient benefits={benefits} />;
}
