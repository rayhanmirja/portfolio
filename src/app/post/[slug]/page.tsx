import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

interface PostParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Rayhan Mirja`,
    description: `Read about ${post.title}`,
    alternates: { canonical: `https://rayhanmirja.com/post/${resolvedParams.slug}` },
  };
}

export default async function SinglePostPage({ params }: PostParams) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  const posts = getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col pt-32 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
      <ScrollProgressBar />
      <Navbar posts={posts} />

      <article className="flex-1 mt-6 w-full max-w-3xl mx-auto px-6 md:px-8 pb-32">
        {/* Post Metadata Header */}
        <header className="mb-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[15px] text-[var(--color-muted)] font-medium">
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          
          <h1 className="text-4xl md:text-[54px] font-bold tracking-tight text-[var(--color-foreground)] leading-[1.1]">
            {post.title}
          </h1>

          {/* Author Block */}
          <Link href="/author" className="flex items-center gap-3 mt-4 group w-fit">
              <div className="w-[30px] h-[30px] rounded-full bg-black/5 dark:bg-zinc-800 border border-black/10 dark:border-white/10 relative overflow-hidden">
                  <Image
                      src="/profile.png"
                      alt="Rayhan Mirja"
                      fill
                      sizes="30px"
                      className="object-cover object-top"
                  />
              </div>
              <span className="text-[15px] text-[var(--color-foreground)]/90 font-medium group-hover:text-[var(--color-accent)] transition-colors">Rayhan Mirja</span>
          </Link>
        </header>

        {/* Thumbnail Layer */}
        {post.thumbnail && (
          <div className="w-full aspect-[4/3] sm:aspect-video relative rounded-2xl overflow-hidden mb-12 shadow-sm border border-black/10 dark:border-white/10">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Markdown Content Block */}
        <div className="prose md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-li:leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <Footer />
    </main>
  );
}
