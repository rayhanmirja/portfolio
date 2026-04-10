import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsList } from "@/components/layout/ProjectsList";
import { Metadata } from "next";
import { getFeaturedProjects } from "@/lib/github";
import { getAllPosts } from "@/lib/posts";

const siteUrl = "https://rayhanmirja.com";

export const metadata: Metadata = {
  title: "Work — Website Development & AI Automation Projects",
  description:
    "Selected work in high-performance website development and AI automation. Real systems built for international clients — fast, SEO-optimized, conversion-focused.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Work — Website Development & AI Automation Projects",
    description:
      "Selected work in high-performance website development and AI automation.",
    url: `${siteUrl}/projects`,
    type: "website",
  },
};

/**
 * ProfessionalService schema lives on /projects because that's the page with
 * commercial intent — Google reads `hasOfferCatalog` to understand exactly
 * which services to surface in rich results and Knowledge Panel context.
 *
 * `provider` references the same `@id` declared in the root layout's Person
 * schema, so Google connects the service offer to the same entity instead of
 * treating it as a separate organization.
 */
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/projects#service`,
  name: "Rayhan Mirja — Website Development & AI Automation",
  url: `${siteUrl}/projects`,
  image: `${siteUrl}/og-image.jpg`,
  description:
    "Website development and AI automation services for international clients. Specializing in high-performance Next.js builds, SEO architecture, and intelligent workflow automation.",
  provider: { "@id": `${siteUrl}/#person` },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  serviceType: [
    "Website Development",
    "AI Automation",
    "Workflow Automation",
    "Search Engine Optimization",
    "Web Performance Engineering",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description:
            "Custom Next.js and React websites engineered for speed, SEO, and conversion. Core Web Vitals first.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation",
          description:
            "Intelligent automations that connect LLMs, APIs, and internal tools to remove repetitive work and unlock leverage.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow Automation",
          description:
            "End-to-end pipelines that wire up business operations, data, and notifications across services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO & Performance Engineering",
          description:
            "Technical SEO, Core Web Vitals tuning, and structured data implementation for organic search dominance.",
        },
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Work",
      item: `${siteUrl}/projects`,
    },
  ],
};

export default async function ProjectsPage() {
  const projects = await getFeaturedProjects();
  const posts = getAllPosts();

  return (
    <main className="min-h-screen flex flex-col pt-32 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar posts={posts} />

      <div className="flex-1 mt-12 w-full max-w-[90rem] mx-auto px-4 md:px-8">
        <ProjectsList projects={projects} showLargeHeader={true} />
      </div>

      <Footer />
    </main>
  );
}
