import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Check,
} from "lucide-react"

const STUDY_PLAN_GOALS = [
  "Pass IELTS/TOEFL exam",
  "Improve for career",
  "Travel confidently",
  "Academic studies",
]

const STUDY_PLAN_STATS = [
  { value: "5 min", label: "To complete" },
  { value: "10+", label: "Course matches" },
  { value: "100%", label: "Personalized" },
]

export function BuildStudyPlanSection() {
  return (
    <section className="py-24 bg-linear-to-br from-primary-200 via-primary-100 to-accent-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <StudyPlanContent />
          <StudyPlanPreview />
        </div>
      </div>
    </section>
  )
}

// ─── Sub-components ────────────────────────────────

function StudyPlanContent() {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
        <Target className="w-4 h-4" />
        Personalized Learning
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Build Your
        <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-accent-500">
          Study Plan
        </span>
      </h2>

      <p className="text-lg text-gray-600 max-w-lg">
        Tell us about your goals, schedule, and preferences. We will
        create a customized learning roadmap designed specifically for
        your success.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/build-plan">
          <Button
            size="lg"
            className="px-8 py-6 text-lg rounded-full cursor-pointer"
          >
            Build My Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <Button
          size="lg"
          variant="outline"
          className="px-8 py-6 text-lg rounded-full cursor-pointer bg-transparent border-primary-300 text-primary-600 hover:bg-primary-50"
        >
          Learn More
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-8 pt-6">
        {STUDY_PLAN_STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StudyPlanPreview() {
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-100">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                Study Plan Builder
              </div>
              <div className="text-sm text-gray-500">
                Question 1 of 10
              </div>
            </div>
          </div>

          <Progress value={10} className="h-2 [&>div]:bg-primary-600" />

          <div>
            <h3 className="font-semibold text-gray-900">
              What is your primary goal?
            </h3>
            <div className="space-y-3">
              {STUDY_PLAN_GOALS.map((option, idx) => (
                <div
                  key={option}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    idx === 0
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        idx === 0
                          ? "border-primary-600 bg-primary-600"
                          : "border-gray-300"
                      }`}
                    >
                      {idx === 0 && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span
                      className={
                        idx === 0
                          ? "font-medium text-primary-700"
                          : "text-gray-600"
                      }
                    >
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 bg-primary-600 text-white rounded-2xl p-4 shadow-lg cursor-pointer">
        <BookOpen className="w-6 h-6" />
      </div>
      <div className="absolute -bottom-4 -left-4 bg-accent-500 text-white rounded-2xl p-4 shadow-lg cursor-pointer">
        <GraduationCap className="w-6 h-6" />
      </div>
    </div>
  )
}
