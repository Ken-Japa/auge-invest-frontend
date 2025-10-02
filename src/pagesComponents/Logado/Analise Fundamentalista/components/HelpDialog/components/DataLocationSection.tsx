import { Divider } from '@mui/material'

import { MetricsTable, MetricsTableRow, SectionTitle } from '../styled'

/**
 * @function DataLocationSection
 * @description Componente que exibe a seção "Onde Encontrar os Dados" do guia de análise fundamentalista.
 * @returns {JSX.Element} O componente renderizado.
 */
export const DataLocationSection = () => {
  return (
    <>
      <SectionTitle>Onde Encontrar os Dados</SectionTitle>
      <Divider sx={{ mb: 2 }} />
      <MetricsTable>
        <MetricsTableRow>
          <strong>Campo</strong>
          <strong>Localização nos Relatórios</strong>
          <strong>Dica Extra</strong>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Receita Líquida</strong>
          <div>DRE: Linha &quot;Receita Líquida&quot; ou &quot;Vendas Líquidas&quot;</div>
          <div>Exclui impostos e devoluções</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Custos dos Produtos</strong>
          <div>DRE: Linha &quot;Custo dos Produtos Vendidos&quot; ou &quot;Custo das Vendas&quot;</div>
          <div>Não inclua despesas administrativas</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>EBITDA</strong>
          <div>Seção &quot;Resultados Operacionais&quot; ou &quot;Métricas Não-IFRS&quot;</div>
          <div>Se não houver, calcule: EBIT + Depreciação</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>EBIT</strong>
          <div>DRE: &quot;Lucro Operacional&quot; ou &quot;Resultado Antes do Resultado Financeiro&quot;</div>
          <div>Alternativa: EBITDA - Depreciação/Amortização</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Lucro Líquido</strong>
          <div>DRE: &quot;Lucro Líquido do Período&quot;</div>
          <div>Resultado final após todos impostos e juros</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Imposto de Renda</strong>
          <div>DRE: &quot;Imposto de Renda e Contribuição Social&quot;</div>
          <div>Use o valor efetivamente pago</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Patrimônio Líquido</strong>
          <div>Balanço Patrimonial: Ativo Total - Passivo Total</div>
          <div>Verifique se inclui reservas</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Dívida Líquida</strong>
          <div>Balanço ou seção de Endividamentos: Dívida Bruta - Caixa</div>
          <div>Dívida Bruta = Empréstimos + Financiamentos</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Caixa e Equivalentes</strong>
          <div>DFC: &quot;Disponibilidades&quot; ou &quot;Caixa e Equivalentes&quot;</div>
          <div>Use o valor do fim do período</div>
        </MetricsTableRow>
        <MetricsTableRow>
          <strong>Dividendos Pagos</strong>
          <div>DFC: Seção &quot;Atividades de Financiamento&quot;</div>
          <div>Ignore dividendos propostos/não pagos</div>
        </MetricsTableRow>
      </MetricsTable>
    </>
  )
}
