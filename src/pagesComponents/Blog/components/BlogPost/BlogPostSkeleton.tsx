import { Box, Container } from '@mui/material'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { PostContainer } from './styled'

export const BlogPostSkeleton = () => {
  return (
    <PostContainer>
      <Container maxWidth="lg">
        <Box className="mb-8">
          <ContentSkeleton
            type="text"
            width="70%"
            height={80}
            className="bg-[#ffffff0a] backdrop-blur-sm"
            style={{
              margin: '0 auto',
              marginBottom: '2rem',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <ContentSkeleton
              type="text"
              width={200}
              height={24}
              className="bg-[#ffffff0a] backdrop-blur-sm"
            />
            <ContentSkeleton
              type="text"
              width={150}
              height={24}
              className="bg-[#ffffff0a] backdrop-blur-sm"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            {[1, 2, 3].map((i) => (
              <ContentSkeleton
                key={i}
                variant="rectangular"
                width={80}
                height={32}
                className="bg-[#ffffff0a] backdrop-blur-sm"
                style={{
                  borderRadius: '16px',
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          {[1, 2, 3, 4].map((i) => (
            <ContentSkeleton
              key={i}
              type="text"
              width="100%"
              height={24}
              className="bg-[#ffffff0a] backdrop-blur-sm"
              style={{
                marginBottom: '1rem',
              }}
            />
          ))}
        </Box>
      </Container>
    </PostContainer>
  )
}
