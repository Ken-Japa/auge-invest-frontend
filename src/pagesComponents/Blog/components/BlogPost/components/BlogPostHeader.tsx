import MenuBookIcon from '@mui/icons-material/MenuBook'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Chip, Typography } from '@mui/material'
import Link from 'next/link'

import type { BlogPost as BlogPostType } from '../../../constants/blogPosts'

interface BlogPostHeaderProps {
  post: BlogPostType
}

export const BlogPostHeader = ({ post }: BlogPostHeaderProps) => (
  <Box className="mb-8">
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '2rem', md: '3rem' },
        fontWeight: 700,
        color: '#0D95F9',
        textAlign: 'center',
        marginBottom: '2rem',
      }}
    >
      {post.title}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <PersonIcon fontSize="small" />
        {post.author} em {new Date(post.date || '').toLocaleDateString('pt-BR')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
        {post.readTime && (
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Tempo de leitura: {post.readTime}
          </Typography>
        )}
        <Link
          href="/blog"
          className="flex items-center gap-2 text-[#0D95F9] hover:text-white transition-colors"
        >
          <Typography variant="body2">Blog</Typography>
          <MenuBookIcon sx={{ fontSize: '1rem' }} />
        </Link>
      </Box>
    </Box>
    {post.tags && (
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {post.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          />
        ))}
      </Box>
    )}
  </Box>
)
