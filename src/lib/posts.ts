import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostSummary {
    slug: string;
    title: string;
    date: string;
    category: string;
    isFeatured: boolean;
    thumbnail: string;
    readTime: string;
}

export interface PostData extends PostSummary {
    content: string;
}

export function getAllPosts(): PostSummary[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);
    
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents);

            // Default fallback mappings if frontmatter is missing some fields
            return {
                slug,
                title: matterResult.data.title || slug,
                date: matterResult.data.date || "",
                category: matterResult.data.category || "Uncategorized",
                isFeatured: matterResult.data.isFeatured || false,
                thumbnail: matterResult.data.thumbnail || "",
                readTime: matterResult.data.readTime || "",
            };
        });

    // Sort posts automatically by date descending
    return allPostsData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getPostBySlug(slug: string): PostData | null {
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return null;
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
            slug,
            title: matterResult.data.title || slug,
            date: matterResult.data.date || "",
            category: matterResult.data.category || "Uncategorized",
            isFeatured: matterResult.data.isFeatured || false,
            thumbnail: matterResult.data.thumbnail || "",
            readTime: matterResult.data.readTime || "",
            content: matterResult.content,
        };
    } catch {
        return null;
    }
}
