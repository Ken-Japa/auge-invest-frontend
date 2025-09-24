import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost as BlogPostType } from "@/pagesComponents/Blog/constants/blogPosts";
import BlogPost from "@/pagesComponents/Blog/components/BlogPost";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  let blogPostsModule;
  try {
    blogPostsModule = await import(`@/content/blog/${slug}.ts`);
  } catch (error) {
    notFound();
  }
  const { post } = blogPostsModule;

  return {
    title: `${post.title} - Blog Post Auge Invest`,
    description: post.description || "Artigos, análises e insights sobre o mercado financeiro. Mantenha-se atualizado com as últimas tendências e estratégias de investimento.",
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "pt_BR",
      url: `https://augeinvest.com.br/blog/${post.slug}`,
      siteName: "Auge Invest",
      images: [
        {
          url: post.image || "/assets/images/background/BlogPost.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    keywords: post.keywords?.join(', ') || 'blog, Auge Invest, Blog Post',
  };
}

export const revalidate = 36000;
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  let blogPostsModule;
  try {
    blogPostsModule = await import(`@/content/blog/${slug}.ts`);
  } catch (error) {
    notFound();
  }

  const { post } = blogPostsModule;

  const relatedPostsData: BlogPostType[] = post.relatedPosts
    ? (await Promise.all(
      post.relatedPosts.map(async (relatedSlug: string) => {
        try {
          const relatedPostModule = await import(`@/content/blog/${relatedSlug}.ts`);
          return relatedPostModule.post;
        } catch (error) {
          console.error(`Error importing related post ${relatedSlug}:`, error);
          return null;
        }
      })
    )).filter(Boolean) as BlogPostType[]
    : [];

  return <BlogPost post={post} relatedPostsData={relatedPostsData} />;
};

export default BlogPostPage;