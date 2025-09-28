import { Button, DialogActions, DialogContent, Divider,Typography } from '@mui/material';

import { MetricsTable, MetricsTableRow,SectionTitle, StepsList, StyledDialog, StyledDialogTitle } from './styled';

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export const HelpDialog = ({ open, onClose }: HelpDialogProps) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <StyledDialogTitle>Guia de Análise Fundamentalista</StyledDialogTitle>
      <DialogContent sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Typography paragraph>
          Esta ferramenta calcula métricas essenciais para avaliar a saúde financeira e o valor de empresas.
        </Typography>

        <SectionTitle>Para Começar</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <StepsList>
          <li>Os valores devem ser inseridos <span className="highlight">em milhares</span> (ex: para 1 milhão, digite 1000)</li>
          <li>Com exceção para preço da ação e ações em circulação</li>
          <br />
          <li>Adicione informações financeiras dos demonstrativos</li>
          <li>As métricas serão calculadas automaticamente, assim que possível</li>
          <li>Não é necessário adicionar valores negativos (como em Custos ou Dívidas)</li>
          <li><span className="highlight">Padronize a moeda:</span> Certifique-se de que todos os valores estão na mesma moeda (ex: BRL, USD).</li>
        </StepsList>


        <SectionTitle>Fontes Confiáveis para Coleta de Dados</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          • Página de Relacionamento com o Investidor ou Resultados e Comunicados das Empresas <br />
          • CVM (Relatórios ITR e DFP)
        </Typography>


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

        <SectionTitle>Cuidados e Erros Comuns</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          1. Dados Anuais vs. Trimestrais:
        </Typography>
        <Typography paragraph>
          • Use sempre dados anualizados para evitar distorções.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          2. Valores negativos:
        </Typography>
        <Typography paragraph>
          Alguns campos aceitam valores negativos:<br />
          • EBIT e EBITDA: Indica prejuízo operacional. Métricas como ROIC e EV/EBITDA serão exibidas como &ldquo;N/A&ldquo;.<br />
          • Lucro Líquido: Reflete prejuízo líquido. Métricas como P/L e ROE serão &ldquo;N/A&ldquo;.<br />
          • Dívida Líquida: Significa que a empresa tem mais caixa do que dívidas<br />
          • Imposto de Renda: Indica créditos fiscais acumulados. Afetará o cálculo do  ROIC. <br />
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          3. Dívida Bruta vs. Dívida Líquida:
        </Typography>
        <Typography paragraph>
          • Dívida Bruta: Total de empréstimos e financiamentos.<br />
          • Dívida Líquida: Subtraia o caixa da dívida bruta (ex: R$ 500mi - R$ 100mi = R$ 400mi).
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          4. EBIT vs. EBITDA:
        </Typography>
        <Typography paragraph>
          • EBIT: Lucro antes de juros e impostos (não inclui depreciação).<br />
          • EBITDA: EBIT + depreciação/amortização.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          5. Dividendos Pagos vs. Dividendos Propostos:
        </Typography>
        <Typography paragraph>
          • Use dividendos pagos e não os propostos (que ainda não foram pagos).
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          6. Receita Líquida e Lucro Líquido  vs. Receita Bruta e Lucro Bruto:
        </Typography>
        <Typography paragraph>
          • Não confundir líquido com bruto.
        </Typography>

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
            <div>{'< 15x (Setor dependente)'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>EV/EBITDA</strong>
            <div>Valor da empresa em relação ao lucro operacional. Quanto menor, melhor.</div>
            <div>{'< 10x (Setor dependente)'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>P/VP</strong>
            <div>	Comparação entre valor de mercado e valor contábil.</div>
            <div>{'< 1,5x)'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>Margem Líquida</strong>
            <div>Percentual de lucro efetivo sobre a receita.</div>
            <div>{'> 10%)'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>Margem Bruta</strong>
            <div>Eficiência na produção/vendas. </div>
            <div>{'> 40%)'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>ROE</strong>
            <div>Retorno gerado sobre o capital dos acionistas. </div>
            <div>{'> 15%)'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>ROIC</strong>
            <div>Eficiência no uso do capital (próprio e de terceiros)</div>
            <div>{'>10%'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>Dívida Líquida/EBITDA</strong>
            <div>Capacidade de pagar dívidas com lucro operacional</div>
            <div>{'< 3x'}</div>
          </MetricsTableRow>
          <MetricsTableRow>
            <strong>Dividend Yield</strong>
            <div>Retorno anual em dividendos. Alto yield pode indicar valorização ou risco.</div>
            <div>{'>4%'}</div>
          </MetricsTableRow>
        </MetricsTable>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};