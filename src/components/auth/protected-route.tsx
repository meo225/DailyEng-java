"use client"

import React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Lock,
  LogIn,
  UserPlus,
  BookOpen,
  Mic2,
  Brain,
  NotebookPen,
  LayoutDashboard,
  GraduationCap,
  UserIcon,
  TrendingUp,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  pageName?: string
  pageDescription?: string
  pageIcon?: React.ReactNode
}

// Feature highlights per page type (used on the right side panel)
const featureHighlights = [
  { icon: TrendingUp, text: "Track your learning progress" },
  { icon: Sparkles, text: "Get AI-powered recommendations" },
  { icon: Star, text: "Earn XP and achievements" },
  { icon: Zap, text: "Save vocabulary and notes" },
]

// Decorative floating pill shapes (CSS-only, respects reduced motion)
function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string
  delay?: number
}) {
  return (
    <div
      className={`absolute rounded-full opacity-20 blur-3xl motion-safe:animate-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden
    />
  )
}

export function ProtectedRoute({
  children,
  pageName = "this page",
  pageDescription = "Sign in to access all features and track your learning progress.",
  pageIcon,
}: ProtectedRouteProps) {
  const { user, status } = useAuth()
  const isAuthenticated = status === "authenticated" && !!user

  // Show spinner only while AuthContext is still hydrating auth state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-violet-50 flex items-center justify-center px-4 py-16">
        {/* Decorative background orbs */}
        <FloatingOrb className="w-96 h-96 bg-primary-400 -top-24 -left-24" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-violet-400 top-1/2 -right-20" delay={1500} />
        <FloatingOrb className="w-64 h-64 bg-teal-300 bottom-0 left-1/3" delay={3000} />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        {/* Main card */}
        <div className="relative z-10 w-full max-w-lg">
          {/* Pill banner */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 border border-primary-200 text-primary-700 text-sm font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Free to join · No credit card
            </span>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-2xl shadow-primary-100/40 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary-400 via-violet-400 to-teal-400" />

            <div className="p-8">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-5 shadow-md shadow-primary-100">
                {pageIcon || <Lock className="w-9 h-9 text-primary-600" />}
              </div>

              {/* Heading */}
              <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
                Access {pageName}
              </h1>
              <p className="text-gray-500 text-center text-sm leading-relaxed mb-7">
                {pageDescription}
              </p>

              {/* Feature list */}
              <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100 p-4 mb-7">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  What you'll unlock
                </p>
                <ul className="space-y-2.5">
                  {featureHighlights.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <span className="flex-none w-7 h-7 rounded-lg bg-white shadow-sm border border-primary-100 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary-500" />
                      </span>
                      <span className="text-sm text-gray-700 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold shadow-lg shadow-primary-200 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <Link href="/auth/signin" className="flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 font-bold bg-white transition-all duration-200 cursor-pointer"
                >
                  <Link href="/auth/signup" className="flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4 text-primary-600" />
                    <span className="text-primary-600">Sign Up Free</span>
                  </Link>
                </Button>
              </div>

              {/* Footer */}
              <p className="mt-5 text-center text-sm text-gray-400">
                Just browsing?{" "}
                <Link href="/" className="text-primary-500 hover:text-primary-600 font-semibold underline-offset-2 hover:underline transition-colors">
                  Return to Home
                </Link>
              </p>
            </div>
          </div>

          {/* Social proof */}
          <p className="text-center mt-4 text-xs text-gray-400">
            Joined by <span className="font-semibold text-primary-600">10,000+</span> learners worldwide
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Export common page icons for convenience
export const PageIcons = {
  speaking: <Mic2 className="w-9 h-9 text-primary-600" />,
  vocabulary: <BookOpen className="w-9 h-9 text-primary-600" />,
  grammar: <Brain className="w-9 h-9 text-primary-600" />,
  notebook: <NotebookPen className="w-9 h-9 text-primary-600" />,
  dashboard: <LayoutDashboard className="w-9 h-9 text-primary-600" />,
  studyPlan: <GraduationCap className="w-9 h-9 text-primary-600" />,
  profile: <UserIcon className="w-9 h-9 text-primary-600" />,
}
