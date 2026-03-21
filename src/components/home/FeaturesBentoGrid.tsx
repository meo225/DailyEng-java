import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mic,
  BookOpen,
  Zap,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"

export function FeaturesBentoGrid() {
  return (
    <section className="py-15 bg-linear-to-br from-primary-200 via-primary-50 to-secondary-100 relative overflow-hidden">
      {/* Antigravity background orb */}
      <div className="antigravity-orb w-80 h-80 bg-primary-200 -top-20 -right-20 antigravity-float-slow" />
      <div className="antigravity-orb w-64 h-64 bg-secondary-200 bottom-10 -left-16 antigravity-float-slow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-4xl sm:text-4xl font-bold text-primary-800 mb-6">
            Why Learners Choose DailyEng
          </h2>
          <p className="text-xl text-gray-600">
            We combine advanced AI with proven learning methods to help you
            achieve fluency faster.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          <SpeakFromDayOneCard />
          <ContextualLearningCard />
          <StayMotivatedCard />
          <DoraraCompanionCard />
        </div>
      </div>
    </section>
  )
}

// ─── Sub-components (one thing each) ───────────────

function SpeakFromDayOneCard() {
  return (
    <RevealOnScroll className="md:col-span-2">
      <Card className="h-full glass-card-strong antigravity-hover border border-white/40 hover:border-primary-200 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 overflow-hidden group cursor-pointer">
        <div className="flex-1 z-10">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Speak From Day One
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Don't just read about English. Practice real-life
            conversations with our AI tutor who listens, corrects your
            pronunciation, and helps you sound natural.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-accent-500" />{" "}
              Real-time pronunciation scoring
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-accent-500" />{" "}
              Context-based roleplays
            </li>
          </ul>
        </div>
        <div className="flex-1 relative h-50 w-full md:h-full bg-primary-50 rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          <Image
            src="/Speak-From-Day-One.jpg"
            alt="Speaking Practice"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Card>
    </RevealOnScroll>
  )
}

function ContextualLearningCard() {
  return (
    <RevealOnScroll delay={100}>
      <Card className="h-full glass-card-strong antigravity-hover border border-white/40 hover:border-primary-200 p-8 rounded-3xl flex flex-col justify-between group cursor-pointer">
        <div>
          <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">
            Contextual Learning
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Learn vocabulary and grammar in the context of stories and
            articles, not isolated lists.
          </p>
        </div>
        <div className="mt-6 rounded-xl overflow-hidden bg-gradient-to-br from-secondary-50 to-purple-50 border border-secondary-100 p-3.5 space-y-2">
          <p className="text-xs text-gray-600 leading-relaxed">
            The CEO delivered a{" "}
            <span className="inline font-bold text-secondary-600 bg-secondary-100 px-1 rounded">
              compelling
            </span>{" "}
            speech that inspired the whole team.
          </p>
          <div className="bg-white rounded-lg border border-secondary-100 p-2 flex items-start gap-2">
            <div className="flex-none w-7 h-7 bg-secondary-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">adj</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">compelling</p>
              <p className="text-[10px] text-gray-500 leading-tight">evoking interest or admiration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-secondary-100">
              <div className="h-1 rounded-full bg-secondary-400 w-[62%]" />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">62%</span>
          </div>
        </div>
      </Card>
    </RevealOnScroll>
  )
}

function StayMotivatedCard() {
  return (
    <RevealOnScroll delay={200}>
      <Card className="h-full glass-card-strong antigravity-hover border border-white/40 hover:border-primary-200 p-8 rounded-3xl flex flex-col justify-between group cursor-pointer">
        <div>
          <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Stay Motivated</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Daily streaks, XP rewards, and leaderboards designed to keep
            you coming back every day.
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <div className="bg-warning-100 px-3 py-1 rounded-lg text-warning-300 font-bold text-xs border border-warning-200/30">
            🔥 12 Day Streak
          </div>
          <div className="bg-primary-50 px-3 py-1 rounded-lg text-primary-700 font-bold text-xs border border-primary-100">
            🏆 Top 10
          </div>
        </div>
      </Card>
    </RevealOnScroll>
  )
}

function DoraraCompanionCard() {
  return (
    <RevealOnScroll className="md:col-span-2" delay={300}>
      <Card className="h-full glass-card-strong antigravity-hover border border-secondary-100/50 hover:border-secondary-200 p-8 rounded-3xl flex flex-col md:flex-row-reverse items-center gap-8 overflow-hidden group cursor-pointer">
        <div className="flex-1 z-10">
          <div className="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-2xl flex items-center justify-center mb-6 border border-secondary-100">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Dorara Companion
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Stuck on a word? Need grammar help? Dorara is your 24/7 AI
            companion ready to explain concepts instantly inside any
            lesson.
          </p>
          <Button
            variant="secondary"
            className="bg-secondary-300 hover:bg-secondary-400 text-white rounded-full cursor-pointer"
          >
            Chat with Dorara
          </Button>
        </div>
        <div className="flex-1 relative h-64 w-full md:h-full rounded-2xl overflow-hidden bg-secondary-50/50">
          <div className="absolute inset-0 bg-linear-to-r from-white/40 to-transparent z-10" />
          <Image
            src="/Dorara-Companion.jpg"
            alt="AI Companion"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </Card>
    </RevealOnScroll>
  )
}
