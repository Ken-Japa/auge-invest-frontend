import { Divider, Typography } from '@mui/material'

import { SectionTitle } from '../styled'

/**
 * @function CommonErrorsSection
 * @description Componente que exibe a seção "Cuidados e Erros Comuns" do guia de análise fundamentalista.
 * @returns {JSX.Element} O componente renderizado.
 */
export const CommonErrorsSection = () => {
  return (
    <>
      <SectionTitle>Cuidados e Erros Comuns</SectionTitle>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        1. Dados Anuais vs. Trimestrais:
      </Typography>
      <Typography paragraph>• Use sempre dados anualizados para evitar distorções.</Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
        2. Valores negativos:
      </Typography>
      <Typography paragraph>
        Alguns campos aceitam valores negativos:
        <br />
        • EBIT e EBITDA: Indica prejuízo operacional. Métricas como ROIC e EV/EBITDA serão exibidas como
        &ldquo;N/A&ldquo;.
        <br />
        • Lucro Líquido: Reflete prejuízo líquido. Métricas como P/L e ROE serão &ldquo;N/A&ldquo;.
        <br />
        • Dívida Líquida: Significa que a empresa tem mais caixa do que dívidas
        <br />
        • Imposto de Renda: Indica créditos fiscais acumulados. Afetará o cálculo do ROIC. <br />
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
        3. Dívida Bruta vs. Dívida Líquida:
      </Typography>
      <Typography paragraph>
        • Dívida Bruta: Total de empréstimos e financiamentos.
        <br />• Dívida Líquida: Subtraia o caixa da dívida bruta (ex: R$ 500mi - R$ 100mi = R$ 400mi).
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        4. EBIT vs. EBITDA:
      </Typography>
      <Typography paragraph>
        • EBIT: Lucro antes de juros e impostos (não inclui depreciação).
        <br />• EBITDA: EBIT + depreciação/amortização.
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        5. Dividendos Pagos vs. Dividendos Propostos:
      </Typography>
      <Typography paragraph>
        • Use dividendos pagos e não os propostos (que ainda não foram pagos).
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        6. Receita Líquida e Lucro Líquido vs. Receita Bruta e Lucro Bruto:
      </Typography>
      <Typography paragraph>• Não confundir líquido com bruto.</Typography>
    </>
  )
}
