"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { NotificationDropdown } from "./notification-dropdown"
import { ProfileDropdown } from "./profile-dropdown"

type NavItem = {
  href: string
  label: string
  dropdown?: Array<{ href: string; label: string }>
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/speaking", label: "Speaking Room" },
  { href: "/vocab", label: "Vocabulary Hub" },
  { href: "/grammar", label: "Grammar Hub" },
  { href: "/plan", label: "Study Plan" },
  { href: "/notebook", label: "Notebook" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session, status } = useSession()

  const isAuthenticated = status === "authenticated" && !!session?.user

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
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="px-3 py-1.5 rounded-xl text-sm font-semibold transition-all text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 flex items-center gap-1 cursor-pointer">
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link
                            href={subItem.href}
                            className={`w-full cursor-pointer ${
                              pathname.startsWith(subItem.href) ? "bg-secondary" : ""
                            }`}
                          >
                            {subItem.label}
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
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <NotificationDropdown />
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 cursor-pointer"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className="h-8 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-sm cursor-pointer"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

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
            {navItems.map((item) => {
              if ("dropdown" in item && item.dropdown) {
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.label}
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
                        {subItem.label}
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
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
