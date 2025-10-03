import { Box, Typography, Divider } from '@mui/material'
import { motion } from 'framer-motion'

import type { BlogPost } from '../../constants/blogPosts'

import { BlogCategoriesSkeleton } from './BlogCategoriesSkeleton'
import { CategoriesContainer, CategoryButton } from './styled'

interface BlogCategoriesProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  isLoading?: boolean
  posts: BlogPost[]
}

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'analise-tecnica', label: 'Análise Técnica' },
  { id: 'fundamentalista', label: 'Análise Fundamentalista' },
  { id: 'economia', label: 'Economia' },
  { id: 'noticia', label: 'Notícias' },
  { id: 'educacional', label: 'Educacional' },
  { id: 'alertas', label: 'Alertas' },
  { id: 'indicadores', label: 'Indicadores' },
]

export const BlogCategories = ({
  selectedCategory,
  onCategoryChange,
  isLoading,
  posts,
}: BlogCategoriesProps) => {
  if (isLoading) {
    return <BlogCategoriesSkeleton />
  }
  return (
    <CategoriesContainer>
      <Typography variant="h5" className="font-bold text-white mb-8 text-center">
        Categorias
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box className="flex flex-col gap-2 mt-4">
        {categories.map((category) => (
          <motion.div key={category.id} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <CategoryButton
              onClick={() => onCategoryChange(category.id)}
              isSelected={selectedCategory === category.id}
            >
              {category.label}
              {selectedCategory === category.id && (
                <span className="ml-2">
                  (
                  {
                    posts.filter((post) =>
                      selectedCategory === 'all'
                        ? true
                        : post.category &&
                          (Array.isArray(post.category)
                            ? post.category.includes(selectedCategory)
                            : post.category === selectedCategory),
                    ).length
                  }
                  )
                </span>
              )}
            </CategoryButton>
          </motion.div>
        ))}
      </Box>
    </CategoriesContainer>
  )
}
