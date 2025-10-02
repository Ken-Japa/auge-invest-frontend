import dynamic from 'next/dynamic'

import { HeaderContainer, Subtitle, Title } from './styled'

const DynamicMatrixRainText = dynamic(
  () => import('@/components/Effects/MatrixRainText').then((mod) => mod.MatrixRainText),
  {
    ssr: false,
    loading: () => <span className="matrix-title">Carregando...</span>,
  },
)

export const FormHeader = () => {
  return (
    <HeaderContainer>
      <Title id="login-dialog-title">
        <DynamicMatrixRainText text="Bem-vindo de volta" className="matrix-title" />
      </Title>
      <Subtitle>Entre com suas credenciais para acessar sua conta</Subtitle>
    </HeaderContainer>
  )
}
