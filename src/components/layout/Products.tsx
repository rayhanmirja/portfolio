"use client";

import { motion } from "framer-motion";

export function Products() {
    return (
        <section id="products" className="w-full max-w-5xl mx-auto px-4 md:px-8 py-16">

            {/* Section Header */}
            <h2 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[var(--color-muted)] mb-8 border-b border-black/10 dark:border-white/10 pb-4">
                POPULAR PRODUCTS
            </h2>

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="group cursor-pointer"
                >
                    <div className="w-full aspect-video bg-black/5 dark:bg-[#1a1a1a] rounded-xl overflow-hidden mb-4 relative border border-black/10 dark:border-white/5 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
                        {/* Placeholder for the image */}
                        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)]">
                            [Product Image: Maker School]
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        Maker School
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] pr-4">
                        Join a daily accountability program & acquire your first engineering customer along with thousands of other developers.
                    </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: 0.1 }}
                    className="group cursor-pointer"
                >
                    <div className="w-full aspect-video bg-black/5 dark:bg-[#1a1a1a] rounded-xl overflow-hidden mb-4 relative border border-black/10 dark:border-white/5 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
                        {/* Placeholder for the image */}
                        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)]">
                            [Product Image: Advanced UI]
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        Master Advanced UI
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] pr-4">
                        Exclusive community to scale your frontend skills to Lead level. Weekly office hours with me, QA, live reviews, & hands-on training.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
