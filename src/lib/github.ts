export interface ExternalProject {
    title: string;
    description: string;
    category: string;
    liveLink: string;
    githubLink: string;
    stars: number;
    language: string;
    thumbnail: string;
}

export async function getFeaturedProjects(): Promise<ExternalProject[]> {
    const username = "rayhanmirja";
    const headers: HeadersInit = {
        "Accept": "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN.trim()}`;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
            headers,
            // Cache featured project listing for 10 minutes. GitHub's anonymous
            // rate limit is 60 req/hr, so anything below ~60s risks 429s under
            // traffic spikes even with a PAT we want to be conservative.
            next: { revalidate: 600 }
        });

        if (!response.ok) {
            console.error("GitHub API error:", response.status);
            return [];
        }

        const repos = await response.json();

        // Pass mapping isolating strictly Repos configured with `topics.includes('featured')`!
        const featuredRepos = repos.filter((repo: any) => 
            repo.topics && repo.topics.includes("featured")
        );

        const mappedProjects = featuredRepos.map((repo: any) => {
             // We attempt to find the secondary assigned topic to map directly into the Component's Custom UI filter layout gracefully!
            const categoryTopic = repo.topics.find((t: string) => t !== "featured");
            const mappedCategory = categoryTopic 
                ? categoryTopic.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) 
                : "Open Source";

            // Only accept http(s) homepages — GitHub's homepage field is free
            // text and can technically hold javascript: or data: URLs, which
            // would become an XSS sink when rendered as <a href>. Fall back to
            // the netlify subdomain if anything looks off.
            const rawHomepage = (repo.homepage ?? "").trim();
            const liveLink = /^https?:\/\//i.test(rawHomepage)
                ? rawHomepage
                : `https://${repo.name}.netlify.app`;

            const thumbnail = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/thumbnail.png`;

            return {
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
                description: repo.description || "Checkout my github repository for deeper technical context.",
                category: mappedCategory,
                liveLink,
                githubLink: repo.html_url,
                stars: repo.stargazers_count,
                language: repo.language || "Architecture",
                thumbnail,
            };
        });

        return mappedProjects;
    } catch (error) {
        console.error("GitHub API fetch failed");
        return [];
    }
}
