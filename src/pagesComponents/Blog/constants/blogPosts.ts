export interface BlogPost {
  id: string
  title: string | null
  description: string | null
  content: string | null
  image: string | null
  category: string | string[] | null
  author: string | null
  date: string | null
  slug: string
  tags: string[] | null
  readTime: string | null
  relatedPosts?: string[]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return []
}
