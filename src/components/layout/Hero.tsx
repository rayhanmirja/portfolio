export function Hero() {
    return (
        <section className="relative w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 pt-32 md:pt-48 pb-20 flex flex-col items-center justify-center text-center">
            {/*
              Hero is the mobile LCP element. We deliberately avoid framer-motion
              here — a CSS-only fade-up keeps the LCP paint on the critical path
              with zero extra JS hydration cost, which is what recovers the
              mobile Lighthouse score.
            */}
            <div className="hero-fade-in text-center w-full max-w-5xl mx-auto flex flex-col items-center">

                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold lg:font-semibold tracking-tighter text-[var(--color-foreground)] leading-[1.05] mb-8">
                    Your <span className="text-[var(--color-accent)]">straight-line path</span><br />
                    to a high-performing website<br />
                    that grows your business
                </h1>

                {/* Sub-headline / Intro */}
                <p className="text-[17px] md:text-xl lg:text-lg text-[var(--color-foreground)]/90 max-w-3xl lg:max-w-2xl mx-auto mb-10 leading-relaxed font-medium px-4">
                    Hi 👋 I'm <span className="text-[var(--color-foreground)] font-semibold">Rayhan</span>—I build & engineer digital instruments. Below are my best works, ideas, and experiments. Here is my GitHub—go there and enjoy seeing my projects 🚀
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto mb-8 w-full max-w-[200px] sm:max-w-none">
                    <a
                        href="/contact"
                        className="bg-[var(--color-accent)] hover:bg-[#0066cc] text-white text-[15px] font-semibold px-10 py-3.5 rounded-full transition-colors shadow-md flex items-center justify-center w-full sm:w-auto"
                    >
                        Let's Talk
                    </a>
                    <a
                        href="https://github.com/rayhanmirja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#111] dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 text-white dark:text-black text-[15px] font-semibold px-10 py-3.5 rounded-full transition-colors shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        github
                    </a>
                </div>

            </div>
        </section>
    );
}
