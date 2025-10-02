import { OptimizedImage } from '@/components/Helpers/OptimizedImage'

import { LogoContainer } from './styled'

interface LogoProps {
  width?: number
  height?: number
  onClick?: () => void
}

export const Logo = ({ width = 60, height = 60, onClick }: LogoProps) => {
  return (
    <LogoContainer onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <OptimizedImage
        src="/assets/images/logo/icon-48.webp"
        alt="Auge Invest"
        width={width}
        height={height}
        priority
        style={{
          maxWidth: '100%',
          aspectRatio: `${width}/${height}`,
        }}
      />
    </LogoContainer>
  )
}
