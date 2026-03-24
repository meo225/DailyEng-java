"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  MessageSquare,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"
import type { FeatureTab } from "@/types/home"

// ─── Types ─────────────────────────────────────────

interface FeatureTabsSectionProps {
  featureTabs: FeatureTab[]
}

// ─── Helpers ───────────────────────────────────────

function getTabIcon(tabId: string) {
  switch (tabId) {
    case "language-hub":
      return <BookOpen className="w-5 h-5" />
    case "speaking-room":
      return <MessageSquare className="w-5 h-5" />
    case "study-plan":
      return <Target className="w-5 h-5" />
    case "learning-profile":
      return <Sparkles className="w-5 h-5" />
    default:
      return <BookOpen className="w-5 h-5" />
  }
}

// ─── Component ─────────────────────────────────────

export function FeatureTabsSection({ featureTabs }: FeatureTabsSectionProps) {
  const [activeTab, setActiveTab] = useState("language-hub")

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Fluency
          </h2>
          <p className="text-xl text-gray-600">
            A complete ecosystem for language mastery
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col lg:flex-row gap-8">
          {/* Tabs Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-3">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "glass-card-strong ring-1 ring-primary-200 antigravity-shadow"
                    : "hover:bg-white/40 hover:backdrop-blur-sm"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-white text-gray-400 border border-gray-200 group-hover:border-primary-200 group-hover:text-primary-600"
                  }`}
                >
                  {getTabIcon(tab.id)}
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      activeTab === tab.id
                        ? "text-primary-900"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </h3>
                  {activeTab === tab.id && (
                    <p className="text-sm text-primary-600 mt-1 font-medium animate-fade-in">
                      Active Feature
                    </p>
                  )}
                </div>
                {activeTab === tab.id && (
                  <ChevronRight className="ml-auto w-5 h-5 text-primary-600" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="lg:w-2/3">
            <div className="antigravity-perspective">
            <div className="relative h-[500px] w-full glass-card-strong rounded-[2.5rem] border border-white/40 p-2 overflow-hidden antigravity-shadow">
              {featureTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`absolute inset-2 bg-white rounded-4xl flex flex-col transition-all duration-500 ease-in-out ${
                    activeTab === tab.id
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-8 z-0 pointer-events-none"
                  }`}
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-t-4xl">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 z-10" />
                    <Image
                      src={tab.image || "/placeholder.svg"}
                      alt={tab.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute bottom-6 left-8 z-20">
                      <div className="inline-block bg-secondary-400 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                        FEATURE
                      </div>
                      <h3 className="text-3xl font-bold text-white">
                        {tab.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1 bg-white rounded-b-4xl">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {tab.description}
                    </p>
                    <div className="flex gap-4 mt-6">
                      <Button
                        className="rounded-full px-6 bg-primary-600 hover:bg-primary-600 cursor-pointer"
                        onClick={() =>
                          (window.location.href = "/auth/signup")
                        }
                      >
                        Try for free
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
