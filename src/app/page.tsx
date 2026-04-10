import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ProjectsList } from "@/components/layout/ProjectsList";
import { EntriesList } from "@/components/layout/EntriesList";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/github";

export const metadata: Metadata = {
  alternates: { canonical: "https://rayhanmirja.com" },
};

export default async function Home() {
  const posts = getAllPosts();
  const projects = await getFeaturedProjects();

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar posts={posts} />
      <Hero />
      
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-16 pb-8">
        <h2 className="text-[13px] font-bold tracking-wider uppercase text-[var(--color-foreground)] pb-4 border-b border-black/10 dark:border-white/10 w-full block">
            WORK
        </h2>
      </section>
      <ProjectsList projects={projects} />
      
      {/* Entries Section loads directly mapped to reference aesthetics without overhead headers */}
      <EntriesList posts={posts} />
      
      <Footer />
    </main>
  );
}

