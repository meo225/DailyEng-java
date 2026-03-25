import type React from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { SessionProvider } from "@/components/providers/session-provider";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { LazyLayoutComponents } from "@/components/layout/lazy-layout-components";
import "@/app/globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { XpToastProvider } from "@/components/xp/xp-toast";
import { LevelUpProvider } from "@/components/xp/xp-level-up-modal";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DailyLang - Learn Languages by Interaction!",
  description:
    "Master new languages with AI-powered vocabulary, speaking, and grammar lessons.",
  icons: {
    icon: "/dailylang-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${jakarta.variable} bg-background text-foreground`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProfileProvider>
              <XpToastProvider>
              <LevelUpProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <NavigationProvider>
                  <ConditionalLayout>
                    <main className="min-h-screen">{children}</main>
                  </ConditionalLayout>
                </NavigationProvider>
                <LazyLayoutComponents />
              </Suspense>
              </LevelUpProvider>
              </XpToastProvider>
            </UserProfileProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}


