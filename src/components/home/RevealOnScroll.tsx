"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

// ─── Shared IntersectionObserver Singleton ──────────
// All RevealOnScroll elements share ONE observer instead of creating N observers

type ObserverCallback = (isIntersecting: boolean) => void
const observerCallbacks = new Map<Element, ObserverCallback>()
let sharedObserver: IntersectionObserver | null = null

function getSharedObserver() {
  if (typeof window === "undefined") return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = observerCallbacks.get(entry.target)
          if (cb) cb(entry.isIntersecting)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    )
  }
  return sharedObserver
}

// ─── Component ─────────────────────────────────────

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = getSharedObserver()
    if (!observer) return

    observerCallbacks.set(el, (intersecting) => {
      if (intersecting) {
        setIsVisible(true)
        observer.unobserve(el)
        observerCallbacks.delete(el)
      }
    })
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      observerCallbacks.delete(el)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
