"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Globe,
} from "lucide-react"
import { ScrollFlashcardDeck } from "./ScrollFlashcardDeck"

const InteractiveGridBackground = dynamic(
  () => import("@/components/ui/interactive-grid-background").then((mod) => mod.InteractiveGridBackground),
  { ssr: false }
)

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const elements = heroRef.current.querySelectorAll(".hero-anim-target")
    if (elements.length === 0) return

    import("animejs").then((animeModule) => {
      const anime = animeModule.default
      anime.timeline({
        easing: "spring(1, 80, 10, 0)",
      }).add({
        targets: elements,
        translateY: [48, 0],
        opacity: [0, 1],
        delay: anime.stagger(120, { start: 100 }),
      })
    })
  }, [])

  return (
    <section className="relative overflow-visible">
      {/* Background grid — only behind the initial viewport */}
      <div className="absolute inset-0 h-screen overflow-hidden">
        <InteractiveGridBackground
          rows={12}
          cols={20}
          className="z-0 opacity-80"
        />
        {/* Antigravity floating orbs */}
        <div className="antigravity-orb w-72 h-72 bg-primary-300 top-10 -left-20 antigravity-float-slow" />
        <div className="antigravity-orb w-96 h-96 bg-secondary-200 -bottom-20 right-10 antigravity-float-slow" style={{ animationDelay: '3s' }} />
        <div className="antigravity-orb w-56 h-56 bg-accent-200 top-1/2 left-1/3 antigravity-float-slow" style={{ animationDelay: '6s' }} />
      </div>

      {/* Scrollable tall container for flashcard dismiss animation */}
      <ScrollFlashcardDeck
        heroContent={
          <div ref={heroRef} className="pointer-events-none flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="hero-anim-target opacity-0 glass-card inline-flex items-center gap-2 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 cursor-pointer hover:border-primary-200 transition-all">
              <Sparkles className="w-4 h-4 fill-primary-400 text-primary-600" />
              <span>The #1 AI-Powered Language Platform</span>
            </div>

            <div className="hero-anim-target opacity-0">
              <h1 className="text-6xl sm:text-7xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] tracking-tight text-gray-700">
                Daily<span className="text-primary">Lang</span>
              </h1>
            </div>

            <div className="hero-anim-target opacity-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 leading-relaxed text-gray-500">
                Master Any Language the <br className="hidden lg:block" />
                <span className="text-primary-600 font-semibold">
                  Smart & Fun Way!
                </span>
              </h2>
              <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold cursor-pointer hover:bg-primary-100 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  English
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-semibold cursor-pointer hover:bg-red-100 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  Japanese
                </span>
                <span className="text-xs text-gray-400 font-medium">& more coming</span>
              </div>
            </div>

            <div className="hero-anim-target opacity-0">
              <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                Stop memorizing lists. Start using languages. Practice with
                real-world scenarios, AI tutors, and personalized roadmaps.
              </p>
            </div>

            <div className="hero-anim-target opacity-0 flex flex-col sm:flex-row gap-4 pointer-events-auto w-full sm:w-auto">
              <Link href="/auth/signup" className="pointer-events-auto w-full sm:w-auto cursor-pointer">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full sm:w-auto bg-primary-400 hover:bg-primary-600 text-white px-8 py-6 rounded-full text-lg font-bold cursor-pointer antigravity-shadow hover:-translate-y-1 transition-transform"
                >
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/helps" className="pointer-events-auto w-full sm:w-auto cursor-pointer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto glass-card border-2 border-primary-200 text-primary-700 hover:border-primary-300 px-8 py-6 rounded-full text-lg cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  How it works
                </Button>
              </Link>
            </div>

            <div className="hero-anim-target opacity-0 mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <Image src="/placeholder-user.jpg" width={32} height={32} alt="User" />
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ learners</p>
            </div>
          </div>
        }
      />
    </section>
  )
}
