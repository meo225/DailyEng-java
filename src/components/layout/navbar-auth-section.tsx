"use client"

import { useAuth } from "@/contexts/AuthContext"
import { NotificationDropdown } from "./notification-dropdown"
import { ProfileDropdown } from "./profile-dropdown"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

/**
 * Auth-dependent section of the navbar.
 * Loaded via dynamic import (ssr: false) to prevent hydration mismatches.
 * This component is NEVER rendered on the server — only on the client.
 */
export function NavbarAuthSection() {
  const { user, status } = useAuth()
  const { t } = useTranslation()
  const isAuthenticated = status === "authenticated" && !!user

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 rounded-xl bg-gray-100 animate-pulse hidden sm:block" />
        <div className="h-8 w-20 rounded-xl bg-gray-100 animate-pulse" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <>
        <NotificationDropdown />
        <ProfileDropdown />
      </>
    )
  }

  return (
    <>
      <Link href="/auth/signin">
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 cursor-pointer"
        >
          {t("auth.sign_in")}
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button
          size="sm"
          className="h-8 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-sm cursor-pointer"
        >
          {t("auth.register")}
        </Button>
      </Link>
    </>
  )
}
