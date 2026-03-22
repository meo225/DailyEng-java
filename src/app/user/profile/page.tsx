import ProfilePageClient from "@/components/page/ProfilePageClient";
import { getUserProfile } from "@/actions/user";

// Force dynamic rendering because this page uses auth headers
export const dynamic = "force-dynamic";

// Fallback quotes when API fails
const fallbackQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
];

// Fetch random quote from zenquotes.io
async function fetchQuote(): Promise<{ text: string; author: string }> {
  try {
    const res = await fetch("https://zenquotes.io/api/random", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    if (data && data.length > 0) {
      return { text: data[0].q, author: data[0].a };
    }
    throw new Error("No data");
  } catch {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }
}

export default async function ProfilePage() {
  const { user } = await getUserProfile();
  const userName = user?.name || "User";
  const userLevel = user?.level || "A1";
  const quote = await fetchQuote();

  return (
    <ProfilePageClient
      userName={userName}
      userLevel={userLevel}
      quote={quote}
    />
  );
}
