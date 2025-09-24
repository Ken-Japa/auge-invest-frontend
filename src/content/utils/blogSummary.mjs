import fs from 'fs';
import path from 'path';

async function getAllBlogPosts() {
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    const files = fs.readdirSync(blogDir)
        .filter(file => file.endsWith('.ts') && !file.includes('index'));
    
    const posts = [];
    for (const file of files) {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
        // Extract post object using regex
        const match = content.match(/export const post = ({[\s\S]*?});/);
        if (match) {
            try {
                const post = eval('(' + match[1] + ')');
                posts.push(post);
            } catch (error) {
                console.error(`Error parsing ${file}:`, error);
            }
        }
    }
    return posts;
}

async function generateSummaryContent(posts, detailed = false) {
    // Sort posts by date in descending order (newest first)
    const sortedPosts = [...posts].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let content = '';
    sortedPosts.forEach(post => {
        content += '\n-----------------------------------\n';
        content += `Title: ${post.title}\n`;
        content += `Date: ${post.date}\n`;
        content += `Categories: ${post.category.join(", ")}\n`;
        content += `Tags: ${post.tags.join(", ")}\n`;

        if (detailed) {
            const topics = post.content
                .split("\n")
                .filter(line => line.startsWith("## "))
                .map(line => line.replace("## ", "").trim());

            content += `\nTopics:\n`;
            topics.forEach(topic => content += `- ${topic}\n`);
            content += `\nDescription: ${post.description}\n`;
            content += `Related Posts: ${post.relatedPosts.join(", ")}\n`;
        }
    });
    return content;
}

async function writeSummaryFile(content, type = 'all') {
    const summaryDir = path.join(process.cwd(), 'src', 'content', 'utils', 'summaries');
    if (!fs.existsSync(summaryDir)) {
        fs.mkdirSync(summaryDir);
    }
    const fileName = `blog-summary-${type}-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = path.join(summaryDir, fileName);
    fs.writeFileSync(filePath, content);
    console.log(`Summary file created: ${fileName}`);
}

const [command, param] = process.argv.slice(2);

async function generatePostsList(posts) {
    const sortedPosts = [...posts].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let content = '# Blog Posts List\n\n';
    sortedPosts.forEach((post, index) => {
        content += `${index + 1}. ${post.title} (id:${post.id}) ("${post.slug}") ${post.date}\n`;
        content += `   Related Posts: ${post.relatedPosts.join(", ")}\n\n`;
    });
    return content;
}

async function main() {
    try {
        const posts = await getAllBlogPosts();

        switch (command) {
            case "posts":
                const postsContent = await generatePostsList(posts);
                await writeSummaryFile(postsContent, 'posts');
                break;

            case "all":
                const allContent = await generateSummaryContent(posts, true);
                await writeSummaryFile(allContent, 'all');
                break;

            case "search":
                if (!param) {
                    console.log("Please provide a search term");
                    break;
                }
                const searchTerm = param.toLowerCase();
                const searchResults = posts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.description.toLowerCase().includes(searchTerm) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    post.category.some(cat => cat.toLowerCase().includes(searchTerm))
                );
                const searchContent = await generateSummaryContent(searchResults, true);
                await writeSummaryFile(searchContent, `search-${param}`);
                break;

            case "category":
                if (!param) {
                    console.log("Please provide a category");
                    break;
                }
                const categoryPosts = posts.filter(post => post.category.includes(param));
                const categoryContent = await generateSummaryContent(categoryPosts);
                await writeSummaryFile(categoryContent, `category-${param}`);
                break;

            case "tag":
                if (!param) {
                    console.log("Please provide a tag");
                    break;
                }
                const tagPosts = posts.filter(post => post.tags.includes(param));
                const tagContent = await generateSummaryContent(tagPosts);
                await writeSummaryFile(tagContent, `tag-${param}`);
                break;

            default:
                console.log(`
Usage:
  node src/content/utils/blogSummary.js all
  node src/content/utils/blogSummary.js posts
  node src/content/utils/blogSummary.js search <term>
  node src/content/utils/blogSummary.js category <category>
  node src/content/utils/blogSummary.js tag <tag>
                `);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main();