import type { NextConfig } from "next";

const requiredEnv = ["WEB3FORMS_ACCESS_KEY"] as const;
const optionalEnv = ["GITHUB_TOKEN", "MEASUREMENT_ID", "NEXT_PUBLIC_TURNSTILE_SITE_KEY"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}
for (const key of optionalEnv) {
  if (!process.env[key]) {
    console.warn(`Optional env var not set: ${key}`);
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
};

export default nextConfig;
