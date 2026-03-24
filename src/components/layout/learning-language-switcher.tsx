"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { useTranslation } from "@/hooks/use-translation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap } from "lucide-react"

export function LearningLanguageSwitcher() {
  const learningLanguage = useAppStore((state) => state.learningLanguage)
  const setLearningLanguage = useAppStore((state) => state.setLearningLanguage)
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use default during SSR to avoid hydration mismatch
  const displayLang = mounted ? learningLanguage : "en"

  // This updates local state. Ideal next step: send API to update user.learningLanguage if logged in.
  const handleSelect = (lang: string) => {
    setLearningLanguage(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-xl text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-indigo-100 transition-colors cursor-pointer flex items-center justify-center font-medium gap-1.5 shadow-sm text-sm">
        <GraduationCap className="h-4 w-4" />
        <span className="hidden sm:inline-block pr-1">
          {displayLang === "ja" ? "Japanese" : "English"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg min-w-[150px]">
        <DropdownMenuItem
          onClick={() => handleSelect("en")}
          className={`cursor-pointer px-4 py-2 ${displayLang === "en" ? "bg-indigo-50 text-indigo-700 font-semibold" : ""}`}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSelect("ja")}
          className={`cursor-pointer px-4 py-2 ${displayLang === "ja" ? "bg-indigo-50 text-indigo-700 font-semibold" : ""}`}
        >
          🇯🇵 Japanese
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
