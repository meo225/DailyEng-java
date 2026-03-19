/** Skeleton placeholder shown while the speaking session is being created. */
export default function SessionStartingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 h-screen max-h-screen flex flex-col">
      {/* Header Skeleton */}
      <div className="mb-4 flex items-center justify-center relative max-w-4xl mx-auto w-full">
        <div className="absolute left-0 w-10 h-10 rounded-full bg-muted animate-pulse" />
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
        <div className="absolute right-0 w-10 h-10 rounded-full bg-muted animate-pulse" />
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex justify-center min-h-0 pb-4">
        <div className="w-full max-w-4xl rounded-3xl border-2 border-border bg-primary-100 flex flex-col overflow-hidden relative shadow-lg">
          {/* Chat Messages Skeleton */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Tutor message skeleton */}
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-2xl">
                <div className="shrink-0 w-7 h-7 rounded-full bg-muted animate-pulse" />
                <div className="flex-1">
                  <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md w-64">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  </div>
                </div>
              </div>
            </div>
            {/* Tutor greeting skeleton */}
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-2xl">
                <div className="shrink-0 w-7 h-7 rounded-full bg-muted animate-pulse" />
                <div className="flex-1">
                  <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md w-80">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area Skeleton */}
          <div className="p-6 border-t border-border bg-white/80 backdrop-blur-xl">
            <div className="flex justify-center items-center">
              <div className="w-[60px] h-[60px] rounded-full bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
