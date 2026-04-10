import type { NextConfig } from "next";

// Env vars are warned about — never thrown — so a missing key cannot break
// the build on a fresh CI environment (e.g. Netlify/Vercel first deploy).
// The contact route is responsible for failing loudly at runtime if
// WEB3FORMS_ACCESS_KEY is unset when a submission is attempted.
const expectedEnv = [
  "WEB3FORMS_ACCESS_KEY",
  "GITHUB_TOKEN",
  "MEASUREMENT_ID",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
] as const;

for (const key of expectedEnv) {
  if (!process.env[key]) {
    console.warn(`[next.config] env var not set: ${key}`);
  }
}

// Content-Security-Policy assembled once so it stays readable.
// Notes:
//  - 'unsafe-inline' for script-src is required because of the inlined
//    JSON-LD <script> tags in src/app/layout.tsx. Removing it would mean
//    moving to a nonce-based CSP, which forces dynamic rendering.
//  - 'unsafe-eval' is added in development only because React/Turbopack
//    dev mode uses eval() for HMR and callstack reconstruction. It is
//    never included in production builds.
//  - challenges.cloudflare.com is allowed so Cloudflare Turnstile can load
//    on the contact form (no-op if NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset).
//  - form-action restricts where <form> submissions can target.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "script-src",
  "'self'",
  "'unsafe-inline'",
  isDev && "'unsafe-eval'",
  "https://www.googletagmanager.com",
  "https://challenges.cloudflare.com",
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://raw.githubusercontent.com https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Canonicalize on rayhanmirja.com — Vercel preview/production URLs
  // (*.vercel.app) stay reachable by default, which splits SEO and lets
  // the site load under two different hostnames. This 308s any request
  // whose Host header ends in .vercel.app over to the custom domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<host>.*\\.vercel\\.app)",
          },
        ],
        destination: "https://rayhanmirja.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
