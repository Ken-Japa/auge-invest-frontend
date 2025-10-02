import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { type FC } from 'react'

import { visitorColors } from '@/theme/palette/visitor'

import { HeaderSkeleton } from './HeaderSkeleton'
import { HeaderContainer, HeaderIcon } from './styled'

interface HeaderProps {
  isLoading?: boolean
}

const ICON_STYLES = {
  fontSize: 40,
  color: visitorColors.primary,
} as const

const LOADING_TITLE = (
  <Typography variant="h4" className="title">
    Junte-se ao Time
  </Typography>
)

const DynamicMatrixRainText = dynamic(
  () =>
    import('@/components/Effects/MatrixRainText').then((mod) => ({
      default: mod.MatrixRainText,
    })),
  {
    ssr: false,
    loading: () => LOADING_TITLE,
  },
)

export const Header: FC<HeaderProps> = ({ isLoading }) => {
  if (isLoading) {
    return <HeaderSkeleton />
  }

  return (
    <HeaderContainer>
      <div className="header-content">
        <HeaderIcon />
        <DynamicMatrixRainText text="Junte-se ao Time" className="title" />
      </div>
      <Typography variant="h4" className="subtitle">
        Estamos sempre em busca de talentos apaixonados por inovação e mercado financeiro
      </Typography>
    </HeaderContainer>
  )
}
