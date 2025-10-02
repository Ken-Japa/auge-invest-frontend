import dynamic from 'next/dynamic'
import Link from 'next/link'

import { RECURSOS_LIST } from '../../constants/recursos'
import { BaseSection, ContentWrapper } from '../../styled'

import { RecursosSkeleton } from './RecursosSkeleton'
import { RecursosContainer } from './styled'

interface RecursosSectionProps {
  isLoading?: boolean
}
const DynamicMatrixRainText = dynamic(
  () => import('@/components/Effects/MatrixRainText').then((mod) => mod.MatrixRainText),
  {
    ssr: false,
    loading: () => <span className="title">Carregando...</span>,
  },
)
export const RecursosSection = ({ isLoading }: RecursosSectionProps) => {
  if (isLoading) {
    return <RecursosSkeleton />
  }
  return (
    <BaseSection>
      <ContentWrapper spacing={4}>
        <DynamicMatrixRainText text="Recursos Principais" className="text-3xl text-[#FF4081]" />
        <RecursosContainer>
          <div className="recursos-grid">
            <ul>
              {RECURSOS_LIST.slice(0, 3).map((recurso, index) => (
                <li key={index} className="recurso-item">
                  <span className="icon">›</span>
                  {recurso}
                </li>
              ))}
            </ul>
            <ul>
              {RECURSOS_LIST.slice(3).map((recurso, index) => (
                <li key={index + 3} className="recurso-item">
                  <span className="icon">›</span>
                  {recurso}
                </li>
              ))}
            </ul>
          </div>
          <div className="link-container">
            <Link href="/visitante/recursos" className="more-link">
              Conheça todos os recursos →
            </Link>
          </div>
        </RecursosContainer>
      </ContentWrapper>
    </BaseSection>
  )
}
