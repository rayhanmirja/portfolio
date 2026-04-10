import type { MetadataRoute } from "next";

const baseUrl = "https://rayhanmirja.com";

/**
 * Robots policy:
 *  - Allow all crawlers full access to public content.
 *  - Block API endpoints, Next.js internals, and private paths so we don't
 *    leak server routes or burn crawl budget on non-indexable URLs.
 *  - GPTBot/CCBot are *allowed* deliberately — being cited in LLM answers is
 *    upside for an authority brand. Flip these to disallow if you'd rather
 *    opt out of training/inference scraping.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin/", "/_next/", "/private/", "/draft/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
