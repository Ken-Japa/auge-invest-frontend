import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/pagesComponents/Blog/constants/blogPosts";
import BlogPost from "@/pagesComponents/Blog/components/BlogPost";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const awaitedParams = await params;
    const post = blogPosts.find(post => post.slug === awaitedParams.slug);

    if (!post) {
        return {
            title: 'Post não encontrado | Auge Invest'
        };
    }

    return {
        title: `${post.title} | Auge Invest`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const awaitedParams = await params;
    const post = blogPosts.find(post => post.slug === awaitedParams.slug);

    if (!post) {
        notFound();
    }

    return <BlogPost post={post} />;
}