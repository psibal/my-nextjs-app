import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-9 w-32" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>

        {/* Table Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-sm" />

          <Card>
            <div className="p-4 space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </Card>

          <div className="flex items-center justify-end space-x-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </main>
    </div>
  );
}
