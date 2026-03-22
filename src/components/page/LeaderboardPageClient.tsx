"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Crown, Flame, Zap, Users } from "lucide-react";
import { UserProfileSidebar } from "@/components/layout/user-profile-sidebar";
import { ProtectedRoute, PageIcons } from "@/components/auth/protected-route";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { getLeaderboard } from "@/actions/xp";
import type { LeaderboardData, LeaderboardItem } from "@/actions/xp";

// ─── Constants ──────────────────────────────────────

const PERIODS = [
  { value: "weekly", label: "This Week" },
  { value: "monthly", label: "This Month" },
  { value: "all", label: "All Time" },
] as const;

type Period = (typeof PERIODS)[number]["value"];

// ─── Page Component ─────────────────────────────────

export default function LeaderboardPageClient() {
  const { profile } = useUserProfile();
  const [period, setPeriod] = useState<Period>("weekly");
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await getLeaderboard(period, "xp", 20);
        setData(result);
      } catch {
        // API unavailable — show empty state
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [period]);

  const topThree = data?.entries.slice(0, 3) ?? [];
  const rest = data?.entries.slice(3) ?? [];

  return (
    <ProtectedRoute
      pageName="Leaderboard"
      pageDescription="See how you rank against other learners."
      pageIcon={PageIcons.profile}
    >
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* ─── Sidebar ─────────────────────────── */}
          <div className="md:col-span-3 lg:col-span-3 space-y-6">
            <UserProfileSidebar
              activePage="leaderboard"
              userName={profile?.name || "User"}
              userImage={profile?.image}
            />
          </div>

          {/* ─── Main Content ────────────────────── */}
          <div className="md:col-span-9 lg:col-span-9 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Trophy size={22} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Leaderboard</h1>
                  <p className="text-sm text-gray-500">
                    Compete with fellow learners
                  </p>
                </div>
              </div>

              {/* Period Tabs */}
              <div className="flex gap-1 p-1 rounded-xl bg-gray-100">
                {PERIODS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPeriod(p.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                      ${period === p.value
                        ? "bg-white text-primary-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-2xl bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && (!data || data.entries.length === 0) && (
              <Card className="border-2 border-border bg-white p-12 text-center">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  No rankings yet
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Start learning to earn XP and appear on the leaderboard!
                </p>
              </Card>
            )}

            {/* Podium — Top 3 */}
            {!loading && topThree.length > 0 && (
              <div className="grid grid-cols-3 gap-3 items-end">
                {/* 2nd Place */}
                {topThree.length >= 2 ? (
                  <PodiumCard
                    entry={topThree[1]}
                    place={2}
                    height="h-36"
                    gradient="from-gray-200 to-gray-300"
                    icon={<Medal size={20} className="text-gray-600" />}
                  />
                ) : (
                  <div />
                )}

                {/* 1st Place */}
                {topThree.length >= 1 && (
                  <PodiumCard
                    entry={topThree[0]}
                    place={1}
                    height="h-44"
                    gradient="from-amber-300 to-yellow-400"
                    icon={<Crown size={22} className="text-amber-700" />}
                  />
                )}

                {/* 3rd Place */}
                {topThree.length >= 3 ? (
                  <PodiumCard
                    entry={topThree[2]}
                    place={3}
                    height="h-28"
                    gradient="from-orange-200 to-amber-300"
                    icon={<Medal size={18} className="text-orange-600" />}
                  />
                ) : (
                  <div />
                )}
              </div>
            )}

            {/* Ranked List */}
            {!loading && rest.length > 0 && (
              <Card className="border-2 border-border bg-white divide-y divide-gray-100 overflow-hidden">
                {rest.map((entry) => (
                  <RankedRow
                    key={entry.userId}
                    entry={entry}
                    isCurrentUser={entry.userId === data?.currentUser?.userId}
                  />
                ))}
              </Card>
            )}

            {/* Current User Position (if not in top 20) */}
            {!loading &&
              data?.currentUser &&
              data.currentUser.rank > 20 && (
                <Card className="border-2 border-primary-200 bg-primary-50/50 p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400 text-xs">···</span>
                    <RankedRow
                      entry={data.currentUser}
                      isCurrentUser
                    />
                  </div>
                </Card>
              )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// ─── Podium Card ────────────────────────────────────

function PodiumCard({
  entry,
  place,
  height,
  gradient,
  icon,
}: {
  entry: LeaderboardItem;
  place: number;
  height: string;
  gradient: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 podium-enter opacity-0">
      {/* Avatar */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-lg font-bold text-gray-600 overflow-hidden border-2 border-white shadow-md">
          {entry.userImage ? (
            <img
              src={entry.userImage}
              alt={entry.userName}
              className="w-full h-full object-cover"
            />
          ) : (
            entry.userName.charAt(0).toUpperCase()
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Name */}
      <span className="text-xs font-semibold text-gray-700 text-center truncate max-w-[100px]">
        {entry.userName}
      </span>

      {/* Podium bar */}
      <div
        className={`w-full ${height} rounded-t-2xl bg-gradient-to-t ${gradient}
          flex flex-col items-center justify-start pt-4 shadow-inner`}
      >
        <span className="text-2xl font-black text-white/80">{place}</span>
        <div className="flex items-center gap-1 mt-1">
          <Zap size={12} className="text-white/70" />
          <span className="text-xs font-bold text-white/80">
            {entry.xp.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Ranked Row ─────────────────────────────────────

function RankedRow({
  entry,
  isCurrentUser = false,
}: {
  entry: LeaderboardItem;
  isCurrentUser?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-3.5 transition-colors
        ${isCurrentUser
          ? "bg-primary-50/60"
          : "hover:bg-gray-50"
        }`}
    >
      {/* Rank */}
      <span
        className={`w-8 text-center text-sm font-bold
          ${isCurrentUser ? "text-primary-600" : "text-gray-400"}`}
      >
        {entry.rank}
      </span>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm font-bold text-gray-600 overflow-hidden flex-shrink-0">
        {entry.userImage ? (
          <img
            src={entry.userImage}
            alt={entry.userName}
            className="w-full h-full object-cover"
          />
        ) : (
          entry.userName.charAt(0).toUpperCase()
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm font-semibold truncate block
            ${isCurrentUser ? "text-primary-700" : "text-gray-800"}`}
        >
          {entry.userName}
          {isCurrentUser && (
            <span className="text-xs font-medium text-primary-400 ml-1.5">
              (You)
            </span>
          )}
        </span>
      </div>

      {/* XP */}
      <div className="flex items-center gap-1.5">
        <Zap size={14} className="text-accent-500" />
        <span className="text-sm font-bold text-gray-800">
          {entry.xp.toLocaleString()}
        </span>
        <span className="text-xs text-gray-400">XP</span>
      </div>
    </div>
  );
}
