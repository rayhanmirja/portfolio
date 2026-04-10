import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EntriesList } from "@/components/layout/EntriesList";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Journal | Rayhan Mirja",
    description: "Thoughts, Life Improvement, and Building in Public.",
    alternates: { canonical: "https://rayhanmirja.com/journal" },
};

export default function JournalPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen flex flex-col pt-32 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
            <Navbar posts={posts} />

            <div className="flex-1 mt-12">
                <EntriesList posts={posts} showLargeHeader={true} />
            </div>

            <Footer />
        </main>
    );
}
