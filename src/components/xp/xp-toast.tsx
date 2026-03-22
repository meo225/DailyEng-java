"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { Zap, Flame } from "lucide-react";

// ─── Types ──────────────────────────────────────────

interface XpToastData {
  xpAwarded: number;
  streakBonus: number;
  totalXp: number;
  streak: number;
  isNewDay: boolean;
}

interface XpToastContextType {
  showXpToast: (data: XpToastData) => void;
}

const XpToastContext = createContext<XpToastContextType | null>(null);

export function useXpToast() {
  return useContext(XpToastContext);
}

// ─── Provider ───────────────────────────────────────

export function XpToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<XpToastData | null>(null);
  const [visible, setVisible] = useState(false);

  const showXpToast = useCallback((data: XpToastData) => {
    setToast(data);
    setVisible(true);

    // Dispatch event so XpBar refreshes
    window.dispatchEvent(new CustomEvent("xp-awarded"));

    // Auto-dismiss after 3s
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setToast(null), 400); // Wait for exit animation
    }, 3000);
  }, []);

  return (
    <XpToastContext.Provider value={{ showXpToast }}>
      {children}
      {toast && <XpToastOverlay data={toast} visible={visible} />}
    </XpToastContext.Provider>
  );
}

// ─── Toast Overlay ──────────────────────────────────

function XpToastOverlay({
  data,
  visible,
}: {
  data: XpToastData;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);

  // Count-up animation
  useEffect(() => {
    if (!visible) return;
    const target = data.xpAwarded;
    const duration = 600; // ms
    const steps = 20;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, data.xpAwarded]);

  return (
    <div
      className={`fixed top-20 right-6 z-[100] pointer-events-none transition-all duration-400
        ${visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-4 scale-95"
        }`}
    >
      <div
        className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-2xl
          bg-white/80 backdrop-blur-xl border border-primary-100
          shadow-lg shadow-primary-200/30"
      >
        {/* XP icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
          <Zap size={20} className="text-white" fill="white" />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-primary-700">
              +{count}
            </span>
            <span className="text-sm font-semibold text-primary-500">XP</span>
          </div>

          {data.streakBonus > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
              <Flame size={11} />
              +{data.streakBonus} streak bonus
            </div>
          )}

          {data.isNewDay && data.streak > 1 && (
            <div className="text-[10px] font-medium text-accent-600 mt-0.5">
              🔥 {data.streak} day streak!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
