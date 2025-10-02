export type ViewMode = 'neural' | 'tabela' | 'cartao' | 'arvore'

export interface Empresa {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  volume: number
}
