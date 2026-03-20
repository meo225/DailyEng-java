"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee"
import type { Review } from "@/types/home"

// ReviewsDialog is only shown on button click — dynamic import avoids
// loading 239 lines + Dialog/images until actually needed
const ReviewsDialog = dynamic(
  () => import("@/components/home/ReviewsDialog").then((m) => ({ default: m.ReviewsDialog })),
  { ssr: false }
)

interface ReviewsSectionProps {
  reviews: Review[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [showReviewsDialog, setShowReviewsDialog] = useState(false)

  return (
    <>
      <ReviewsMarquee
        reviews={reviews}
        onViewAll={() => setShowReviewsDialog(true)}
      />
      {showReviewsDialog && (
        <ReviewsDialog
          open={showReviewsDialog}
          onOpenChange={setShowReviewsDialog}
          reviews={reviews}
        />
      )}
    </>
  )
}
