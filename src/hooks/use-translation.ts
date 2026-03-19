import { useAppStore } from "@/lib/store";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

const dictionaries: Record<string, any> = {
  en,
  vi,
};

import { useState, useEffect, useCallback } from "react";

export function useTranslation() {
  // ⚡ Bolt: Select only the language state to prevent re-renders when other store values (like XP, UI toggles) change
  const language = useAppStore((state) => state.language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeLanguage = mounted ? language : "en";
  const dictionary = dictionaries[activeLanguage] || dictionaries["en"];

  // ⚡ Bolt: Memoize the translation function to prevent unnecessary child component re-renders
  // when this hook is used in components that pass `t` as a prop or use it in dependency arrays
  const t = useCallback((key: string) => {
    const keys = key.split(".");
    let value = dictionary;

    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = value[k];
    }

    return value || key;
  }, [dictionary]);

  return { t, language };
}
