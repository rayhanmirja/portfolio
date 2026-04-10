/**
 * Root loading skeleton — mirrors the actual layout (Hero + Work grid +
 * Entries) so the user perceives the page as "almost ready" instead of
 * "blank then everything." Skeleton screens consistently outperform spinners
 * on perceived-wait studies (Nielsen Norman, Facebook 2017).
 *
 * Pure CSS, zero JS, no images — never adds to LCP or CLS.
 */
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]"
    >
      {/* Navbar placeholder */}
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

      {/* Hero placeholder */}
      <section className="pt-40 pb-20 max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
        <Skeleton className="h-3 w-24 mb-6" />
        <Skeleton className="h-12 md:h-16 w-11/12 mb-4" />
        <Skeleton className="h-12 md:h-16 w-9/12 mb-4" />
        <Skeleton className="h-12 md:h-16 w-7/12 mb-10" />
        <div className="space-y-3 max-w-2xl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </section>

      {/* Work section placeholder */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-8 pb-16">
        <div className="border-b border-black/10 dark:border-white/10 pb-4 mb-8">
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[16/10] w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </section>

      {/* Entries placeholder */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-8 pb-24">
        <div className="border-b border-black/10 dark:border-white/10 pb-4 mb-8">
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-3 w-16 ml-4" />
            </div>
          ))}
        </div>
      </section>
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
