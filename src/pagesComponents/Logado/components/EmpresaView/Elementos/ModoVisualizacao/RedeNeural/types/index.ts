export interface EmpresaNode {
  empresa: string
  valorMercado: number
  participacao: number
  codigos?: {
    codigo: string
    preco: number
    variacao?: number
  }[]
}

export interface SegmentoNode {
  segmento: string
  valorMercado: number
  empresas: number
  participacao: number
  empresasDetalhes: EmpresaNode[]
}

export interface IndustriaNode {
  industria: string
  valorMercadoTotal: number
  participacao: number
  qtdSegmentos: number
  empresas: number
  segmentos: SegmentoNode[]
}

export interface SumarioData {
  sumarioTotal: {
    valorMercadoTotalGeral: number
    qtdIndustriasTotal: number
    qtdEmpresasTotal: number
    qtdSegmentosTotal: number
    industrias: string[]
  }
  sumario: IndustriaNode[]
}
