'use client'

import { Container } from '@mui/material'
import { type FC } from 'react'

import { BlogMarkdown } from '@/components/Data-Display/Markdown/BlogMarkdown'
import { OptimizedImage } from '@/components/Helpers/OptimizedImage'
import { ShareSection } from '@/components/Helpers/ShareSection'

import type { BlogPost as BlogPostType } from '../../constants/blogPosts'

import { BlogPostHeader } from './components/BlogPostHeader/BlogPostHeader'
import { RelatedPosts } from './components/RelatedPosts/RelatedPosts'
import {
  BackLink,
  BackLinkBox,
  BackgroundImageWrapper,
  MainContentWrapper,
  PostContainer,
  PostContent,
  RelatedPostContentWrapper,
} from './styled'

interface BlogPostProps {
  post: BlogPostType
  relatedPostsData: BlogPostType[]
}

const BlogPost: FC<BlogPostProps> = ({ post, relatedPostsData }) => {
  return (
    <PostContainer>
      <BackgroundImageWrapper>
        <OptimizedImage
          src="/assets/images/background/BlogPost.webp"
          alt="Blog Post Background"
          fill
          priority
          fetchPriority="high"
          sizes="100vh"
          className="object-cover opacity-15"
          loadingClassName="scale-100 blur-sm"
          quality={85}
        />
      </BackgroundImageWrapper>
      <Container maxWidth="lg">
        <MainContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BlogPostHeader post={post} />
          <PostContent>
            <BlogMarkdown content={post.content} />
          </PostContent>

          <ShareSection title={post.title} description={post.description} />

          <BackLinkBox sx={{ mt: 4 }}>
            <BackLink href="/blog">← Voltar ao Blog</BackLink>
          </BackLinkBox>
        </MainContentWrapper>

        <RelatedPostContentWrapper>
          {relatedPostsData.length > 0 && <RelatedPosts posts={relatedPostsData} />}

          <BackLinkBox>
            <BackLink href="/blog">← Voltar ao Blog</BackLink>
          </BackLinkBox>
        </RelatedPostContentWrapper>
      </Container>
    </PostContainer>
  )
}

export default BlogPost
