export interface Codigo {
  codigo: string
  preco: number
  variacao: number
  'valor mercado'?: number
  precoAnterior?: number
}

export interface Dividendo {
  tipo: string
  dataAprovacao: string
  valor: string
  ratio: string
  tipoDividendo: string
  ultimoDiaCom: string
  valorUltimoDiaCom: string
}

export interface DividendoExtended extends Dividendo {
  date?: string | Date
  value?: number
  amount?: number
}

export interface EmpresaDetalhada {
  nome: string
  industria: string
  segmento: string
  codigos: Codigo[]
  valorMercado: number
  dividendos: Dividendo[]
}
