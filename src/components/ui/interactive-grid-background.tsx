"use client"

import { useState, useRef, useCallback } from "react"

interface InteractiveGridBackgroundProps {
  rows?: number
  cols?: number
  className?: string
}

export function InteractiveGridBackground({
  rows = 6,
  cols = 8,
  className = "",
}: InteractiveGridBackgroundProps) {
  // Single state: which cell is "lit" and which is "fading"
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)
  const [fadingCells, setFadingCells] = useState<Set<string>>(new Set())
  const fadeTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const gridRef = useRef<HTMLDivElement>(null)

  // Calculate which cell the mouse is over from coordinates — no per-cell listeners needed
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const grid = gridRef.current
      if (!grid) return
      const rect = grid.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const col = Math.floor((x / rect.width) * cols)
      const row = Math.floor((y / rect.height) * rows)
      if (col < 0 || col >= cols || row < 0 || row >= rows) return
      const cellId = `${row}-${col}`
      if (cellId === hoveredCell) return

      // Clear any fade timer for the newly hovered cell
      const existing = fadeTimers.current.get(cellId)
      if (existing) {
        clearTimeout(existing)
        fadeTimers.current.delete(cellId)
      }

      // Start fading the previously hovered cell
      if (hoveredCell) {
        const prev = hoveredCell
        setFadingCells((s) => new Set(s).add(prev))
        const timer = setTimeout(() => {
          setFadingCells((s) => {
            const next = new Set(s)
            next.delete(prev)
            return next
          })
          fadeTimers.current.delete(prev)
        }, 500)
        fadeTimers.current.set(prev, timer)
      }

      setHoveredCell(cellId)
    },
    [hoveredCell, cols, rows]
  )

  const handleMouseLeave = useCallback(() => {
    if (!hoveredCell) return
    const prev = hoveredCell
    setHoveredCell(null)
    setFadingCells((s) => new Set(s).add(prev))
    const timer = setTimeout(() => {
      setFadingCells((s) => {
        const next = new Set(s)
        next.delete(prev)
        return next
      })
      fadeTimers.current.delete(prev)
    }, 500)
    fadeTimers.current.set(prev, timer)
  }, [hoveredCell])

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Single event listener on the grid container instead of per-cell */}
      <div
        ref={gridRef}
        className="w-full h-full grid gap-0"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: cols }).map((_, colIndex) => {
            const cellId = `${rowIndex}-${colIndex}`
            const isHovered = hoveredCell === cellId
            const isFading = fadingCells.has(cellId)

            return (
              <div
                key={cellId}
                className={`
                  border border-gray-200/30
                  transition-all duration-500 ease-out
                  ${isHovered ? "bg-primary-200 border-foreground" : ""}
                  ${isFading ? "bg-primary-50 border-foreground" : ""}
                  ${!isHovered && !isFading ? "bg-white" : ""}
                `}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
