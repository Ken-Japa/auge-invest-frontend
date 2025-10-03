import { Container } from '@mui/material'
import { motion } from 'framer-motion'

import { BlogHeaderSkeleton } from './BlogHeaderSkeleton'
import { HeaderContainer, HeaderContent, HeaderTitle, HeaderSubtitle } from './styled'

interface BlogHeaderProps {
  isLoading?: boolean
}
export const BlogHeader = ({ isLoading }: BlogHeaderProps) => {
  if (isLoading) {
    return <BlogHeaderSkeleton />
  }
  return (
    <HeaderContainer>
      <Container maxWidth="lg">
        <HeaderContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeaderTitle variant="h1">Blog Auge Invest</HeaderTitle>
            <HeaderSubtitle variant="h2">
              Análises, insights e estratégias para você tomar as melhores decisões no mercado financeiro.
            </HeaderSubtitle>
          </motion.div>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  )
}
