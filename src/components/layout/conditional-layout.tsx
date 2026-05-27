"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/navbar"
import { useNavigation } from "@/contexts/NavigationContext"
import { SkeletonRouter } from "@/components/layout/skeleton-router"
import { ProtectedRoute, PageIcons } from "@/components/auth/protected-route"

// Footer is always below the fold — defer its JS to reduce initial bundle
const Footer = dynamic(
  () => import("@/components/layout/footer").then((m) => m.Footer),
  { ssr: true }
)

const noNavPrefixRoutes = ["/placement-test", "/speaking-room/session", "/vocabulary-hub/", "/grammar-hub/", "/build-plan", "/auth", "/why-dailylang", "/how-it-works"]
const noNavExactRoutes = ["/"]

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isNavigating, targetPath } = useNavigation()

  // Decide which path governs navbar visibility & protection:
  // when navigating, use the target path so skeleton appears with correct chrome/auth gate
  const effectivePath = isNavigating && targetPath ? targetPath : pathname
  const shouldHideNav =
    noNavExactRoutes.includes(effectivePath) ||
    noNavPrefixRoutes.some((route) => effectivePath.startsWith(route))

  const isPublicRoute = (path: string) => {
    const publicPrefixes = ["/auth", "/why-dailylang", "/how-it-works", "/placement-test"]
    const isPublicExact = path === "/"
    const isPublicPrefix = publicPrefixes.some((prefix) => path.startsWith(prefix))
    return isPublicExact || isPublicPrefix
  }

  const requiresAuth = !isPublicRoute(effectivePath)

  const getPageMeta = (path: string) => {
    if (path.startsWith("/vocabulary-hub") || path.startsWith("/vocab")) {
      return {
        pageName: "Vocabulary Hub",
        pageDescription: "Learn and review English vocabulary using Spaced Repetition.",
        pageIcon: PageIcons.vocabulary,
      }
    }
    if (path.startsWith("/speaking-room")) {
      return {
        pageName: "Speaking Room",
        pageDescription: "Practice speaking English with AI-powered feedback.",
        pageIcon: PageIcons.speaking,
      }
    }
    if (path.startsWith("/grammar-hub") || path.startsWith("/grammar")) {
      return {
        pageName: "Grammar Hub",
        pageDescription: "Learn English grammar rules and practice with exercises.",
        pageIcon: PageIcons.grammar,
      }
    }
    if (path.startsWith("/notebook")) {
      return {
        pageName: "Notebook",
        pageDescription: "Save and organize your vocabulary and grammar.",
        pageIcon: PageIcons.notebook,
      }
    }
    if (path.startsWith("/study-plan") || path.startsWith("/build-plan")) {
      return {
        pageName: "Study Plan",
        pageDescription: "Plan your study schedule and track your progress.",
        pageIcon: PageIcons.studyPlan,
      }
    }
    if (path.startsWith("/user/profile")) {
      return {
        pageName: "Profile",
        pageDescription: "View your learning stats and achievements.",
        pageIcon: PageIcons.profile,
      }
    }
    if (path.startsWith("/user/settings")) {
      return {
        pageName: "Settings",
        pageDescription: "Manage your account preferences.",
        pageIcon: PageIcons.profile,
      }
    }
    if (path.startsWith("/user/notifications")) {
      return {
        pageName: "Notifications",
        pageDescription: "Stay updated with your learning schedule.",
        pageIcon: PageIcons.profile,
      }
    }
    if (path.startsWith("/leaderboard")) {
      return {
        pageName: "Leaderboard",
        pageDescription: "Track your learning progress against others.",
        pageIcon: PageIcons.dashboard,
      }
    }
    return {
      pageName: "this page",
      pageDescription: "Sign in to access all features and track your learning progress.",
      pageIcon: undefined,
    }
  }

  // Render skeleton for the target page during navigation
  const content = isNavigating && targetPath ? (
    <main className="min-h-screen">
      <SkeletonRouter targetPath={targetPath} />
    </main>
  ) : (
    children
  )

  const pageMeta = getPageMeta(effectivePath)

  const wrappedContent = requiresAuth ? (
    <ProtectedRoute
      pageName={pageMeta.pageName}
      pageDescription={pageMeta.pageDescription}
      pageIcon={pageMeta.pageIcon}
    >
      {content}
    </ProtectedRoute>
  ) : (
    content
  )

  if (shouldHideNav) {
    return <>{wrappedContent}</>
  }

  return (
    <>
      <Navbar />
      {wrappedContent}
      <Footer />
    </>
  )
}
