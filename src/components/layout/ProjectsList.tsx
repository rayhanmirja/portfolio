"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Star, Code2 } from "lucide-react";
import { ExternalProject } from "@/lib/github";

/**
 * Inline SVG shimmer encoded as a data URL. Works as a `blurDataURL` for
 * remote `next/image` sources where Next can't statically import the asset
 * to generate one. Tiny (~200 bytes), no extra request, theme-neutral grey.
 */
const SHIMMER_BLUR_DATA_URL =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg==";

function ProjectCard({ project, i }: { project: ExternalProject, i: number }) {
    const [imgError, setImgError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const handleError = () => setImgError(true);

        if (img.complete) {
            if (img.naturalWidth === 0) handleError();
        } else {
            img.addEventListener('error', handleError);
            return () => img.removeEventListener('error', handleError);
        }
    }, [project.thumbnail]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex flex-col bg-white dark:bg-[#1a1a1a] shadow-sm rounded-3xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:shadow-md hover:border-black/20 dark:hover:border-white/20 transition-all group overflow-hidden"
        >
            <div className="w-full aspect-video rounded-xl bg-black/5 dark:bg-white/5 mb-6 relative overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                {/* Dynamically handle state failure cleanly without raw DOM mutations */}
                {!imgError && (
                    <Image
                        ref={imgRef}
                        src={project.thumbnail}
                        alt={`${project.title} — ${project.language} project by Rayhan Mirja`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        // First two cards are LCP candidates on /projects — preload them.
                        priority={i < 2}
                        // Lazy by default for the rest; blur placeholder smooths the swap.
                        loading={i < 2 ? undefined : "lazy"}
                        placeholder="blur"
                        blurDataURL={SHIMMER_BLUR_DATA_URL}
                        className="object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                )}
                {/* Clean code-themed placeholder */}
                {imgError && (
                    <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/80 flex flex-col items-center justify-center text-[var(--color-muted)] transition-transform duration-500 group-hover:scale-105">
                        <Code2 className="w-10 h-10 mb-2 opacity-50" />
                        <span className="text-xs font-semibold tracking-widest uppercase opacity-60">{project.language} architecture</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start mb-4 gap-4">
                <h3 className="text-[18px] md:text-xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{project.title}</h3>
                <div className="flex items-center gap-2">
                    {project.stars > 0 && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-yellow-500" /> {project.stars}
                        </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full flex-shrink-0">{project.language}</span>
                </div>
            </div>
            <p className="text-[14px] text-[var(--color-muted)] mb-8 flex-1 leading-relaxed line-clamp-2">
                {project.description}
            </p>
            
            <div className="flex flex-col xl:flex-row items-center gap-3 mt-auto">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap flex items-center gap-2 text-[13px] font-semibold bg-[#111] dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 text-white dark:text-black px-6 py-3 rounded-full transition-colors flex-1 justify-center shadow-sm w-full">
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" /> Live Demo
                </a>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap flex items-center gap-2 text-[13px] font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[var(--color-foreground)] px-6 py-3 rounded-full transition-colors flex-1 justify-center border border-black/5 dark:border-white/5 w-full">
                    <Github className="w-3.5 h-3.5 flex-shrink-0" /> Source Code
                </a>
            </div>
        </motion.div>
    );
}

const ITEMS_PER_PAGE = 4;

export function ProjectsList({ 
    projects,
    showLargeHeader = false 
}: { 
    projects: ExternalProject[],
    showLargeHeader?: boolean 
}) {
    // Generate organic category sets out of Git mapping categories
    const categories = useMemo(() => {
        const uniqueCats = Array.from(new Set(projects.map(p => p.category)));
        return ["All Projects", ...uniqueCats];
    }, [projects]);

    const [activeCategory, setActiveCategory] = useState("All Projects");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProjects = useMemo(() => {
        return projects.filter(project =>
            activeCategory === "All Projects" ? true : project.category === activeCategory
        );
    }, [activeCategory, projects]);

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;

    useMemo(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const currentProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pb-32">

            {showLargeHeader && (
                <div className="flex justify-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[var(--color-foreground)] tracking-tight">
                        {activeCategory === "All Projects" ? "Work" : activeCategory}
                    </h1>
                </div>
            )}



            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {currentProjects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} i={i} />
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <div className="col-span-1 md:col-span-2 py-10 text-center text-[var(--color-muted)] text-sm">
                        No projects found for {activeCategory}.
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                    <div className="flex items-center gap-2 text-sm">
                        <button
                            aria-label="Previous page"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-foreground)]"
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
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors text-[13px] font-medium ${currentPage === page
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
                            aria-label="Next page"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-foreground)]"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
