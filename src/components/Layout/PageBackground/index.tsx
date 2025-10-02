import { styled, useTheme } from '@mui/material/styles'
import { ReactNode, useState } from 'react'

import { OptimizedImage } from '@/components/Helpers/OptimizedImage'
import { transitions } from '@/theme/variables'

interface PageBackgroundProps {
  children: ReactNode
  imageName: string
  opacity?: number
  fetchPriority?: 'high' | 'low' | 'auto'
}

const BackgroundContainer = styled('div')<{ opacity: number }>(({ theme, opacity }) => ({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
  marginTop: -64,
  paddingTop: 64,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `rgba(18, 24, 38, ${opacity * 0.75})`
        : `rgba(255, 255, 255, ${opacity})`,
    zIndex: -1,
    transition: transitions.medium,
  },
}))

const BackgroundImageWrapper = styled('div')<{ isLoaded: boolean }>(({ isLoaded }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
  filter: isLoaded ? 'blur(0) grayscale(0)' : 'blur(20px) grayscale(100%)',
  '& > div': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}))

export const PageBackground = ({
  children,
  imageName,
  opacity = 0.4,
  fetchPriority,
}: PageBackgroundProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const theme = useTheme()

  const imageSrc =
    theme.palette.mode === 'dark'
      ? `/assets/images/background/${imageName}-Dark.webp`
      : `/assets/images/background/${imageName}-Light.webp`

  return (
    <BackgroundContainer opacity={opacity}>
      <BackgroundImageWrapper isLoaded={imageLoaded}>
        <OptimizedImage
          src={imageSrc}
          alt={`${imageName} Background`}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
          loadingClassName="scale-100 blur-sm grayscale-0"
          onLoad={() => setImageLoaded(true)}
        />
      </BackgroundImageWrapper>
      {children}
    </BackgroundContainer>
  )
}
