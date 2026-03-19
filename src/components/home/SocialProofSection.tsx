import { Card } from "@/components/ui/card"
import { Star, Quote, Users } from "lucide-react"
import { RevealOnScroll } from "./RevealOnScroll"

export function SocialProofSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Card */}
          <RevealOnScroll>
            <Card className="bg-primary-600 text-white border-0 p-6 shadow-xl rounded-2xl relative overflow-hidden group transition-transform hover:scale-[1.02] h-full cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-white/20 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-400/20 rounded-full -ml-10 -mb-10 blur-xl"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-primary-100 font-medium text-sm">
                    <Users className="w-4 h-4" />
                    <span>Our Community</span>
                  </div>
                  <div className="text-4xl font-bold mb-1 tracking-tighter">
                    100k+
                  </div>
                  <div className="text-primary-100 text-base mb-4">
                    active learners worldwide
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 w-fit border border-white/10">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="h-6 w-px bg-white/20"></div>
                  <div>
                    <span className="font-bold text-base">4.9</span>
                    <span className="text-primary-100 text-xs ml-1">
                      / 5.0
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </RevealOnScroll>

          {/* Quote Card */}
          <RevealOnScroll delay={200}>
            <Card className="bg-gray-50 border border-gray-200 p-6 shadow-lg rounded-2xl relative flex flex-col justify-center group hover:border-primary-200 transition-colors h-full cursor-pointer">
              <Quote className="absolute top-4 right-4 w-10 h-10 text-primary-100 z-0 rotate-12" />
              <div className="relative z-10">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary-600 text-primary-600"
                    />
                  ))}
                </div>
                <p className="text-gray-900 text-lg font-medium leading-relaxed mb-6">
                  "This app completely changed how I prepare for my
                  interviews. The AI speaking partner feels incredibly
                  realistic."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    TT
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      Thanh Truc
                    </div>
                    <div className="text-primary-600 text-xs font-medium">
                      Software Engineer
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
