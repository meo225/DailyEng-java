import { useAppStore } from "@/lib/store";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

const dictionaries: Record<string, any> = {
  en,
  vi,
};

import { useState, useEffect } from "react";

export function useTranslation() {
  const { language } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeLanguage = mounted ? language : "en";
  const dictionary = dictionaries[activeLanguage] || dictionaries["en"];

  const t = (key: string) => {
    const keys = key.split(".");
    let value = dictionary;

    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = value[k];
    }

    return value || key;
  };

  return { t, language };
}
