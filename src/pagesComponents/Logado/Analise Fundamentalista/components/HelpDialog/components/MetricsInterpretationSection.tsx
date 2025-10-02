import { Divider } from '@mui/material'

import { MetricsTable, MetricsTableRow, SectionTitle } from '../styled'

/**
 * @function MetricsInterpretationSection
 * @description Componente que exibe a seção "Métricas Calculadas e Sua Interpretação" do guia de análise fundamentalista.
 * @returns {JSX.Element} O componente renderizado.
 */
export const MetricsInterpretationSection = () => {
  return (
    <>
      <SectionTitle>Métricas Calculadas e Sua Interpretação</SectionTitle>
      <Divider sx={{ mb: 2 }} />
      <MetricsTable>
        <MetricsTableRow>
          <strong>Métrica</strong>
          <strong>Interpretação </strong>
          <strong>Referência Ideal</strong>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>P/L (Preço/Lucro)</strong>
          <div>Anos necessários para recuperar o investimento com o lucro atual.</div>
          <div>{' < 15x (Setor dependente)'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>EV/EBITDA</strong>
          <div>Valor da empresa em relação ao lucro operacional. Quanto menor, melhor.</div>
          <div>{' < 10x (Setor dependente)'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>P/VP</strong>
          <div> Comparação entre valor de mercado e valor contábil.</div>
          <div>{' < 1,5x'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Margem Líquida</strong>
          <div>Percentual de lucro efetivo sobre a receita.</div>
          <div>{' > 10%'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Margem Bruta</strong>
          <div>Eficiência na produção/vendas. </div>
          <div>{' > 40%'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>ROE</strong>
          <div>Retorno gerado sobre o capital dos acionistas. </div>
          <div>{' > 15%'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>ROIC</strong>
          <div>Eficiência no uso do capital (próprio e de terceiros)</div>
          <div>{' >10%'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Dívida Líquida/EBITDA</strong>
          <div>Capacidade de pagar dívidas com lucro operacional</div>
          <div>{' < 3x'}</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Dividend Yield</strong>
          <div>Retorno anual em dividendos. Alto yield pode indicar valorização ou risco.</div>
          <div>{' >4%'}</div>
        </MetricsTableRow>
      </MetricsTable>
    </>
  )
}
