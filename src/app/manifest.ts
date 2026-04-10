import type { MetadataRoute } from "next";

/**
 * PWA manifest. Theme + background colors deliberately match the dark
 * minimalist aesthetic so the install splash screen feels continuous with
 * the site itself — no white flash on launch.
 *
 * `purpose: "any maskable"` lets Android crop the icon into adaptive shapes
 * (circle, squircle) without the icon getting clipped at the edges.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rayhan Mirja — Website Developer, AI, Automation",
    short_name: "Rayhan Mirja",
    description:
      "High-performance website development meets intelligent AI automation. I help international clients scale their digital presence with fast, SEO-optimized systems.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "en-US",
    dir: "ltr",
    categories: ["business", "productivity", "developer", "portfolio"],
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Work",
        short_name: "Work",
        description: "Browse selected projects",
        url: "/projects",
      },
      {
        name: "Journal",
        short_name: "Journal",
        description: "Read recent writing",
        url: "/journal",
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Start a project together",
        url: "/contact",
      },
    ],
  };
}
