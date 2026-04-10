import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

/**
 * Fonts are loaded via next/font with `display: 'swap'` so text is painted
 * immediately with a fallback face — this prevents FOIT and protects LCP/CLS.
 * No external CSS imports are allowed; all typography flows through these vars.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteUrl = "https://rayhanmirja.com";
const siteTitle = "Rayhan Mirja — Website Developer, AI, Automation";
const siteDescription =
  "High-performance website development meets intelligent AI automation. I help international clients scale their digital presence with fast, SEO-optimized systems. Crafting from Dhaka, Bangladesh. Working globally.";

/**
 * `metadataBase` lets every child route emit absolute URLs from relative
 * `alternates.canonical` strings — that's how we get *dynamic* canonicals
 * per-route without re-declaring the host on every page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Rayhan Mirja",
  },
  description: siteDescription,
  applicationName: "Rayhan Mirja",
  generator: "Next.js",
  keywords: [
    "Website Developer",
    "AI Automation",
    "Workflow Automation",
    "Next.js Developer",
    "React Developer",
    "MERN Stack Developer",
    "SEO Optimized Websites",
    "Freelance Web Developer",
    "AI Engineer",
    "Dhaka Bangladesh",
    "Rayhan Mirja",
  ],
  authors: [{ name: "Rayhan Mirja", url: siteUrl }],
  creator: "Rayhan Mirja",
  publisher: "Rayhan Mirja",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rayhan Mirja",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rayhan Mirja — Website Developer, AI, Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Rayhan_Mirja06",
    creator: "@Rayhan_Mirja06",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/**
 * Viewport is split out per Next 14+ guidance. `themeColor` reacts to system
 * scheme so the PWA address bar matches the active theme — small thing, but it
 * makes the install feel native.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * Person schema with `knowsAbout` signals subject-matter authority to Google's
 * Knowledge Graph. The `@id` is a stable canonical so other schemas (Service,
 * Article) can reference the same Person entity across the site.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Rayhan Mirja",
  url: siteUrl,
  image: `${siteUrl}/Rayhan.jpg`,
  jobTitle: "Website Developer & AI Automation Engineer",
  description: siteDescription,
  knowsAbout: [
    "Artificial Intelligence",
    "Automation",
    "Software Engineering",
    "Next.js",
    "React",
    "TypeScript",
    "Web Performance",
    "Search Engine Optimization",
    "Workflow Automation",
  ],
  knowsLanguage: ["en", "bn"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [
    "https://github.com/rayhanmirja",
    "https://www.linkedin.com/in/rayhanmirja/",
    "https://x.com/Rayhan_Mirja06",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Rayhan Mirja",
  description: siteDescription,
  publisher: { "@id": `${siteUrl}/#person` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Inlined JSON-LD beats <Script strategy="afterInteractive"> for SEO:
          crawlers parse the HTML response directly, no JS execution required.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#0a84ff] selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
        {process.env.MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.MEASUREMENT_ID} />
        )}
        {/*
          Cloudflare Turnstile loader. Only injected when a site key is
          configured, so dev/preview builds without a key skip the script
          entirely. The widget itself is rendered inside the contact form
          (src/app/contact/page.tsx).
        */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
        )}
      </body>
    </html>
  );
}
