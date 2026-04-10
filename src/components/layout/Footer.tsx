import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getAllPosts } from "@/lib/posts";
import { Facebook, Instagram, Linkedin, Github, Twitter } from "lucide-react";

export function Footer() {
    const posts = getAllPosts();
    // Dynamically assemble unique categories from explicit metadata hooks natively.
    const uniqueCategories = Array.from(new Set(posts.map(p => p.category)));

    const mainLinks = [
        { label: 'About', href: '/about' },
        { label: 'Who is Rayhan Mirja?', href: '/about' },
        { label: 'Biography', href: '/biography' },
        { label: 'Free Courses', href: 'https://www.youtube.com/@rayhan_mirja' },
        { label: 'Resources', href: '/journal' },
        { label: 'Journal Entries', href: '/journal' },
        { label: 'YouTube Channel', href: 'https://www.youtube.com/@rayhan_mirja' },
        { label: 'Twitter/X', href: 'https://x.com/Rayhan_Mirja06' }
    ];

    return (
        <footer className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] pt-24 pb-12 px-4 md:px-8 border-t border-black/10 dark:border-white/5 z-20 relative">
            <div className="max-w-5xl mx-auto">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">

                    {/* Brand Column */}
                    <div className="md:col-span-4 flex flex-col items-start gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center justify-center mb-2">
                            <Image src="/rm-logo.png" alt="Rayhan Mirja" width={769} height={631} className="h-8 md:h-10 w-auto object-contain" />
                        </Link>
                        <p className="text-[var(--color-muted)] text-[15px] leading-relaxed max-w-sm mb-4">
                            Rayhan Mirja's engineering & automation blog, where he documents his thoughts and shows people his journey to building top-tier digital instruments.
                        </p>
                        {/* Social Icons (Circles) */}
                        <div className="flex gap-3">
                            <a href="https://www.facebook.com/therealrayhanmirja" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--color-muted)] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors bg-black/5 dark:bg-transparent">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/rayhanmirja_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--color-muted)] hover:text-[#E4405F] hover:border-[#E4405F] transition-colors bg-black/5 dark:bg-transparent">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/rayhanmirja/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--color-muted)] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors bg-black/5 dark:bg-transparent">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://github.com/rayhanmirja" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-colors bg-black/5 dark:bg-transparent">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="https://x.com/Rayhan_Mirja06" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-colors bg-black/5 dark:bg-transparent">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <h4 className="text-[15px] font-bold text-[var(--color-foreground)] mb-2">Rayhan Mirja</h4>
                        {mainLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Links Column 2 */}
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <h4 className="text-[15px] font-bold text-[var(--color-foreground)] mb-2">Categories</h4>
                        {uniqueCategories.map((cat) => (
                            <Link key={cat} href={`/journal?category=${encodeURIComponent(cat)}`} className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:underline decoration-[var(--color-accent)] underline-offset-2 transition-all">
                                {cat}
                            </Link>
                        ))}
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-center pt-8 border-t border-black/10 dark:border-white/10 text-[13px] text-[var(--color-muted)]">
                    <div>©2026 Rayhan Mirja.</div>

                    <ThemeToggle />
                </div>

            </div>
        </footer>
    );
}
