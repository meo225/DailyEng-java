import { create } from "zustand";
import type { ProfileStats } from "@/types";
import type { SRSCard } from "@/lib/srs";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppStore {
  // Auth - Note: Auth.js manages session via cookies automatically
  // These are kept for UI state sync only
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // Profile
  stats: ProfileStats | null;
  setStats: (stats: ProfileStats) => void;
  addXP: (amount: number) => void;
  updateStreak: (streak: number) => void;

  // UI
  doraraOpen: boolean;
  setDoraraOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  flashcards: SRSCard[];
  addFlashcard: (card: SRSCard) => void;
  updateFlashcard: (card: SRSCard) => void;
  removeFlashcard: (id: string) => void;
  setFlashcards: (cards: SRSCard[]) => void;

  language: string;
  setLanguage: (lang: string) => void;

  learningLanguage: string;
  setLearningLanguage: (lang: string) => void;

  ttsVoice: string;
  setTtsVoice: (voice: string) => void;
}

// Helper to get initial language, prefer localStorage if available
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en";
  }
  return "en";
};

// Helper to get initial learning language, prefer localStorage if available
const getInitialLearningLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("learningLanguage") || "en";
  }
  return "en";
};

// Helper to get initial TTS voice from localStorage
const getInitialTtsVoice = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ttsVoice") || "en-US-JennyNeural";
  }
  return "en-US-JennyNeural";
};

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (user) => {
    // Auth.js manages session via cookies - this just updates UI state
    set({ user, isAuthenticated: true, error: null });
  },

  logout: () => {
    // Auth.js handles signout via /api/auth/signout - this just clears UI state
    set({ user: null, isAuthenticated: false, stats: null });
  },

  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),

  stats: null,
  setStats: (stats) => set({ stats }),
  addXP: (amount) =>
    set((state) => ({
      stats: state.stats
        ? { ...state.stats, xp: state.stats.xp + amount }
        : null,
    })),

  updateStreak: (streak) =>
    set((state) => ({
      stats: state.stats ? { ...state.stats, streak } : null,
    })),

  doraraOpen: false,
  setDoraraOpen: (open) => set({ doraraOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  flashcards: [],
  addFlashcard: (card) =>
    set((state) => ({
      flashcards: [...state.flashcards, card],
    })),
  updateFlashcard: (card) =>
    set((state) => ({
      flashcards: state.flashcards.map((c) => (c.id === card.id ? card : c)),
    })),
  removeFlashcard: (id) =>
    set((state) => ({
      flashcards: state.flashcards.filter((c) => c.id !== id),
    })),
  setFlashcards: (cards) => set({ flashcards: cards }),

  language: getInitialLanguage(),
  setLanguage: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    set({ language: lang });
  },

  learningLanguage: getInitialLearningLanguage(),
  setLearningLanguage: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("learningLanguage", lang);
    }
    set({ learningLanguage: lang });
  },

  ttsVoice: getInitialTtsVoice(),
  setTtsVoice: (voice) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ttsVoice", voice);
    }
    set({ ttsVoice: voice });
  },
}));
