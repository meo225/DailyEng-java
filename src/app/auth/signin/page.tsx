// Server Component - Sign In page fetches stats from backend
import SignInPageClient from "@/components/page/SignInPageClient";
import type { SignInStat } from "@/components/page/SignInPageClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchStats(): Promise<SignInStat[]> {
  try {
    const res = await fetch(`${API_BASE}/site-content/signin_stats`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch {
    return [
      { value: "50K+", label: "Active Learners" },
      { value: "1000+", label: "Lessons" },
      { value: "4.9", label: "User Rating" },
    ];
  }
}

export default async function SignInPage() {
  const stats = await fetchStats();
  return <SignInPageClient stats={stats} />;
}
