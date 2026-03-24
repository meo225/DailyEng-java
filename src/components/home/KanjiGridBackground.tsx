"use client"

import { useEffect, useRef, useCallback } from "react"

const radicals = ["一", "丨", "丶", "丿", "乙", "亅", "二", "亠", "人", "儿", "入", "八", "冂", "冖", "冫", "几", "凵", "刀", "力", "勹", "匕", "匚", "十", "卜", "卩", "厂", "厶", "又"]
const kanji = ["日", "一", "国", "人", "年", "大", "十", "二", "本", "中", "長", "出", "三", "時", "行", "見", "月", "後", "前", "生", "五", "間", "上", "東", "四", "今", "金", "九", "入", "学", "円", "子", "外", "八", "六", "下", "来", "気", "小", "七", "山", "話", "女", "北", "午", "百", "書", "先", "名", "川"]
const vocab = ["大人", "一人", "人工", "入口", "出口", "力学", "天才", "天気", "火山", "先生", "学生", "休日", "名作", "文字", "学校", "森林", "正解", "王子", "竹林", "車輪", "雨雲"]
const english = ["hello", "study", "learn", "read", "write", "speak", "word", "verb", "noun", "tense", "essay", "quiz", "goal", "skill", "fluent", "daily", "grow", "plan", "focus", "think", "talk", "IELTS", "TOEFL", "JLPT", "vocab", "grade", "score", "pass"]

const types = ["radical", "kanji", "vocab", "english"] as const

interface KanjiGridBackgroundProps {
  className?: string
}

export function KanjiGridBackground({ className = "" }: KanjiGridBackgroundProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<HTMLDivElement[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const lightUpTile = useCallback((tile: HTMLDivElement) => {
    if (
      tile.classList.contains("active-radical") ||
      tile.classList.contains("active-kanji") ||
      tile.classList.contains("active-vocab") ||
      tile.classList.contains("active-english")
    ) {
      return
    }

    const type = types[Math.floor(Math.random() * types.length)]
    let text = ""
    let activeClass = ""

    if (type === "radical") {
      text = radicals[Math.floor(Math.random() * radicals.length)]
      activeClass = "active-radical"
    } else if (type === "kanji") {
      text = kanji[Math.floor(Math.random() * kanji.length)]
      activeClass = "active-kanji"
    } else if (type === "english") {
      text = english[Math.floor(Math.random() * english.length)]
      activeClass = "active-english"
    } else {
      text = vocab[Math.floor(Math.random() * vocab.length)]
      activeClass = "active-vocab"
    }

    tile.textContent = text
    tile.classList.add(activeClass)

    setTimeout(() => {
      tile.classList.remove(activeClass)
    }, 1500 + Math.random() * 1500)
  }, [])

  const initGrid = useCallback(() => {
    const container = gridRef.current
    if (!container) return

    container.innerHTML = ""
    tilesRef.current = []

    const tileWidth = 73 // 65px + 8px gap
    const cols = Math.ceil((container.offsetWidth * 1.2) / tileWidth)
    const rows = Math.ceil((container.offsetHeight * 1.2) / tileWidth)
    const totalTiles = cols * rows

    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement("div")
      tile.className = "kanji-tile"
      tile.addEventListener("mouseenter", () => lightUpTile(tile))
      container.appendChild(tile)
      tilesRef.current.push(tile)
    }
  }, [lightUpTile])

  useEffect(() => {
    initGrid()

    intervalRef.current = setInterval(() => {
      const tiles = tilesRef.current
      if (tiles.length === 0) return
      const count = Math.floor(Math.random() * 3) + 2
      for (let i = 0; i < count; i++) {
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)]
        lightUpTile(randomTile)
      }
    }, 300)

    const handleResize = () => {
      initGrid()
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 200)
    }

    window.addEventListener("resize", debouncedResize)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [initGrid, lightUpTile])

  return (
    <div
      ref={gridRef}
      className={`absolute -top-[10%] -left-[10%] w-[120%] h-[120%] kanji-grid-container ${className}`}
      style={{ transform: "rotate(-4deg) scale(1.05)" }}
    />
  )
}
