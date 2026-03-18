interface TopicCardGridSkeletonProps {
  /** Number of skeleton cards to show */
  count?: number;
  /** Grid column class override */
  gridClassName?: string;
}

export function TopicCardGridSkeleton({
  count = 8,
  gridClassName = "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: TopicCardGridSkeletonProps) {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div className="h-32 bg-gray-200 rounded-xl mb-4" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-full mb-1" />
          <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
          <div className="flex justify-between items-center">
            <div className="h-6 w-12 bg-gray-200 rounded-full" />
            <div className="h-8 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
