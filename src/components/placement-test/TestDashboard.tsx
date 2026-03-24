"use client"

import { Home, Trophy, Lock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TestStep } from "@/hooks/placement-test/types"
import { getTestStepIcon } from "@/hooks/placement-test/types"

interface TestDashboardProps {
  testSteps: TestStep[]
  completedTests: string[]
  testScores: Record<string, number>
  overallProgress: number
  isStepUnlocked: (stepId: string) => boolean
  isStepCompleted: (stepId: string) => boolean
  onStartTest: (testId: string) => void
  onShowResults: () => void
}

export function TestDashboard({
  testSteps, completedTests, testScores, overallProgress,
  isStepUnlocked, isStepCompleted, onStartTest, onShowResults,
}: TestDashboardProps) {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-5 h-5" /><span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">Language Placement Test</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete each test in order to receive your comprehensive language level assessment.
          </p>
        </div>

        <Card className="p-6 mb-8 rounded-2xl shadow-lg bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-foreground">Overall Progress</h2>
              <p className="text-sm text-muted-foreground">{completedTests.length} of {testSteps.length} tests completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary-600">{overallProgress}%</span>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3 mb-6" />

          {/* Test Steps */}
          <div className="space-y-4">
            {testSteps.map((step) => {
              const Icon = getTestStepIcon(step.id)
              const isUnlocked = isStepUnlocked(step.id)
              const isCompleted = isStepCompleted(step.id)
              const score = testScores[step.id]

              return (
                <div
                  key={step.id}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all cursor-pointer",
                    isCompleted ? "border-success-300 bg-success-50"
                      : isUnlocked ? "border-primary-300 bg-primary-50 hover:border-primary-400"
                        : "border-border bg-muted/50 opacity-60 cursor-not-allowed",
                  )}
                  onClick={() => isUnlocked && !isCompleted && onStartTest(step.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      isCompleted ? "bg-success-100" : isUnlocked ? "bg-primary-100" : "bg-muted",
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6 text-success-600" />
                        : isUnlocked ? <Icon className="w-6 h-6 text-primary-600" />
                          : <Lock className="w-6 h-6 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{step.label}</h3>
                        {isCompleted && score !== undefined && (
                          <Badge className="bg-success-100 text-success-700 border-success-200">{score}%</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {isUnlocked && !isCompleted && (
                      <Button size="sm" className="bg-primary-600 hover:bg-primary-700">Start</Button>
                    )}
                    {isCompleted && (
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onStartTest(step.id) }}>Retake</Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* View Results Button */}
        {completedTests.length === testSteps.length && (
          <div className="text-center">
            <Button size="lg" onClick={onShowResults}
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg">
              <Trophy className="w-5 h-5 mr-2" /> View Final Results
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
