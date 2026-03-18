"use client"

import {
  Trophy, Target, TrendingUp, Award, RotateCcw, Home,
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts"
import type { TestStep } from "@/hooks/placement-test/types"
import { getTestStepIcon, calculateCEFRLevel } from "@/hooks/placement-test/types"

interface TestResultsProps {
  testSteps: TestStep[]
  testScores: Record<string, number>
  overallScore: number
  onRestart: () => void
}

export function TestResults({ testSteps, testScores, overallScore, onRestart }: TestResultsProps) {
  const cefrResult = calculateCEFRLevel(overallScore)

  const radarData = testSteps.map((step) => ({
    skill: step.label,
    score: testScores[step.id] || 0,
    fullMark: 100,
  }))

  const barData = testSteps.map((step) => ({
    name: step.label,
    score: testScores[step.id] || 0,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Test Completed!</h1>
          <p className="text-muted-foreground">Here&apos;s your comprehensive English assessment</p>
        </div>

        {/* CEFR Level Card */}
        <Card className="p-8 mb-8 rounded-2xl border-0 shadow-xl bg-card text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary-600" />
            <h2 className="text-xl font-bold text-foreground">Your CEFR Level</h2>
          </div>
          <div className={`text-7xl font-black ${cefrResult.color} mb-2`}>{cefrResult.level}</div>
          <p className="text-lg text-muted-foreground mb-4">{cefrResult.description}</p>
          <div className="flex items-center justify-center gap-2 bg-primary-50 rounded-full px-6 py-3 inline-flex">
            <Target className="w-5 h-5 text-primary-600" />
            <span className="font-bold text-primary-600">Overall Score: {overallScore}%</span>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-card">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" /> Skills Overview
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="var(--primary-500)" fill="var(--primary-500)" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-card">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-600" /> Score by Skill
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="score" fill="var(--primary-500)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Detailed Scores */}
        <Card className="p-6 rounded-2xl border-0 shadow-lg bg-card mb-8">
          <h3 className="font-bold text-foreground mb-6">Detailed Scores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testSteps.map((step) => {
              const score = testScores[step.id] || 0
              const Icon = getTestStepIcon(step.id)
              const skillCefr = calculateCEFRLevel(score)
              return (
                <div key={step.id} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{step.label}</p>
                      <p className={`text-sm font-medium ${skillCefr.color}`}>{skillCefr.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="font-bold text-foreground">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              )
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onRestart} variant="outline" className="gap-2 px-6 py-3 rounded-xl bg-transparent">
            <RotateCcw className="w-4 h-4" /> Retake Test
          </Button>
          <Link href="/">
            <Button className="gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700">
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
