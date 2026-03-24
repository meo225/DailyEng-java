"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
  Globe,
  BookOpen,
} from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"

interface LanguageTest {
  id: string
  label: string
  icon: typeof Globe
  title: string
  description: string
  quote: string
  buttonText: string
  href: string
  image: string
  levelLabel: string
  levels: string
  levelBadgeColor: string
  accentColor: string
}

const languageTests: LanguageTest[] = [
  {
    id: "english",
    label: "English",
    icon: Globe,
    title: "Test Your English Level",
    description:
      "Discover your current English proficiency aligned to CEFR standards. Get personalized recommendations for IELTS, TOEFL, and Cambridge prep.",
    quote: "Knowing where you stand is the first step to reaching where you want to be.",
    buttonText: "Take English Test",
    href: "/placement-test?lang=en",
    image: "/test.png",
    levelLabel: "CEFR Levels",
    levels: "A1 → C2",
    levelBadgeColor: "text-secondary-600",
    accentColor: "bg-secondary-200 hover:bg-secondary-300 text-secondary-800",
  },
  {
    id: "japanese",
    label: "日本語",
    icon: BookOpen,
    title: "日本語レベルをチェック",
    description:
      "Discover your Japanese proficiency aligned to JLPT standards. Get personalized study plans for N5 to N1, J-TEST, and NAT-TEST preparation.",
    quote: "千里の道も一歩から — A journey of a thousand miles begins with a single step.",
    buttonText: "Take Japanese Test",
    href: "/placement-test?lang=ja",
    image: "/test.png",
    levelLabel: "JLPT Levels",
    levels: "N5 → N1",
    levelBadgeColor: "text-red-600",
    accentColor: "bg-red-100 hover:bg-red-200 text-red-800",
  },
]

export function TestLanguageSection() {
  const [activeTest, setActiveTest] = useState(0)
  const test = languageTests[activeTest]
  const IconComponent = test.icon

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          {/* Language tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {languageTests.map((t, i) => {
              const TabIcon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTest(i)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    activeTest === i
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {t.label}
                </button>
              )
            })}
          </div>

          <Card className="relative overflow-hidden border-0 shadow-xl rounded-3xl bg-linear-to-r from-secondary-50 to-white cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 w-fit border border-secondary-100">
                  <GraduationCap className="w-4 h-4" />
                  <span>Free Assessment</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {test.title}
                </h2>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {test.description}
                </p>

                <blockquote className="border-l-4 border-secondary-400 pl-4 mb-8 italic text-gray-500">
                  &quot;{test.quote}&quot;
                </blockquote>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={test.href} className="cursor-pointer">
                    <Button
                      size="lg"
                      variant="secondary"
                      className={`${test.accentColor} px-8 py-6 rounded-full hover:-translate-y-0.5 transition-all text-lg font-semibold group cursor-pointer`}
                    >
                      {test.buttonText}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    <span>Takes only 15 minutes</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 md:h-auto min-h-[300px] bg-primary-50">
                <Image
                  src={test.image}
                  alt={`${test.label} Language Level Test`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-l from-white/20 to-transparent" />

                {/* Level badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  <div className="text-xs text-gray-500 font-medium">
                    {test.levelLabel}
                  </div>
                  <div className={`text-lg font-bold ${test.levelBadgeColor}`}>
                    {test.levels}
                  </div>
                </div>

                {/* Stats badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      50K+ tests taken
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </RevealOnScroll>
      </div>
    </section>
  )
}
