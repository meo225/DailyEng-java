import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"

export function TestEnglishSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <Card className="relative overflow-hidden border-0 shadow-xl rounded-3xl bg-linear-to-r from-secondary-50 to-white cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0">
              <TestEnglishContent />
              <TestEnglishImage />
            </div>
          </Card>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─── Sub-components ────────────────────────────────

function TestEnglishContent() {
  return (
    <div className="p-8 md:p-12 flex flex-col justify-center">
      <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 w-fit border border-secondary-100 cursor-pointer hover:bg-primary-100 transition-colors">
        <GraduationCap className="w-4 h-4" />
        <span>Free Assessment</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Test Your English Level
      </h2>

      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
        Discover your current proficiency with our comprehensive
        placement test. Get personalized recommendations based on
        your results.
      </p>

      <blockquote className="border-l-4 border-secondary-400 pl-4 mb-8 italic text-gray-500">
        &quot;Knowing where you stand is the first step to reaching where
        you want to be.&quot;
      </blockquote>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/placement-test" className="cursor-pointer">
          <Button
            size="lg"
            variant={"secondary"}
            className="bg-secondary-200 hover:bg-secondary-300 text-secondary-800 px-8 py-6 rounded-full hover:-translate-y-0.5 transition-all text-lg font-semibold group cursor-pointer"
          >
            Take the Test
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CheckCircle2 className="w-4 h-4 text-accent-500" />
          <span>Takes only 15 minutes</span>
        </div>
      </div>
    </div>
  )
}

function TestEnglishImage() {
  return (
    <div className="relative h-64 md:h-auto min-h-[300px] bg-primary-50">
      <Image
        src="/test.png"
        alt="English Level Test"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-l from-white/20 to-transparent" />

      {/* Floating badges */}
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
        <div className="text-xs text-gray-500 font-medium">
          CEFR Levels
        </div>
        <div className="text-lg font-bold text-secondary-600">
          A1 - C2
        </div>
      </div>

      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary-500" />
          <span className="text-sm font-semibold text-gray-700">
            50K+ tests taken
          </span>
        </div>
      </div>
    </div>
  )
}
