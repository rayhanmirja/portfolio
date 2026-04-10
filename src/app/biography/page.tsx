import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Biography | Rayhan Mirja",
  description: "The complete biography of Rayhan Mirja. Transformation from cadet to software engineer.",
  alternates: { canonical: "https://rayhanmirja.com/biography" },
};

import { getAllPosts } from "@/lib/posts";

export default function BiographyPage() {
    const posts = getAllPosts();
  return (
    <main className="min-h-screen flex flex-col pt-32 selection:bg-[var(--color-accent)] selection:text-white relative z-10">
      <Navbar posts={posts} />

      <div className="flex-1 mt-12 w-full max-w-3xl mx-auto px-4 md:px-8 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-8 tracking-tight">
          Biography
        </h1>

      <p className="text-[15px] md:text-base leading-relaxed text-[var(--color-foreground)]/90 italic mb-12 border-l-4 border-[var(--color-accent)] pl-4">
        This is a biography written by me in March 2025 and refined over the years. This tells the tale of my transformation from disciplined cadet, to software engineer, to serial startup entrepreneur. This edition includes my transition from freelance designer to high-level technical researcher and climate advocate. I just think it's still the best way of getting to know me!
      </p>

      <div className="space-y-12 text-[15px] md:text-base leading-relaxed text-[var(--color-foreground)]/90">
        
        <section>
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">Who am I?</h3>
          <p className="mb-4">From a bird's eye view, I am:</p>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span><strong className="text-[var(--color-foreground)]">A Technical Polymath:</strong> I excel at solving challenging logic problems and writing advanced programs. My technology stack is the MERN stack, Using AI to integrate to make the best software and solution for problems as I see software as the architecture of the future.</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span><strong className="text-[var(--color-foreground)]">A Disciplined Leader:</strong> As a BNCC Naval Wing Cadet Sergeant, I learned a "mission-first" mentality.</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span><strong className="text-[var(--color-foreground)]">A Climate Pragmatist:</strong> I came to COP representing young voices not just to complain about the weather, but to provide realistic, data-driven solutions for climate action.</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span><strong className="text-[var(--color-foreground)]">An Opportunist & Builder:</strong> I have founded companies, failed fast, and pivoted. I believe in building quickly and learning through execution.</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">A brief history</h3>
          <p className="mb-8">How did I become the above? Here is a walkthrough of my journey, from the discipline of the cantonment to the frontier of Software Engineering.</p>

          <div className="space-y-8">
            <div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">My early life & Schooling</h4>
                <p>I completed my schooling from Adamjee Cantonment Public School. I used to be very competitive as a child. Some of my prominent achievements include winning a prize in the ALOHA Mental Arithmetic Competition and coming third in a regional Chess Competition.</p>
                <p className="mt-4">Those were early signs of the analytical brain that wires patterns and calculates strategies. I spent most of my time reading or figuring out how things worked and I eventually gravitated toward engineering.</p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">The Cadet Years & Discipline</h4>
                <p>The most important chapter of my life was spent as a Cadet Sergeant in the BNCC Naval Wing. The camps taught me endurance and not just drill, leadership and not just authority. As co-curricular activity, I worked as the IT Expert of the English Language Club and also, as the Administrative Secretary of the Club of Mathematics at Adamjee.</p>
                <p className="mt-4">It taught me that "soft skills" are the hardest to master but the most rewarding when applied to technical fields.</p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">College & Climate Advocacy</h4>
                <p>At BAF Shaheen College Kurmitola, I became interested in global affairs, serving as the General Secretary of the BAFSK Climate and Environmental Action Network (CLEAN). It was definitely not "student play", and ultimately it led me to the 19th Global Strike in Dhaka and finally to COP.</p>
                <p className="mt-4">I not only took part but spoke about solutions. Programs like "Youth in Action: Shaping COP 29" with Jaago Foundation were organized with my help. I also worked with YouthNet, YOUCAN, Brighters, Action aid Bangladesh.</p>
                <p className="mt-4">I learned that technology for technology's sake is just noise, and it's not a "great" project unless it's solving a real-world crisis.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">The Professional Pivot</h3>
          
          <div className="space-y-8">
            <div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">Transitioning from Freelancing to Teaching</h4>
                <p>While the rest were preparing for examinations, I was building my career. I had been freelancing on Fiverr and Upwork for over 4 years with 5 years of graphic designing experience. This led to a 2-year stint at Creative IT Institute where I taught design to hundreds of youngsters.</p>
                <p className="mt-4">Later still, I was the Assistant IT Manager at Wave Media Sales, where I learned that in designing the technical fabric of the company, I fell in love with the systems that ran the business as much as the business itself.</p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">The Failure: Vallevin</h4>
                <p>I should not be afraid to talk about failure, as I founded a company called Vallevin that failed in the end. Like most first-time founders, I learned much more from this failure than I did from any success; that a good idea is nothing without a good, scalable system, a lesson which I still carry with me in my current ventures.</p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">University & Software Engineering</h4>
                <p>I am currently studying Software Engineering, specializing in Data Science at Daffodil International University (DIU).</p>
                <p className="mt-4">I form part of a research team with my seniors to explore the intersection of technology and real-world solutions. I went from being a "designer who codes" to a Full Stack Developer, with a stack that is tailored for the future of the web:</p>
                <ul className="mt-4 list-disc list-inside space-y-1 block ml-2">
                    <li><strong className="text-[var(--color-foreground)]">Languages:</strong> C, C++, HTML, CSS, Python Java, JavaScript, React, Next.js, React Native, Node.js, Express, MySQL, MongoDB.</li>
                </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">Today & The Future</h3>

          <div className="space-y-8">
            <div>
               <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">Content Creation & Self-Improvement</h4>
               <p>Now, I do the "freelance" in Upwork in Website Creation. I also focus all my time on building my business, content creation, and self-improvement. My YouTube channel Rayhan Mirja is my main social currency. I want people to see, that you can be a high-level engineer and how easy and fun it is to programming. People dont need to fear it.</p>
            </div>

            <div>
               <h4 className="text-xl font-semibold mb-3 text-[var(--color-foreground)]">Goals</h4>
               <p>Currently I am working on transferring my credits to Malaysia to finish my bachelor's, and building my B2B empire under the Minimistic brand for the long term. I want to close the divide between technical research and profitable entrepreneurship.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">Wrap-up</h3>
          <p>I hope you now know a little more about me. I am a product of discipline, competitive mathematics, and the persistent hustle. The future is not something I'm just going to participate in, I want to architect.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-foreground)] tracking-tight">Miscellaneous Facts</h3>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span><strong className="text-[var(--color-foreground)]">Philosophy:</strong> I've read a lot on psychology and business and prioritize high-leverage activities over "busy work."</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span><strong className="text-[var(--color-foreground)]">Languages:</strong> I speak Bengali, English and Hindi, and my current language of study is German.</span>
            </li>
          </ul>
        </section>

      </div>
     </div>

     <Footer />
    </main>
  );
}
