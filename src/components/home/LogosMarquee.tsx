import Image from "next/image"
import type { PartnerLogo } from "@/types/home"

interface LogosMarqueeProps {
  partnerLogos: PartnerLogo[]
}

export function LogosMarquee({ partnerLogos }: LogosMarqueeProps) {
  return (
    <section className="py-8 bg-white border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Prepared for success with
        </p>
      </div>

      <div className="relative flex overflow-hidden w-full">
        <div className="flex w-max animate-scroll-left py-2 hover:paused">
          {[
            ...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos,
            ...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos
          ].map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="flex items-center justify-center mx-12 w-32 h-16 relative shrink-0"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
