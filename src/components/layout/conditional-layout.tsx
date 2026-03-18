"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/contexts/NavigationContext"
import { SkeletonRouter } from "@/components/layout/skeleton-router"

const noNavRoutes = ["/placement-test", "/speaking/session", "/vocab/", "/grammar/", "/build-plan", "/auth"]

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isNavigating, targetPath } = useNavigation()

  // Decide which path governs navbar visibility:
  // when navigating, use the target path so skeleton appears with correct chrome
  const effectivePath = isNavigating && targetPath ? targetPath : pathname
  const shouldHideNav = noNavRoutes.some((route) => effectivePath.startsWith(route))

  // Render skeleton for the target page during navigation
  const content = isNavigating && targetPath ? (
    <main className="min-h-screen">
      <SkeletonRouter targetPath={targetPath} />
    </main>
  ) : (
    children
  )

  if (shouldHideNav) {
    return <>{content}</>
  }

  return (
    <>
      <Navbar />
      {content}
      <Footer />
    </>
  )
}
