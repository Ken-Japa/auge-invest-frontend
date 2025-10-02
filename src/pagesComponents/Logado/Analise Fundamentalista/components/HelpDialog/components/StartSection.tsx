import { Divider, Typography } from '@mui/material'

import { SectionTitle, StepsList } from '../styled'

/**
 * @function StartSection
 * @description Componente que exibe a seção "Para Começar" do guia de análise fundamentalista.
 * @returns {JSX.Element} O componente renderizado.
 */
export const StartSection = () => {
  return (
    <>
      <SectionTitle>Para Começar</SectionTitle>
      <Divider sx={{ mb: 2 }} />
      <Typography paragraph>
        Esta ferramenta calcula métricas essenciais para avaliar a saúde financeira e o valor de empresas.
      </Typography>
      <StepsList>
        <li>
          Os valores devem ser inseridos <span className="highlight">em milhares</span> (ex: para 1 milhão,
          digite 1000)
        </li>
        <li>Com exceção para preço da ação e ações em circulação</li>
        <br />
        <li>Adicione informações financeiras dos demonstrativos</li>
        <li>As métricas serão calculadas automaticamente, assim que possível</li>
        <li>Não é necessário adicionar valores negativos (como em Custos ou Dívidas)</li>
        <li>
          <span className="highlight">Padronize a moeda:</span> Certifique-se de que todos os valores estão na
          mesma moeda (ex: BRL, USD).
        </li>
      </StepsList>
    </>
  )
}
