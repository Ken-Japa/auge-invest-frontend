import { Grid } from '@mui/material'

import { BlogCard } from '@/components/Data-Display/Card/BlogCard'

import type { BlogPost } from '../../../../constants/blogPosts'

import { RelatedPostsContainer, RelatedPostsTitle } from './styled'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null

  return (
    <RelatedPostsContainer>
      <RelatedPostsTitle variant="h3">Posts Relacionados:</RelatedPostsTitle>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.slug}>
            <BlogCard {...post} isLoading={false} />
          </Grid>
        ))}
      </Grid>
    </RelatedPostsContainer>
  )
}
