import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle2,
  XCircle,
  Brain,
  RefreshCw,
  Route,
  ArrowRight,
  Globe,
  Sparkles,
  Bot,
  Timer,
  Map,
  BookOpen,
  MessageSquare,
  Target,
} from "lucide-react"
import { PublicNavbar } from "@/components/home/public-navbar"
import { RevealOnScroll } from "@/components/home/RevealOnScroll"
import { FinalCtaSection } from "@/components/home/FinalCtaSection"

const dailylangBenefits = [
  "AI-Powered Speaking Practice",
  "Contextual Vocabulary Learning",
  "Personalized Study Plans",
  "Real-Time Pronunciation Scoring",
  "Multi-Language Support (EN + JP)",
  "AI Grammar Companion",
]

const traditionalDrawbacks = [
  "Generic Multiple-Choice Drills",
  "Vocabulary Without Context",
  "One-Size-Fits-All Curriculum",
  "No Speaking Feedback",
  "Single Language Focus",
  "Static Grammar Rules",
]

const fluencyCards = [
  {
    icon: Bot,
    title: "AI-Powered Practice",
    desc: "Real conversations and roleplay with AI tutors, not multiple choice quizzes. Practice speaking, listening, and thinking in your target language.",
  },
  {
    icon: Timer,
    title: "Smart SRS",
    desc: "Science-backed spaced repetition with smart flashcards. Master Kanji, grammar points, and vocabulary through optimally-timed reviews.",
  },
  {
    icon: Map,
    title: "Study Roadmap",
    desc: "Adaptive learning paths customized to your goals — whether it's IELTS, JLPT, business communication, or travel.",
  },
]

export default function WhyDailyLangPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary-200 selection:text-primary-900">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="antigravity-orb w-72 h-72 bg-primary-300 top-10 -left-20 antigravity-float-slow" />
        <div className="antigravity-orb w-56 h-56 bg-secondary-200 bottom-10 right-20 antigravity-float-slow" style={{ animationDelay: "3s" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <RevealOnScroll>
            <div className="glass-card inline-flex items-center gap-2 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-primary-100 cursor-pointer">
              <Sparkles className="w-4 h-4 fill-primary-400 text-primary-600" />
              <span>Why DailyLang?</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 tracking-tight leading-[1.1]">
              Learn Smarter,{" "}
              <span className="text-primary-500">Not Harder</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Unlike traditional apps, DailyLang uses AI-powered immersion to
              teach you languages in context — not through boring drills.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* The DailyLang Way — Side-by-side comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              The DailyLang Way
            </h2>
            <p className="text-gray-500 text-lg">
              See how we compare to typical language learning apps
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DailyLang card */}
            <RevealOnScroll>
              <Card className="h-full rounded-3xl border-2 border-primary-100 bg-primary-50/30 p-8 hover:border-primary-200 transition-colors">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">DailyLang</h3>
                </div>
                <div className="space-y-4">
                  {dailylangBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </RevealOnScroll>

            {/* Traditional apps card */}
            <RevealOnScroll delay={100}>
              <Card className="h-full rounded-3xl border border-gray-200 bg-gray-50/50 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gray-300 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-500">Traditional Apps</h3>
                </div>
                <div className="space-y-4">
                  {traditionalDrawbacks.map((drawback) => (
                    <div key={drawback} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-gray-500">{drawback}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Built for Real Fluency — 3-column features */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="antigravity-orb w-80 h-80 bg-primary-200 -top-20 -right-20 antigravity-float-slow" />
        <div className="antigravity-orb w-64 h-64 bg-secondary-200 bottom-10 -left-16 antigravity-float-slow" style={{ animationDelay: "4s" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Real Fluency
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Not just vocabulary lists — complete language mastery through
              AI-driven immersive practice.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {fluencyCards.map((card, index) => (
              <RevealOnScroll key={card.title} delay={index * 120}>
                <Card className="h-full bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg p-8 rounded-3xl flex flex-col cursor-pointer transition-all group">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                    <card.icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Languages We Support */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Languages We Support
            </h2>
            <p className="text-lg text-gray-500">
              Start your journey in one of our supported languages.
            </p>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 gap-8">
            <RevealOnScroll>
              <Card className="h-full border-2 border-primary-100 hover:border-primary-300 p-10 rounded-3xl text-center cursor-pointer group transition-all hover:shadow-lg">
                <div className="w-16 h-16 mx-auto mb-5 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <Globe className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">English</h3>
                <p className="text-gray-500 text-sm mb-5">
                  IELTS · TOEFL · Cambridge · Business · Conversation
                </p>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available Now
                </div>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <Card className="h-full border-2 border-red-100 hover:border-red-300 p-10 rounded-3xl text-center cursor-pointer group transition-all hover:shadow-lg">
                <div className="w-16 h-16 mx-auto mb-5 bg-red-50 rounded-2xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <Globe className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Japanese</h3>
                <p className="text-gray-500 text-sm mb-5">
                  JLPT · J-TEST · NAT-TEST · Kanji · Conversation
                </p>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available Now
                </div>
              </Card>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={200} className="text-center mt-10">
            <p className="text-sm text-gray-400 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              More languages coming soon — Korean, Chinese, and more
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <FinalCtaSection />
    </div>
  )
}
