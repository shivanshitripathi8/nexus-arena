import { cn } from "@/lib/utils";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glass rounded-2xl p-4 space-y-3 shimmer", className)}>
      <div className="h-4 w-20 rounded-full bg-muted" />
      <div className="h-6 w-3/4 rounded-lg bg-muted" />
      <div className="h-4 w-1/2 rounded-lg bg-muted" />
      <div className="h-2 w-full rounded-full bg-muted" />
      <div className="h-10 w-full rounded-xl bg-muted" />
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 shimmer">
      <div className="h-4 w-24 rounded-lg bg-muted mb-2" />
      <div className="h-8 w-32 rounded-lg bg-muted" />
    </div>
  );
}
