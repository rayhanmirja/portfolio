"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostSummary } from "@/lib/posts";

const ITEMS_PER_PAGE = 5;

function EntriesListInternal({ 
    posts, 
    showLargeHeader = false,
    hideFilters = false,
    listTitle
}: { 
    posts: PostSummary[], 
    showLargeHeader?: boolean,
    hideFilters?: boolean,
    listTitle?: string
}) {
    const searchParams = useSearchParams();
    
    // Generate dynamic categories from the passed posts
    const categories = useMemo(() => {
        const uniqueCats = Array.from(new Set(posts.map(p => p.category)));
        return ["All posts", ...uniqueCats];
    }, [posts]);

    const initialCategory = searchParams.get("category") || "All posts";
    const [activeCategory, setActiveCategory] = useState(
        categories.includes(initialCategory) ? initialCategory : "All posts"
    );

    // Hydrate smoothly if URL rewrites without manual reload bounds
    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat && categories.includes(cat)) {
            setActiveCategory(cat);
        }
    }, [searchParams, categories]);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredEntries = useMemo(() => {
        return posts.filter(entry =>
            activeCategory === "All posts" ? true : entry.category === activeCategory
        );
    }, [activeCategory, posts]);

    const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE) || 1;

    // Reset to page 1 when category changes
    useMemo(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const currentEntries = filteredEntries.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pb-32">

            {showLargeHeader && (
                <div className="flex justify-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[var(--color-foreground)] tracking-tight">
                        {activeCategory === "All posts" ? "Journal Entries" : activeCategory}
                    </h1>
                </div>
            )}

            {/* Category Tabs */}
            {!hideFilters && (
                <div className="flex gap-4 overflow-x-auto border-b border-black/10 dark:border-white/10 text-[13px] font-semibold text-[var(--color-muted)] whitespace-nowrap no-scrollbar pt-2">
                    {categories.map((cat) => (
                        <div key={cat} className="relative pb-4 flex flex-col items-center flex-shrink-0">
                            <button
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-4 py-1.5 rounded-full transition-colors ${activeCategory === cat
                                        ? 'text-[var(--color-foreground)] bg-black/5 dark:bg-white/10'
                                        : 'hover:text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                            {activeCategory === cat && (
                                <motion.span 
                                    layoutId="activeCategoryIndicator"
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[var(--color-foreground)] z-10" 
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* List Rows */}
            <div className="flex flex-col relative min-h-[300px]">
                {listTitle && (
                    <h4 className="text-[11px] font-bold tracking-widest text-[var(--color-muted)] uppercase mb-4">
                        {listTitle}
                    </h4>
                )}
                <AnimatePresence mode="popLayout">
                    {currentEntries.map((entry, i) => (
                        <motion.div
                            key={entry.slug}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: i * 0.03 }}
                        >
                            <Link
                                href={`/post/${entry.slug}`}
                                className="group flex items-center justify-between py-6 border-b border-black/5 dark:border-white/10 transition-colors block w-full"
                            >
                                {/* Title & Star */}
                                <div className="flex items-center gap-3">
                                    <h3 className="text-[15px] font-bold text-[var(--color-foreground)]/90 group-hover:text-[var(--color-foreground)] transition-colors">
                                        {entry.title}
                                    </h3>
                                    {entry.isFeatured && (
                                        <span className="text-yellow-500 text-xs">★</span>
                                    )}
                                </div>

                                {/* Metadata (Date exactly aligned to right margin natively) */}
                                <div className="text-[13px] text-[var(--color-muted)] font-medium text-right flex-shrink-0">
                                    {entry.date}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredEntries.length === 0 && (
                    <div className="py-10 text-center text-[var(--color-muted)] text-sm">
                        No entries found for {activeCategory}.
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                    <div className="flex items-center gap-2 text-sm">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-foreground)]"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1 px-4">
                            {Array.from({ length: totalPages }).map((_, idx) => {
                                const page = idx + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[13px] font-medium ${currentPage === page
                                            ? 'bg-[var(--color-accent)] text-white shadow-sm'
                                            : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-foreground)]"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
}

export function EntriesList(props: any) {
    return (
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-[var(--color-muted)] text-sm animate-pulse">Loading directory map...</div>}>
            <EntriesListInternal {...props} />
        </Suspense>
    );
}
