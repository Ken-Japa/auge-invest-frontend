export type ViewMode = 'cartao' | 'tabela' | 'grid'

export interface Empresa {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  volume: number
}
