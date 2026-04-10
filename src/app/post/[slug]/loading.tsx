/**
 * /post/[slug] skeleton — mirrors the article layout: title, meta row,
 * thumbnail, then prose lines. Skim-able shape lands before the markdown
 * stream resolves.
 */
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]"
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

      <article className="pt-40 pb-24 max-w-3xl mx-auto px-6 sm:px-8 md:px-12">
        <Skeleton className="h-3 w-24 mb-6" />
        <Skeleton className="h-10 md:h-14 w-11/12 mb-4" />
        <Skeleton className="h-10 md:h-14 w-9/12 mb-8" />

        <div className="flex items-center gap-4 mb-12">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="aspect-[16/9] w-full rounded-lg mb-12" />

        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 ${i % 3 === 2 ? "w-9/12" : "w-full"}`}
            />
          ))}
        </div>
      </article>
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
