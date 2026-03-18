import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TopicCardSkeleton() {
  return (
    <Card className="p-4 rounded-2xl border-2 border-gray-100">
      <Skeleton className="h-32 w-full rounded-xl mb-4 bg-gray-200" />
      <Skeleton className="h-5 w-3/4 mb-2 bg-gray-200" />
      <Skeleton className="h-4 w-full mb-2 bg-gray-200" />
      <Skeleton className="h-4 w-1/2 mb-4 bg-gray-200" />
      <Skeleton className="h-9 w-full rounded-full bg-gray-200" />
    </Card>
  );
}
