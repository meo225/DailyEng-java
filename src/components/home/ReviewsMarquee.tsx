import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"
import type { Review } from "@/types/home"

// ─── Types ─────────────────────────────────────────

interface ReviewsMarqueeProps {
  reviews: Review[]
  onViewAll: () => void
}

interface ReviewCardProps {
  review: Review
  variant?: "default" | "verified" | "toefl"
}

// ─── Sub-components ────────────────────────────────

function ReviewCard({ review, variant = "default" }: ReviewCardProps) {
  return (
    <Card className="p-6 border-0 shadow-sm bg-white rounded-2xl cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative">
          <Image
            src={review.avatar || "/placeholder.svg"}
            alt={review.name}
            fill
            sizes="40px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-900">
            {review.name}
          </p>
          {variant === "verified" ? (
            <p className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full inline-block">
              Verified Student
            </p>
          ) : variant === "toefl" ? (
            <p className="text-xs text-gray-500">TOEFL 105</p>
          ) : (
            <p className="text-xs text-gray-500">
              IELTS {review.ielts}
            </p>
          )}
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        &quot;{review.content}&quot;
      </p>
    </Card>
  )
}

// ─── Component ─────────────────────────────────────

export function ReviewsMarquee({ reviews, onViewAll }: ReviewsMarqueeProps) {
  return (
    <section className="py-24 bg-primary-50 overflow-hidden">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold text-primary-900 mb-2">
            Learner Stories
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-medium text-primary-600">
              4.8/5 average rating
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="hidden sm:flex bg-white hover:bg-white cursor-pointer"
          onClick={onViewAll}
        >
          View all reviews
        </Button>
      </RevealOnScroll>

      <div className="relative w-full">
        <div className="absolute top-0 left-0 right-0 h-12 bg-linear-to-b from-primary-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-primary-50 to-transparent z-10 pointer-events-none" />

        <div
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Column 1 - Scroll Up */}
          <div className="space-y-6 animate-scroll-up hover:paused">
            {[...reviews, ...reviews].map((review, idx) => (
              <ReviewCard key={`col1-${idx}`} review={review} />
            ))}
          </div>

          {/* Column 2 - Scroll Down */}
          <div className="space-y-6 animate-scroll-down hover:paused hidden md:block">
            {[...reviews, ...reviews].reverse().map((review, idx) => (
              <ReviewCard key={`col2-${idx}`} review={review} variant="verified" />
            ))}
          </div>

          {/* Column 3 - Scroll Up */}
          <div className="space-y-6 animate-scroll-up hover:paused hidden lg:block">
            {[...reviews, ...reviews].map((review, idx) => (
              <ReviewCard key={`col3-${idx}`} review={review} variant="toefl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
