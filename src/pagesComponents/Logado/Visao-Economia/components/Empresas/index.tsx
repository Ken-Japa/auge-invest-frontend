'use client'

import { useState } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton'
import { VisualizationContent } from '../../../components/EmpresaView'
import { ModoVisualizacao } from '../../../components/EmpresaView/Elementos/ModoVisualizacao'
import { ViewMode } from '../../../components/EmpresaView/Elementos/ModoVisualizacao/types'
import { SearchBar } from '../../../components/EmpresaView/Elementos/SearchBar'
import { ControlsWrapper, EmpresasContainer, Title, TitleWrapper, VisualizationWrapper } from './styled'

export const Empresas = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('tabela')
  const [isLoading, setIsLoading] = useState(true)

  return (
    <ErrorBoundary>
      <SuspenseWrapper fallback={<ContentSkeleton height={400} />}>
        <EmpresasContainer>
          <ControlsWrapper>
            <ModoVisualizacao viewMode={viewMode} onChangeView={setViewMode} />
            <TitleWrapper>
              <Title>Empresas</Title>
            </TitleWrapper>
            <SearchBar />
          </ControlsWrapper>

          <VisualizationWrapper>
            <VisualizationContent viewMode={viewMode} isLoading={isLoading} setIsLoading={setIsLoading} />
          </VisualizationWrapper>
        </EmpresasContainer>
      </SuspenseWrapper>
    </ErrorBoundary>
  )
}
