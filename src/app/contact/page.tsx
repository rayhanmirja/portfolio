import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | Rayhan Mirja",
  description: "Get in touch with Rayhan Mirja.",
  alternates: { canonical: "https://rayhanmirja.com/contact" },
};

import { getAllPosts } from "@/lib/posts";

export default function ContactPage() {
    const posts = getAllPosts();
  return (
    <main className="min-h-screen flex flex-col pt-32 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
      <Navbar posts={posts} />

      <div className="flex-1 mt-12 w-full max-w-3xl mx-auto px-4 md:px-8 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 tracking-tight">
          Let's Talk
        </h1>

        <p className="text-[15px] md:text-base leading-relaxed text-[var(--color-muted)] mb-12">
          Want to discuss high-level engineering, build an automated system, or just say hi? Drop me a message below.
        </p>

        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 flex flex-col">
          {/*
            PUBLIC IDENTIFIER — NOT A SECRET.
            web3forms access keys are public form identifiers (similar to a
            Stripe publishable key). They MUST be visible in the rendered HTML
            for the form to submit. Do NOT copy this pattern for an actual
            secret: anything dereferenced from `process.env` inside a Server
            Component is inlined into the HTML at build time and shipped to
            every visitor.
          */}
          <input type="hidden" name="access_key" value={process.env.WEB3FORMS_ACCESS_KEY} />

          <input type="hidden" name="subject" value="New Contact form submission from RayhanMirja.com" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-[var(--color-foreground)]">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="John Doe"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-foreground)] placeholder-[var(--color-muted)]/50"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-[var(--color-foreground)]">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="john@example.com"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-foreground)] placeholder-[var(--color-muted)]/50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-semibold text-[var(--color-foreground)]">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-foreground)] placeholder-[var(--color-muted)]/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-[var(--color-foreground)]">Message</label>
            <textarea
              name="message"
              id="message"
              required
              rows={6}
              maxLength={3000}
              placeholder="Tell me about your project..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-foreground)] placeholder-[var(--color-muted)]/50 resize-y min-h-[150px]"
            ></textarea>
            <span className="text-xs text-[var(--color-muted)] text-right">Max 3000 characters</span>
          </div>

          {/*
            Cloudflare Turnstile — invisible bot/spam check. web3forms verifies
            the cf-turnstile-response server-side, so no backend code is needed
            on our end. Renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set,
            so the form keeps working in dev/preview without a key. The script
            tag itself is loaded once in src/app/layout.tsx.
          */}
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-theme="auto"
            />
          )}

          <button
            type="submit"
            aria-label="Send message"
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[15px] font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm self-start mt-4"
          >
            Send Message
          </button>
        </form>
      </div>

     <Footer />
    </main>
  );
}
