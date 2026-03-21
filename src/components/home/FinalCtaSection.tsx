import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "./RevealOnScroll"

export function FinalCtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary-600">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(var(--primary-50) 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        {/* Glassmorphic blur layer for depth */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Antigravity floating orbs */}
      <div className="antigravity-orb w-48 h-48 bg-primary-300 top-10 left-20 antigravity-float" style={{ opacity: 0.15 }} />
      <div className="antigravity-orb w-36 h-36 bg-secondary-300 bottom-10 right-16 antigravity-float" style={{ animationDelay: '2s', opacity: 0.12 }} />
      <div className="antigravity-orb w-24 h-24 bg-accent-300 top-1/3 right-1/4 antigravity-float" style={{ animationDelay: '4s', opacity: 0.1 }} />

      <RevealOnScroll className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white tracking-tight">
          Ready to speak English with confidence?
        </h2>
        <p className="text-xl text-primary-200 mb-12 max-w-2xl mx-auto">
          Join thousands of learners who are already improving their careers
          and lives with DailyEng.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="cursor-pointer">
            <Button
              size="lg"
              variant="default"
              className="border-2 border-primary-700 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800 rounded-full px-10 py-7 text-lg font-bold sm:w-auto cursor-pointer antigravity-shadow hover:-translate-y-1 transition-transform"
            >
              Get Started for Free
            </Button>
          </Link>
          <Link href="/placement-test" className="cursor-pointer">
            <Button
              size="lg"
              variant="default"
              className="border-2 border-primary-700 text-white hover:bg-primary-700 hover:border-primary-800 bg-transparent rounded-full px-10 py-7 text-lg font-semibold w-full sm:w-auto cursor-pointer glass-card hover:-translate-y-1 transition-transform"
            >
              Take Placement Test
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-primary-200 opacity-80">
          No credit card required • Cancel anytime
        </p>
      </RevealOnScroll>
    </section>
  )
}
