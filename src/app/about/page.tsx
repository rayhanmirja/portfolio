import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About | Rayhan Mirja",
  description: "Who is Rayhan Mirja? Software Engineer & Serial Entrepreneur.",
  alternates: { canonical: "https://rayhanmirja.com/about" },
};

import { getAllPosts } from "@/lib/posts";

export default function AboutPage() {
    const posts = getAllPosts();
  return (
    <main className="min-h-screen flex flex-col pt-32 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
      <Navbar posts={posts} />

      <div className="flex-1 mt-12 w-full max-w-3xl mx-auto px-4 md:px-8 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-8 tracking-tight">
          About Rayhan Mirja
        </h1>

      <p className="mb-12 text-[15px] text-[var(--color-muted)]">
        For a more comprehensive (and grounded) biography, go{" "}
        <Link href="/biography" className="text-[var(--color-accent)] hover:underline font-medium">
          here
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">
        Who is Rayhan Mirja?
      </h2>
      
      <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-[var(--color-foreground)]/90">
        <p>
          A software engineer and serial entrepreneur, Rayhan Mirja transitioned from military training to problem-solving at a national and international scale. A former Cadet Sergeant in the BNCC Naval Wing and Academic GPA 5.00 scholar, he spoke for the youth climate movement at COP.
        </p>

        <p>
          At 20, he launched Decoded by Rayhan, a technical content brand, YouTube channel and community, which seeks to close the divide between low-level logic (C/C++) and full-fledged web development. He has over 5 years of experience in design and specialization in the MERN stack. He has taught hundreds of students about digital systems and design.
        </p>

        <p>
          Currently, Rayhan is the founder of the B2B SaaS company Minimistic, where he combines applied automation and elite technical research together. While working from Dhaka, Bangladesh and pursuing degrees in Software Engineering and Data Science, he is still expanding his SaaS empire to Southeast Asia and other parts of the world.
        </p>
      </div>
     </div>

     <Footer />
    </main>
  );
}
