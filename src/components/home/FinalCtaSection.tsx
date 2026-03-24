"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"
import { KanjiGridBackground } from "./KanjiGridBackground"

export function FinalCtaSection() {
  return (
    <section className="py-40 relative overflow-hidden" style={{ backgroundColor: "#232629" }}>
      {/* Animated kanji tile grid background */}
      <KanjiGridBackground />

      {/* Radial overlay to keep center text readable */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(35,38,41,0.85) 0%, rgba(35,38,41,0.4) 50%, transparent 80%)",
        }}
      />

      <RevealOnScroll className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          Start your journey<br />today
        </h2>
        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of learners mastering English and Japanese.
          Get started in under a minute.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/auth/signup" className="cursor-pointer">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-7 rounded-full text-lg font-bold cursor-pointer shadow-2xl hover:-translate-y-1 transition-all group"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/why-dailylang" className="cursor-pointer">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-black hover:bg-white/10 px-12 py-7 rounded-full text-lg cursor-pointer hover:-translate-y-1 transition-all"
            >
              Learn More
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          No credit card required • Cancel anytime
        </p>
      </RevealOnScroll>
    </section>
  )
}
