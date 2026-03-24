import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Globe,
  Target,
  BookOpen,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Languages,
  MessageSquare,
  Flame,
  Trophy,
} from "lucide-react"
import { PublicNavbar } from "@/components/home/public-navbar"
import { RevealOnScroll } from "@/components/home/RevealOnScroll"
import { FinalCtaSection } from "@/components/home/FinalCtaSection"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary-200 selection:text-primary-900">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="antigravity-orb w-80 h-80 bg-primary-300 -top-10 -right-20 antigravity-float-slow" />
        <div className="antigravity-orb w-64 h-64 bg-secondary-200 bottom-0 left-10 antigravity-float-slow" style={{ animationDelay: "4s" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <RevealOnScroll>
            <div className="glass-card inline-flex items-center gap-2 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-primary-100">
              <BookOpen className="w-4 h-4" />
              <span>HOW IT WORKS</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 tracking-tight">
              How DailyLang Works
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              From zero to conversational in 4 simple steps — no boring
              textbooks required.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Step 1 — Choose Your Language (content left, preview right) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Content */}
              <div className="lg:w-1/2 order-2 lg:order-1">
                <span className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-3 block">01</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Language
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  Pick English or Japanese. Take a quick placement test to find
                  your exact level — from absolute beginner to advanced.
                </p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-200 cursor-pointer">
                    <Globe className="w-4 h-4" />
                    English
                  </span>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:border-primary-300 transition-colors cursor-pointer">
                    <Globe className="w-4 h-4" />
                    Japanese
                  </span>
                </div>
              </div>

              {/* Preview */}
              <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="glass-card-strong rounded-3xl p-8 antigravity-shadow">
                  <div className="text-center space-y-5">
                    <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center">
                      <Languages className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Select a Language</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card rounded-2xl p-5 text-center border-2 border-primary-300 bg-primary-50/50 cursor-pointer">
                        <Globe className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <p className="font-bold text-gray-800 text-sm">English</p>
                        <p className="text-xs text-gray-400 mt-1">IELTS · TOEFL · Business</p>
                      </div>
                      <div className="glass-card rounded-2xl p-5 text-center hover:border-red-200 transition-colors cursor-pointer">
                        <Globe className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <p className="font-bold text-gray-800 text-sm">Japanese</p>
                        <p className="text-xs text-gray-400 mt-1">JLPT · Kanji · Business</p>
                      </div>
                    </div>
                    <Button className="w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white py-5 font-semibold cursor-pointer">
                      Start Placement Test
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Step 2 — Personalized Study Plan (content right, preview left) */}
      <section className="py-20 bg-linear-to-br from-primary-50 to-secondary-50/30 relative overflow-hidden">
        <div className="antigravity-orb w-48 h-48 bg-primary-200 top-20 -left-10 antigravity-float-slow" style={{ opacity: 0.15 }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Preview (left on desktop) */}
              <div className="lg:w-1/2">
                <div className="glass-card-strong rounded-3xl p-8 antigravity-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Your Study Plan</p>
                        <p className="text-xs text-gray-400">Customized for your goals</p>
                      </div>
                    </div>
                    {[
                      { week: "Week 1-2", topic: "Foundation & Core Vocabulary", progress: 100 },
                      { week: "Week 3-4", topic: "Grammar Patterns", progress: 65 },
                      { week: "Week 5-6", topic: "Speaking Practice", progress: 20 },
                      { week: "Week 7-8", topic: "Test Preparation", progress: 0 },
                    ].map((item) => (
                      <div key={item.week} className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-semibold text-gray-800">{item.week}</p>
                          <span className="text-xs text-gray-400">{item.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{item.topic}</p>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div
                            className="h-1.5 bg-primary-500 rounded-full transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content (right on desktop) */}
              <div className="lg:w-1/2">
                <span className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-3 block">02</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Personalized Study Plan
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  AI creates a customized roadmap based on your goals — whether
                  it&apos;s passing IELTS, achieving JLPT N2, mastering business
                  communication, or preparing for travel.
                </p>
                <ul className="space-y-3">
                  {["Adapts to your schedule", "Tracks your weak areas", "Adjusts difficulty automatically"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Step 3 — Learn Daily (content left, preview right) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Content */}
              <div className="lg:w-1/2 order-2 lg:order-1">
                <span className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-3 block">03</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Learn Daily, 15 Minutes
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  Practice vocabulary flashcards with spaced repetition, speak
                  with AI tutors, and learn grammar in real context. Bite-sized
                  lessons that fit your busy life.
                </p>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 bg-primary-50 px-4 py-2 rounded-full text-primary-700 font-semibold text-sm border border-primary-100">
                    <BookOpen className="w-4 h-4" />
                    Flashcards
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-secondary-50 px-4 py-2 rounded-full text-secondary-700 font-semibold text-sm border border-secondary-100">
                    <MessageSquare className="w-4 h-4" />
                    Speaking
                  </div>
                </div>
              </div>

              {/* Preview — Flashcard */}
              <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="glass-card-strong rounded-3xl p-8 antigravity-shadow">
                  <div className="text-center space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8">
                      <p className="text-5xl font-bold text-gray-800 mb-2">食べる</p>
                      <p className="text-lg text-gray-500 mb-1">taberu</p>
                      <p className="text-sm text-gray-400">to eat</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      {[
                        { label: "Again", color: "bg-red-50 text-red-600 border-red-100" },
                        { label: "Hard", color: "bg-orange-50 text-orange-600 border-orange-100" },
                        { label: "Good", color: "bg-green-50 text-green-600 border-green-100" },
                        { label: "Easy", color: "bg-primary-50 text-primary-600 border-primary-100" },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          className={`px-4 py-2 rounded-xl text-sm font-bold ${btn.color} border cursor-pointer hover:scale-105 transition-transform`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Card 3 of 20</span>
                      <span>Daily Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Step 4 — Track Progress (content right, preview left) */}
      <section className="py-20 bg-linear-to-br from-primary-50 to-secondary-50/30 relative overflow-hidden">
        <div className="antigravity-orb w-56 h-56 bg-secondary-200 bottom-10 right-10 antigravity-float-slow" style={{ opacity: 0.15 }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Preview (left on desktop) */}
              <div className="lg:w-1/2">
                <div className="glass-card-strong rounded-3xl p-8 antigravity-shadow">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-800">Your Progress</p>
                      <div className="inline-flex items-center gap-1.5 bg-warning-100 px-3 py-1.5 rounded-lg text-warning-300 font-bold text-xs border border-warning-200/30">
                        <Flame className="w-3 h-3" />
                        12 Day Streak
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Words Learned", value: "847" },
                        { label: "Hours Studied", value: "32" },
                        { label: "Current Level", value: "B1" },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                          <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                          <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Weekly chart */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-sm font-semibold text-gray-700 mb-3">This Week</p>
                      <div className="flex items-end gap-2 h-20">
                        {[40, 65, 80, 55, 90, 70, 45].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-primary-400 rounded-md transition-all"
                              style={{ height: `${h}%` }}
                            />
                            <span className="text-[10px] text-gray-400">
                              {["M", "T", "W", "T", "F", "S", "S"][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievement */}
                    <div className="flex items-center gap-3 bg-primary-50 rounded-xl p-3 border border-primary-100">
                      <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">Achievement Unlocked!</p>
                        <p className="text-xs text-gray-500">Vocabulary Champion — 500 words</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content (right on desktop) */}
              <div className="lg:w-1/2">
                <span className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-3 block">04</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Track Your Progress
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  See your improvements with detailed analytics — streaks,
                  achievements, and leveling up to keep you motivated every day.
                </p>
                <ul className="space-y-3">
                  {["Daily streak tracking", "Weekly performance reports", "Gamified achievements"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <FinalCtaSection />
    </div>
  )
}
