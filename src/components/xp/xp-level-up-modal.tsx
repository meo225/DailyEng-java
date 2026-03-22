"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { Trophy, Sparkles, Star } from "lucide-react";

// ─── Types ──────────────────────────────────────────

interface LevelUpData {
  newLevel: number;
  totalXp: number;
}

interface LevelUpContextType {
  showLevelUp: (data: LevelUpData) => void;
}

const LevelUpContext = createContext<LevelUpContextType | null>(null);

export function useLevelUp() {
  return useContext(LevelUpContext);
}

// ─── Provider ───────────────────────────────────────

export function LevelUpProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<LevelUpData | null>(null);
  const [phase, setPhase] = useState<"enter" | "show" | "exit" | "hidden">("hidden");

  const showLevelUp = useCallback((incoming: LevelUpData) => {
    setData(incoming);
    setPhase("enter");

    // Enter → show → exit → hidden
    setTimeout(() => setPhase("show"), 50);
    setTimeout(() => setPhase("exit"), 3500);
    setTimeout(() => {
      setPhase("hidden");
      setData(null);
    }, 4000);
  }, []);

  return (
    <LevelUpContext.Provider value={{ showLevelUp }}>
      {children}
      {data && phase !== "hidden" && <LevelUpOverlay data={data} phase={phase} />}
    </LevelUpContext.Provider>
  );
}

// ─── Overlay ────────────────────────────────────────

function LevelUpOverlay({
  data,
  phase,
}: {
  data: LevelUpData;
  phase: "enter" | "show" | "exit";
}) {
  const visible = phase === "show";

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center pointer-events-none
        transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary-900/30 backdrop-blur-sm" />

      {/* Particles */}
      {visible && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full level-up-particle"
              style={{
                left: `${50 + (Math.random() - 0.5) * 60}%`,
                top: `${50 + (Math.random() - 0.5) * 40}%`,
                background: i % 3 === 0
                  ? "var(--accent-400)"
                  : i % 3 === 1
                    ? "var(--secondary-400)"
                    : "var(--primary-300)",
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card */}
      <div
        className={`relative z-10 flex flex-col items-center gap-4 px-10 py-8 rounded-3xl
          bg-white/85 backdrop-blur-2xl border border-white/60
          shadow-[0_8px_40px_rgba(79,70,229,0.18)] transition-all duration-500
          ${visible ? "scale-100 translate-y-0" : "scale-90 translate-y-6"}`}
      >
        {/* Badge */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center
              bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800
              shadow-lg shadow-primary-300/40 transition-transform duration-700
              ${visible ? "scale-100 rotate-0" : "scale-50 -rotate-12"}`}
          >
            <span className="text-3xl font-black text-white">{data.newLevel}</span>
          </div>

          {/* Trophy accent */}
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-400 flex items-center justify-center shadow-md">
            <Trophy size={14} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <div className="flex items-center gap-1.5 justify-center mb-1">
            <Sparkles size={16} className="text-accent-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent-600">
              Level Up!
            </span>
            <Sparkles size={16} className="text-accent-500" />
          </div>
          <h2 className="text-2xl font-black text-primary-800">
            Level {data.newLevel}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {data.totalXp.toLocaleString()} XP earned
          </p>
        </div>

        {/* Stars */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <Star
              key={i}
              size={18}
              className="text-accent-400 fill-accent-400"
              style={{ animationDelay: `${i * 150 + 300}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
