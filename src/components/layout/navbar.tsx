"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Menu, X, ChevronDown } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dynamic import with ssr:false — this component uses useAuth() and renders
// different content based on auth state. Excluding it from SSR prevents
// hydration mismatches since the server can't know the auth state.
const NavbarAuthSection = dynamic(
  () =>
    import("./navbar-auth-section").then((m) => ({
      default: m.NavbarAuthSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 rounded-xl bg-gray-100 animate-pulse hidden sm:block" />
        <div className="h-8 w-20 rounded-xl bg-gray-100 animate-pulse" />
      </div>
    ),
  }
)

type NavItemKey = "home" | "speaking_room" | "vocabulary_hub" | "grammar_hub" | "study_plan" | "notebook";

type NavItem = {
  href: string
  labelKey: NavItemKey
  dropdown?: Array<{ href: string; labelKey: string }>
}

const navItems: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/speaking", labelKey: "speaking_room" },
  { href: "/vocab", labelKey: "vocabulary_hub" },
  { href: "/grammar", labelKey: "grammar_hub" },
  { href: "/plan", labelKey: "study_plan" },
  { href: "/notebook", labelKey: "notebook" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()

  const isImmersivePage =
    pathname?.startsWith("/speaking/session/") ||
    (pathname?.startsWith("/vocab/") && pathname !== "/vocab") ||
    (pathname?.startsWith("/grammar/") && pathname !== "/grammar")

  if (isImmersivePage) return null

  return (
    <nav
      className="sticky top-0 z-40 px-3 pt-3"
      aria-label="Main navigation"
    >
      {/* Floating pill container with glassmorphism */}
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/60 bg-white/85 shadow-lg shadow-primary-100/30 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
        <div className="flex h-14 items-center justify-between px-4 sm:px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg transition-opacity hover:opacity-80"
          >
            <img
              src="/logo.png"
              alt="DailyEng Logo"
              className="h-9 w-9 rounded-xl object-cover shadow-sm"
            />
            <div>
              <span className="hidden text-xl sm:inline text-gray-800">Daily</span>
              <span className="hidden text-xl sm:inline text-primary-600 font-extrabold">Eng</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              if ("dropdown" in item && item.dropdown) {
                return (
                  <DropdownMenu key={item.labelKey}>
                    <DropdownMenuTrigger className="px-3 py-1.5 rounded-xl text-sm font-semibold transition-all text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 flex items-center gap-1 cursor-pointer">
                      {t(`nav.${item.labelKey}`)}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white border-gray-200 shadow-lg">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link href={subItem.href} className="cursor-pointer">
                            {t(`nav.${subItem.labelKey}`)}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13.5px] px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-sm shadow-primary-200"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  {t(`nav.${item.labelKey}`)}
                </Link>
              )
            })}
          </div>

          {/* Right Section — dynamic import, never SSR'd */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <NavbarAuthSection />

            {/* Mobile toggle — min 44x44 touch target per ux skill */}
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
            <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100 mb-2 pb-3">
              <span className="text-sm font-semibold text-gray-500">{t("common.language")}</span>
              <LanguageSwitcher />
            </div>
            {navItems.map((item) => {
              if ("dropdown" in item && item.dropdown) {
                return (
                  <div key={item.labelKey} className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {t(`nav.${item.labelKey}`)}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block pl-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                          pathname.startsWith(subItem.href)
                            ? "bg-primary-500 text-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(`nav.${subItem.labelKey}`)}
                      </Link>
                    ))}
                  </div>
                )
              }

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
                  {t(`nav.${item.labelKey}`)}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
