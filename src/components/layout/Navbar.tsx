"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PostSummary } from "@/lib/posts";

export function Navbar({ posts = [] }: { posts?: PostSummary[] }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const corePages = [
        { title: "About", url: "/about", type: "Page" },
        { title: "Biography", url: "/biography", type: "Page" },
        { title: "Journal Entries", url: "/journal", type: "Page" },
        { title: "Work", url: "/projects", type: "Page" },
        { title: "Contact", url: "/contact", type: "Page" },
    ];

    useEffect(() => {
        try {
            const stored = localStorage.getItem("rm_recent_searches");
            if (stored) setRecentSearches(JSON.parse(stored));
        } catch (e) {}
    }, []);

    const handleSearchClick = (url: string, title: string) => {
        setIsSearchOpen(false);
        setSearchQuery("");
        // Save to recent
        const updated = [title, ...recentSearches.filter(s => s !== title)].slice(0, 3);
        setRecentSearches(updated);
        try {
            localStorage.setItem("rm_recent_searches", JSON.stringify(updated));
        } catch (e) {}
    };

    const allItems = useMemo(() => [
        ...corePages,
        ...posts.map(p => ({ title: p.title, url: `/post/${p.slug}`, type: "Journal" }))
    ], [posts]);

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();

        // Filter and sort: startsWith, word startsWith, then includes
        const matched = allItems.filter(p => p.title.toLowerCase().includes(query));
        return matched.sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();

            const aStartsExact = aTitle.startsWith(query);
            const bStartsExact = bTitle.startsWith(query);

            const aStartsWord = aTitle.split(/[ -]/).some(w => w.startsWith(query));
            const bStartsWord = bTitle.split(/[ -]/).some(w => w.startsWith(query));

            if (aStartsExact && !bStartsExact) return -1;
            if (!aStartsExact && bStartsExact) return 1;

            if (aStartsWord && !bStartsWord) return -1;
            if (!aStartsWord && bStartsWord) return 1;

            return aTitle.localeCompare(bTitle);
        });
    }, [searchQuery, allItems]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        // Lock body scroll when mobile menu is open
        if (isMobileMenuOpen || isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobileMenuOpen, isSearchOpen]);

    return (
        <>
            <header className={`fixed top-0 w-full z-40 flex justify-center px-4 md:px-8 transition-all duration-300 ${isScrolled ? "py-4 pointer-events-none" : "py-6 pointer-events-none"}`}>
                
                {/* Mobile Scrolled Background Shield */}
                <div className={`absolute inset-0 w-full h-full md:hidden transition-all duration-300 ${isScrolled ? 'opacity-100 bg-[var(--color-background)] border-b border-black/10 dark:border-white/10' : 'opacity-0'}`} />

                <div className="w-full max-w-[90rem] mx-auto flex items-center justify-between relative px-2 transition-all">

                    <div className={`flex-none flex items-center pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-50 ${isScrolled ? 'md:-translate-y-16 md:opacity-0' : 'translate-y-0 opacity-100'}`}>
                        <Link href="/" className="flex items-center justify-center -ml-2 sm:ml-0 hover:scale-105 transition-transform">
                            <Image src="/rm-logo.png" alt="Rayhan Mirja" width={769} height={631} priority className="h-9 md:h-10 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Central Nav Container - Morphs on scroll */}
                    <motion.nav
                        className={`hidden md:flex flex-1 justify-center items-center gap-1 bg-white dark:bg-[#151515] border border-black/10 dark:border-white/10 ${isScrolled ? 'rounded-full px-1.5 py-1.5 shadow-2xl backdrop-blur-xl absolute left-1/2 -translate-x-1/2' : 'rounded-full px-1.5 py-1.5 shadow-sm absolute left-1/2 -translate-x-1/2'} pointer-events-auto transition-all duration-300 z-50`}
                        layout
                    >
                        <div className="flex items-center gap-1 px-4 text-sm font-semibold text-[var(--color-foreground)]">
                            {/* About Dropdown */}
                            <div className="relative group cursor-pointer px-1">
                                <span className="flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
                                    About <ChevronDown className="w-3.5 h-3.5 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[max-content] z-50">
                                    <div className="bg-white dark:bg-[#1a1a1a] shadow-xl border border-black/10 dark:border-white/10 rounded-xl p-2 flex flex-col gap-1 w-[180px]">
                                        <Link href="/about" className="px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            Who is Rayhan Mirja?
                                        </Link>
                                        <Link href="/biography" className="px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            Biography
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Work */}
                            <div className="flex items-center px-1">
                                <Link href="/projects" className="flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
                                    Work
                                </Link>
                            </div>

                            {/* Free Courses Dropdown */}
                            <div className="relative group cursor-pointer px-1">
                                <span className="flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
                                    Free Courses <ChevronDown className="w-3.5 h-3.5 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[max-content] z-50">
                                    <div className="bg-white dark:bg-[#1a1a1a] shadow-xl border border-black/10 dark:border-white/10 rounded-xl p-2 flex flex-col gap-1 w-[180px]">
                                        <a href="https://www.youtube.com/@rayhan_mirja" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            Rayhan Mirja
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Resources Dropdown */}
                            <div className="relative group cursor-pointer px-1">
                                <span className="flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
                                    Resources <ChevronDown className="w-3.5 h-3.5 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[max-content] z-50">
                                    <div className="bg-white dark:bg-[#1a1a1a] shadow-xl border border-black/10 dark:border-white/10 rounded-xl p-2 flex flex-col gap-1 w-[180px]">
                                        <Link href="/journal" className="px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            Journal Entries
                                        </Link>
                                        <a href="https://www.youtube.com/@rayhan_mirja" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            YouTube Channel
                                        </a>
                                        <a href="https://www.linkedin.com/in/rayhanmirja/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Merged Search when scrolled - only on desktop */}
                        <AnimatePresence>
                            {isScrolled && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="hidden md:flex items-center overflow-hidden border-l border-black/10 dark:border-white/10 ml-1 pl-2"
                                >
                                    <button aria-label="Open search" onClick={() => setIsSearchOpen(true)} className="p-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                                        <Search className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.nav>

                    {/* Right Area (Visible mobile overlay toggles and static search) */}
                    <div className={`flex-none flex items-center justify-end gap-2 md:gap-4 pointer-events-auto origin-right transition-all duration-500 z-50 ${isScrolled ? 'md:-translate-y-16 md:opacity-0' : 'translate-y-0 opacity-100'}`}>
                        <button aria-label="Open search" onClick={() => setIsSearchOpen(true)} className="text-[var(--color-foreground)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors p-2 md:bg-black/5 md:dark:bg-white/5 md:border md:border-black/10 md:dark:border-white/10 rounded-full shadow-sm">
                            <Search className="w-5 h-5 md:w-4 md:h-4" />
                        </button>

                        <button aria-label="Toggle menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[var(--color-foreground)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors p-2 rounded-full cursor-pointer pointer-events-auto z-50">
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Dropdown Menu (Theme aligned popout) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-20 right-4 z-50 w-64 bg-white dark:bg-[#151515] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden md:hidden"
                    >
                        <div className="flex flex-col text-base font-semibold text-[var(--color-foreground)] p-2">
                           <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">About</Link>
                           <Link href="/biography" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">Biography</Link>
                           <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">Work</Link>
                           <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">Journal Entries</Link>
                           <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">Contact</Link>

                           <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10 px-4 pb-2">
                                <div className="flex flex-col gap-2 text-[13px] font-medium text-[var(--color-muted)]">
                                    <a href="https://www.youtube.com/@rayhan_mirja" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors py-1">YouTube</a>
                                    <a href="https://x.com/Rayhan_Mirja06" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors py-1">Twitter/X</a>
                                    <a href="https://github.com/rayhanmirja" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors py-1">GitHub</a>
                                </div>
                           </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fullscreen Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-white/60 dark:bg-black/60"
                    >
                        <div className="absolute inset-0 cursor-pointer" onClick={() => setIsSearchOpen(false)} />

                        <motion.div
                            initial={{ y: -20, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -10, opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg mx-4 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            <div className="flex items-center px-4 border-b border-black/10 dark:border-white/10">
                                <Search className="w-5 h-5 text-[var(--color-muted)]" />
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles, courses, tools..."
                                    className="w-full bg-transparent px-4 py-5 outline-none text-[var(--color-foreground)] placeholder-[var(--color-muted)] text-[15px]"
                                />
                                <button aria-label="Close search" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="p-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] rounded-md bg-black/5 dark:bg-white/5 mx-2 text-xs font-semibold uppercase tracking-wider transition-colors">
                                    ESC
                                </button>
                            </div>

                            <div className="px-2 py-4 max-h-[60vh] overflow-y-auto no-scrollbar flex flex-col gap-1">
                                {searchQuery.trim().length === 0 ? (
                                    recentSearches.length > 0 ? (
                                        <div className="px-2">
                                            <div className="text-[11px] font-bold tracking-wider text-[var(--color-muted)] uppercase mb-2 px-2">Recent</div>
                                            {recentSearches.map((title, idx) => {
                                                const url = allItems?.find(p => p.title === title)?.url || "#";
                                                return (
                                                    <Link 
                                                        key={idx} 
                                                        href={url} 
                                                        onClick={() => handleSearchClick(url, title)}
                                                        className="flex items-center justify-between p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors group"
                                                    >
                                                        <span className="text-[14px] font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{title}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="px-2 py-6 text-[var(--color-muted)] text-sm text-center">
                                            Start typing to search across the system.
                                        </div>
                                    )
                                ) : searchResults.length === 0 ? (
                                    <div className="px-2 py-6 text-[var(--color-muted)] text-sm text-center">
                                        No results found.
                                    </div>
                                ) : (
                                    <>
                                    <div className="text-[11px] font-bold tracking-wider text-[var(--color-muted)] uppercase mb-2 px-4">Results</div>
                                    {searchResults.map((res, idx) => (
                                        <Link 
                                            key={idx} 
                                            href={res.url} 
                                            onClick={() => handleSearchClick(res.url, res.title)} 
                                            className="flex items-center justify-between p-3 mx-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors group"
                                        >
                                            <span className="text-[14px] font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{res.title}</span>
                                        </Link>
                                    ))}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
