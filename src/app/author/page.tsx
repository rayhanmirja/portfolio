import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EntriesList } from "@/components/layout/EntriesList";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rayhan Mirja | Author",
    description: "Read posts by Rayhan Mirja.",
    alternates: { canonical: "https://rayhanmirja.com/author" },
};

export default function AuthorPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen flex flex-col pt-24 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
            <Navbar posts={posts} />

            <div className="flex-1 mt-12 flex flex-col items-center">
                {/* Author Profile Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="w-[90px] h-[90px] rounded-full bg-zinc-800 border-[3px] border-black/5 dark:border-white/5 mb-6 shadow-md relative overflow-hidden">
                        <Image
                            src="/profile.png"
                            alt="Rayhan Mirja"
                            fill
                            sizes="90px"
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)] mb-3">
                        Rayhan Mirja
                    </h1>
                    <a 
                        href="https://www.linkedin.com/in/rayhanmirja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                        @rayhanmirja
                    </a>
                </div>

                <div className="w-full">
                    <EntriesList 
                        posts={posts} 
                        hideFilters={true} 
                        listTitle="Latest" 
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}
