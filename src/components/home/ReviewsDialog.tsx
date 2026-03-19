"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Star,
  Quote,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { Review } from "@/types/home"

// ─── Types ─────────────────────────────────────────

interface ReviewsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reviews: Review[]
}

// ─── Component ─────────────────────────────────────

export function ReviewsDialog({ open, onOpenChange, reviews }: ReviewsDialogProps) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const nextReview = useCallback(() => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = useCallback(() => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  const currentReview = reviews[currentReviewIndex]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px]! w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b px-10 py-6">
            <DialogTitle className="text-3xl font-bold text-gray-800">
              Learner Stories
            </DialogTitle>
            <p className="text-gray-500 text-base mt-1">
              Real success stories from our community
            </p>

            {/* Review navigation dots */}
            <div className="flex items-center gap-2 mt-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentReviewIndex
                      ? "bg-primary-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-2.5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current Review Card */}
          <div className="p-10">
            <div className="bg-linear-to-br from-primary-50 to-gray-50 rounded-3xl p-10">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Left Column - Photo and Result */}
                <ReviewPhotoColumn review={currentReview} />

                {/* Right Column - User Info and Review */}
                <ReviewDetailsColumn review={currentReview} />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center px-10 py-6 border-t bg-white">
              <Button
                variant="outline"
                onClick={prevReview}
                className="cursor-pointer bg-transparent px-6 py-5"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <span className="text-gray-500 text-base font-medium">
                {currentReviewIndex + 1} of {reviews.length}
              </span>

              <Button
                onClick={nextReview}
                className="bg-primary-600 hover:bg-primary-600 text-white cursor-pointer px-6 py-5"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Sub-components ────────────────────────────────

function ReviewPhotoColumn({ review }: { review: Review }) {
  return (
    <div className="lg:col-span-2">
      {/* Photo */}
      <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <Image
          src={review.photo || "/placeholder.svg"}
          alt={`${review.name}'s journey`}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <Quote className="w-10 h-10 text-white/70" />
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-800">
              {review.result.type}: {review.result.score}
            </span>
          </div>
        </div>
      </div>

      {/* Score improvement card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Score Improvement
        </h4>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Before</p>
            <p className="text-2xl font-bold text-gray-400">
              {review.result.previousScore}
            </p>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-gray-200 rounded-full relative">
              <div
                className="absolute inset-y-0 left-0 bg-linear-to-r from-gray-400 to-primary-600 rounded-full"
                style={{ width: "100%" }}
              />
              <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">After</p>
            <p className="text-2xl font-bold text-primary-600">
              {review.result.score}
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">
          Achieved in {review.duration}
        </p>
      </div>
    </div>
  )
}

function ReviewDetailsColumn({ review }: { review: Review }) {
  return (
    <div className="lg:col-span-3 flex flex-col">
      {/* Top section with avatar and basic info */}
      <div className="flex items-start gap-5 mb-6">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src={review.avatar || "/placeholder.svg"}
              alt={review.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-accent-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-md">
            Verified
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">
            {review.name}
          </h3>
          <p className="text-gray-500 text-base mt-1">
            Studied for {review.duration}
          </p>

          {/* Stars */}
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full feedback */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm flex-1">
        <Quote className="w-8 h-8 text-primary-200 mb-3" />
        <p className="text-gray-700 leading-relaxed text-lg">
          &quot;{review.fullFeedback}&quot;
        </p>
      </div>

      {/* Courses taken */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Courses Completed
        </h4>
        <div className="flex flex-wrap gap-2">
          {review.courses.map((course, idx) => (
            <span
              key={idx}
              className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
