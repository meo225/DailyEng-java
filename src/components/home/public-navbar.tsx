"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/why-dailylang", label: "Why DailyLang" },
  { href: "/how-it-works", label: "How It Works" },
]

export function PublicNavbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-40 px-3 pt-3"
      aria-label="Public navigation"
    >
      <div
        className="mx-auto max-w-7xl rounded-2xl border border-white/60 bg-white/80 shadow-lg shadow-primary-100/30 backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/65"
        style={{
          boxShadow:
            "0 4px 24px rgba(79, 70, 229, 0.08), 0 1px 3px rgba(0,0,0,0.04), 0 12px 40px -8px rgba(79, 70, 229, 0.06)",
        }}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="DailyLang Logo"
              width={36}
              height={36}
              className="rounded-xl object-cover shadow-sm"
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <div>
              <span className="hidden text-xl sm:inline text-gray-800">Daily</span>
              <span className="hidden text-xl sm:inline text-primary-600 font-extrabold">Lang</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {publicNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13.5px] px-3 py-1.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-sm shadow-primary-200 hover:-translate-y-0.5"
                      : "text-gray-500 hover:text-gray-900 hover:bg-white/60 hover:backdrop-blur-sm"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right Section: Login / Sign Up */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-xl cursor-pointer"
            >
              <Link href="/auth/signin">
                Log In
              </Link>
            </Button>
            <Button
              asChild
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-5 py-2 text-sm font-bold cursor-pointer hover:-translate-y-0.5 transition-transform antigravity-shadow"
            >
              <Link href="/auth/signup">
                Sign Up
              </Link>
            </Button>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 pb-4 pt-3 space-y-1">
            {publicNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="border-t border-gray-100 pt-3 mt-2 space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl cursor-pointer text-sm font-semibold"
              >
                <Link href="/auth/signin" onClick={() => setMobileOpen(false)}>
                  Log In
                </Link>
              </Button>
              <Button
                asChild
                className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl cursor-pointer text-sm font-bold"
              >
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                  Sign Up Free
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
