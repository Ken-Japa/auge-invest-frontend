import { Metadata } from 'next'

import Blog from '@/pagesComponents/Blog'
import { BlogPost as BlogPostType } from '@/pagesComponents/Blog/constants/blogPosts'

export const metadata: Metadata = {
  title: 'Blog | Auge Invest',
  description:
    'Artigos, análises e insights sobre o mercado financeiro. Mantenha-se atualizado com as últimas tendências e estratégias de investimento.',
  openGraph: {
    title: 'Blog | Auge Invest',
    description: 'Conteúdo exclusivo sobre mercado financeiro e investimentos',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://augeinvest.com.br/blog',
    siteName: 'Auge Invest',
    images: [
      {
        url: '/assets/images/blog/blog-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Auge Invest',
      },
    ],
  },
  keywords: 'blog financeiro, análise de mercado, investimentos, educação financeira, trading',
}

interface BlogPageProps {
  posts: BlogPostType[]
}

const BlogPage = async () => {
  const fs = require('fs')
  const path = require('path')
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = await Promise.all(
    filenames.map(async (filename: string) => {
      const { post } = await import(`@/content/blog/${filename}`)
      return {
        ...post,
        slug: filename.replace(/\.ts$/, ''),
      }
    }),
  )

  return <Blog posts={posts} />
}

export default BlogPage
