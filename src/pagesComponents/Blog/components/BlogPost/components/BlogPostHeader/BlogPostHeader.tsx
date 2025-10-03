import MenuBookIcon from '@mui/icons-material/MenuBook'
import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/material'

import type { BlogPost as BlogPostType } from '../../../../constants/blogPosts'

import {
  AuthorDateTypography,
  BlogLink,
  HeaderContainer,
  InfoBox,
  ReadTimeAndBlogLinkBox,
  ReadTimeTypography,
  TagChip,
  TagsBox,
  TitleTypography,
} from './styled'

interface BlogPostHeaderProps {
  post: BlogPostType
}

export const BlogPostHeader = ({ post }: BlogPostHeaderProps) => (
  <HeaderContainer>
    <TitleTypography variant="h1">{post.title}</TitleTypography>
    <InfoBox>
      <AuthorDateTypography variant="body2">
        <PersonIcon fontSize="small" />
        {post.author} em {new Date(post.date || '').toLocaleDateString('pt-BR')}
      </AuthorDateTypography>
      <ReadTimeAndBlogLinkBox>
        {post.readTime && (
          <ReadTimeTypography variant="body2">Tempo de leitura: {post.readTime}</ReadTimeTypography>
        )}
        <BlogLink href="/blog">
          <Typography variant="body2">Blog</Typography>
          <MenuBookIcon sx={{ fontSize: '1rem' }} />
        </BlogLink>
      </ReadTimeAndBlogLinkBox>
    </InfoBox>
    {post.tags && (
      <TagsBox>
        {post.tags.map((tag) => (
          <TagChip key={tag} label={tag} size="small" />
        ))}
      </TagsBox>
    )}
  </HeaderContainer>
)
