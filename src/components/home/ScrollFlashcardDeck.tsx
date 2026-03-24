"use client"

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react"

interface Flashcard {
  front: string
  back: string
  type: "radical" | "kanji" | "vocab" | "english"
  reading?: string
  x: number
  y: number
  rotate: number
}

const cardData = [
  { front: "食べる", back: "to eat", type: "kanji" as const, reading: "たべる" },
  { front: "eloquent", back: "fluent & persuasive", type: "english" as const },
  { front: "学校", back: "school", type: "kanji" as const, reading: "がっこう" },
  { front: "ubiquitous", back: "present everywhere", type: "english" as const },
  { front: "天気", back: "weather", type: "vocab" as const, reading: "てんき" },
  { front: "人", back: "person", type: "radical" as const, reading: "ひと" },
  { front: "水", back: "water", type: "radical" as const, reading: "みず" },
  { front: "先生", back: "teacher", type: "kanji" as const, reading: "せんせい" },
  { front: "ephemeral", back: "lasting a short time", type: "english" as const },
  { front: "友達", back: "friend", type: "vocab" as const, reading: "ともだち" },
  { front: "meticulous", back: "very careful", type: "english" as const },
  { front: "日本語", back: "Japanese", type: "vocab" as const, reading: "にほんご" },
]

// Messy scattered positions — intentionally overlapping and chaotic
const scatterPositions = [
  { x: -40, y: -160, rotate: -15 },
  { x: 130, y: -110, rotate: 12 },
  { x: -90, y: -20, rotate: -7 },
  { x: 80, y: 30, rotate: 18 },
  { x: -50, y: 110, rotate: -22 },
  { x: 140, y: 90, rotate: 5 },
  { x: -110, y: 190, rotate: 14 },
  { x: 90, y: 170, rotate: -10 },
  { x: -20, y: -220, rotate: 8 },
  { x: 160, y: -180, rotate: -17 },
  { x: -140, y: -90, rotate: 22 },
  { x: 50, y: 220, rotate: -4 },
]

const typeColors = {
  radical: { bg: "var(--secondary-500)", bgHex: "#00aaff", shadow: "rgba(0,170,255,0.3)", label: "RAD" },
  kanji: { bg: "var(--primary-500)", bgHex: "#f100a1", shadow: "rgba(241,0,161,0.3)", label: "漢字" },
  vocab: { bg: "var(--accent-400)", bgHex: "#aa00ff", shadow: "rgba(170,0,255,0.3)", label: "語彙" },
  english: { bg: "var(--primary-700)", bgHex: "#a80070", shadow: "rgba(168,0,112,0.3)", label: "ENG" },
}

interface ScrollFlashcardDeckProps {
  heroContent?: ReactNode
}

export function ScrollFlashcardDeck({ heroContent }: ScrollFlashcardDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dismissedCount, setDismissedCount] = useState(0)
  const [partialProgress, setPartialProgress] = useState(0)
  const totalCards = cardData.length

  const flashcards: Flashcard[] = cardData.map((card, i) => ({
    ...card,
    ...scatterPositions[i % scatterPositions.length],
  }))

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const scrollableRange = rect.height - window.innerHeight
    if (scrollableRange <= 0) return

    const scrolled = -rect.top
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange))
    const cardProgress = progress * (totalCards + 0.5)
    const targetDismissed = Math.min(totalCards, Math.floor(cardProgress))
    const partial = cardProgress - targetDismissed

    setDismissedCount(targetDismissed)
    setPartialProgress(Math.max(0, Math.min(1, partial)))
  }, [totalCards])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div
      ref={containerRef}
      style={{ height: `${(totalCards + 1) * 45}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center z-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Hero content */}
            {heroContent && (
              <div className="relative z-10">{heroContent}</div>
            )}

            {/* Right: Messy scattered flashcards */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-[500px] h-[550px] sm:w-[600px] sm:h-[600px]">
                {/* Scroll hint */}
                {dismissedCount === 0 && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                    <span className="text-sm text-gray-400 flex items-center gap-2 whitespace-nowrap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      Scroll to review cards
                    </span>
                  </div>
                )}

                {/* Cards */}
                {flashcards.map((card, index) => {
                  const colors = typeColors[card.type]
                  const isDismissed = index < dismissedCount
                  const isActive = index === dismissedCount

                  if (isDismissed) return null

                  const dismissX = isActive ? partialProgress * 500 : 0
                  const dismissY = isActive ? partialProgress * -250 : 0
                  const dismissRotate = isActive ? partialProgress * 40 + card.rotate : card.rotate
                  const dismissOpacity = isActive ? 1 - partialProgress * 0.95 : 1
                  const dismissScale = isActive ? 1 + partialProgress * 0.2 : 1

                  return (
                    <div
                      key={`${card.front}-${index}`}
                      className="absolute rounded-3xl overflow-hidden"
                      style={{
                        width: card.type === "english" ? "260px" : "220px",
                        height: card.type === "english" ? "170px" : "270px",
                        left: "50%",
                        top: "50%",
                        transform: `
                          translate(-50%, -50%)
                          translate(${card.x + dismissX}px, ${card.y + dismissY}px)
                          rotate(${dismissRotate}deg)
                          scale(${dismissScale})
                        `,
                        opacity: dismissOpacity,
                        zIndex: totalCards - index,
                        transition: isActive ? "none" : "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                        boxShadow: `0 16px 48px ${colors.shadow}, 0 6px 16px rgba(0,0,0,0.12)`,
                      }}
                    >
                      <div
                        className="w-full h-full flex flex-col items-center justify-center p-6"
                        style={{ backgroundColor: colors.bgHex }}
                      >
                        <span className="absolute top-3.5 left-4 text-xs font-bold text-white/40 uppercase tracking-wider">
                          {colors.label}
                        </span>
                        <h4 className={`font-bold text-white leading-none ${
                          card.type === "english" ? "text-2xl" : "text-5xl"
                        }`}>
                          {card.front}
                        </h4>
                        {card.reading && (
                          <p className="text-base text-white/50 mt-2">{card.reading}</p>
                        )}
                        <p className="text-base text-white/70 mt-3 font-medium">{card.back}</p>
                      </div>
                    </div>
                  )
                })}

                {/* Completion state */}
                {dismissedCount >= totalCards && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in-up">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-bold text-gray-700">All reviewed!</p>
                      <p className="text-sm text-gray-400">Keep scrolling ↓</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-center loading progress bar */}
        {dismissedCount < totalCards && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 w-full max-w-md px-8">
            <div className="w-full h-3 bg-gray-200/40 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round((dismissedCount / totalCards) * 100)}%`,
                  background: "linear-gradient(90deg, #00aaff, #f100a1, #aa00ff)",
                  transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-400 tracking-wide">
              {Math.round((dismissedCount / totalCards) * 100)}% reviewed
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
