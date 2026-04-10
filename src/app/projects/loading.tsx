/**
 * /projects skeleton — mirrors the large header + grid layout in
 * ProjectsList. Pure CSS, zero JS, zero CLS risk.
 */
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen pt-32 bg-[var(--color-background)] text-[var(--color-foreground)]"
    >
      <div className="fixed top-0 inset-x-0 h-16 border-b border-black/5 dark:border-white/5 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto h-full px-6 sm:px-8 md:px-12 flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <div className="hidden md:flex gap-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      <div className="flex-1 mt-12 w-full max-w-[90rem] mx-auto px-4 md:px-8">
        <Skeleton className="h-10 md:h-14 w-1/3 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[16/10] w-full rounded-lg" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-black/[0.06] dark:bg-white/[0.06] ${className}`}
    />
  );
}
