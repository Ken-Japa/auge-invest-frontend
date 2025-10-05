import { CalendarToday, Person } from '@mui/icons-material'
import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { BlogCardSkeleton } from './BlogCardSkeleton'
import { CardContainer, CardOverlay } from './styled'

/**
 * @typedef {object} BlogCardProps
 * @property {string | null} title - O título do post do blog.
 * @property {string | null} description - A descrição curta do post do blog.
 * @property {string | null} [image] - A URL da imagem de capa do post do blog.
 * @property {string | string[] | null} category - A categoria ou categorias do post do blog.
 * @property {string | null} author - O autor do post do blog.
 * @property {string | null} date - A data de publicação do post do blog (formato string).
 * @property {string} slug - O slug do post do blog para a URL.
 * @property {boolean} [isLoading] - Indica se o card está em estado de carregamento, exibindo um skeleton.
 */
interface BlogCardProps {
  title: string | null
  description: string | null
  image?: string | null
  category: string | string[] | null
  author: string | null
  date: string | null
  slug: string
  isLoading?: boolean
}

/**
 * Componente BlogCard reutilizável para exibir prévias de posts de blog.
 * Inclui título, descrição, imagem, autor e data, com um link para o post completo.
 * Suporta um estado de carregamento para exibir um skeleton.
 *
 * @param {BlogCardProps} props - As propriedades do componente.
 * @returns {JSX.Element} O componente BlogCard renderizado.
 */
export const BlogCard = ({ title, description, image, author, date, slug, isLoading }: BlogCardProps) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR') : ''
  if (isLoading) {
    return <BlogCardSkeleton />
  }
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
        <CardContainer>
          {image && (
            <>
              <CardMedia component="img" height="200" image={image} alt="" />
              <CardOverlay />
            </>
          )}
          <CardContent sx={{ pt: image ? 2 : 3, pb: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1.5rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
              }}
            >
              {description}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Person fontSize="small" />
                <Typography variant="caption">{author}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarToday fontSize="small" />
                <Typography variant="caption">{formattedDate}</Typography>
              </Box>
            </Box>
          </CardContent>
        </CardContainer>
      </Link>
    </motion.div>
  )
}
