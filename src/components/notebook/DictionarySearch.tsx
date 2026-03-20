"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Search, BookOpen, FileText, Loader2, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  searchDictionaryWords,
  searchDictionaryGrammar,
  type DictionaryWordResult,
  type DictionaryGrammarResult,
} from "@/actions/notebook"

// ─── Vocab Search ──────────────────────────────────

interface VocabDictionarySearchProps {
  onSelect: (word: DictionaryWordResult) => void
}

export function VocabDictionarySearch({ onSelect }: VocabDictionarySearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<DictionaryWordResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    setIsLoading(true)
    try {
      const data = await searchDictionaryWords(q)
      setResults(data)
      setIsOpen(data.length > 0)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(value), 300)
  }

  const handleSelect = (word: DictionaryWordResult) => {
    onSelect(word)
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400" />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400 animate-spin" />
        )}
        <Input
          placeholder="Search dictionary to quick-add a word..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className="pl-9 pr-9 h-11 rounded-xl border-2 border-dashed border-primary-200 bg-primary-50/30 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all placeholder:text-primary-300"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-primary-100 bg-white shadow-xl shadow-primary-500/10 max-h-64 overflow-y-auto">
          {results.map((word) => (
            <button
              key={word.id}
              type="button"
              onClick={() => handleSelect(word)}
              className="w-full text-left px-4 py-3 hover:bg-primary-50/60 transition-colors border-b border-primary-50 last:border-0 cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="h-4 w-4 text-primary-400 flex-shrink-0" />
                  <span className="font-bold text-gray-900 truncate">{word.word}</span>
                  <span className="text-xs text-gray-400 font-mono truncate">{word.pronunciation}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{word.partOfSpeech}</Badge>
                  <Badge className="bg-primary-100 text-primary-700 text-[10px] px-1.5 py-0 border-0">{word.level}</Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-primary-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate pl-6">{word.meaning}</p>
            </button>
          ))}
        </div>
      )}

      {!isOpen && query.length >= 2 && !isLoading && results.length === 0 && (
        <p className="text-xs text-gray-400 mt-1.5 pl-1">No words found. Fill in the form below manually.</p>
      )}
    </div>
  )
}

// ─── Grammar Search ────────────────────────────────

interface GrammarDictionarySearchProps {
  onSelect: (grammar: DictionaryGrammarResult) => void
}

export function GrammarDictionarySearch({ onSelect }: GrammarDictionarySearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<DictionaryGrammarResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    setIsLoading(true)
    try {
      const data = await searchDictionaryGrammar(q)
      setResults(data)
      setIsOpen(data.length > 0)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(value), 300)
  }

  const handleSelect = (grammar: DictionaryGrammarResult) => {
    onSelect(grammar)
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400" />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400 animate-spin" />
        )}
        <Input
          placeholder="Search grammar rules to quick-add..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className="pl-9 pr-9 h-11 rounded-xl border-2 border-dashed border-primary-200 bg-primary-50/30 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all placeholder:text-primary-300"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-primary-100 bg-white shadow-xl shadow-primary-500/10 max-h-64 overflow-y-auto">
          {results.map((grammar) => (
            <button
              key={grammar.id}
              type="button"
              onClick={() => handleSelect(grammar)}
              className="w-full text-left px-4 py-3 hover:bg-primary-50/60 transition-colors border-b border-primary-50 last:border-0 cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-4 w-4 text-secondary-400 flex-shrink-0" />
                  <span className="font-bold text-gray-900 truncate">{grammar.title}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Badge className="bg-primary-100 text-primary-700 text-[10px] px-1.5 py-0 border-0">{grammar.category}</Badge>
                  <Badge className="bg-secondary-100 text-secondary-700 text-[10px] px-1.5 py-0 border-0">{grammar.level}</Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-primary-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate pl-6">{grammar.explanation}</p>
            </button>
          ))}
        </div>
      )}

      {!isOpen && query.length >= 2 && !isLoading && results.length === 0 && (
        <p className="text-xs text-gray-400 mt-1.5 pl-1">No grammar rules found. Fill in the form below manually.</p>
      )}
    </div>
  )
}
