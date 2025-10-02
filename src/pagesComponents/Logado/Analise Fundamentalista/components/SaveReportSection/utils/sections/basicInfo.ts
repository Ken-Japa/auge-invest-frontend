import { DadosAnaliseFundamental } from '../../../../types'
import { formatCurrency, hasValue } from '../helpers'

export const generateBasicInfo = (fundamentalData: DadosAnaliseFundamental): string => {
  let section = `## Dados Básicos da Empresa\n\n`

  if (hasValue(fundamentalData.precoAcao)) {
    section += `- Preço da Ação: ${formatCurrency(fundamentalData.precoAcao)}\n`
  }

  if (hasValue(fundamentalData.acoesCirculacao)) {
    section += `- Ações em Circulação: ${fundamentalData.acoesCirculacao.toLocaleString()}\n`
    if (hasValue(fundamentalData.precoAcao)) {
      const valorMercado = fundamentalData.precoAcao * fundamentalData.acoesCirculacao
      section += `- Valor de Mercado: ${formatCurrency(valorMercado)}\n\n`
    }
  }

  return section + '\n\n'
}
