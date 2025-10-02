export interface Codigo {
  codigo: string
  preco: number
  variacao?: number
}

export interface EmpresaDetalhe {
  empresa: string
  valorMercado: number
  codigos: Codigo[]
}

export interface Segmento {
  segmento: string
  valorMercado: number
  empresasDetalhes: EmpresaDetalhe[]
}

export interface Industria {
  industria: string
  valorMercadoTotal: number
  segmentos: Segmento[]
}

export interface SumarioTotal {
  valorMercadoTotalGeral: number
  qtdIndustriasTotal: number
  qtdEmpresasTotal: number
  qtdSegmentosTotal: number
  industrias: string[]
}

export interface SumarioData {
  sumario: Industria[]
  sumarioTotal: SumarioTotal
}

export interface IndustriaRowProps {
  industria: string
  valorMercadoTotal: number
  valorMercadoGeral: number
  segmentos: Segmento[]
  hideSegmentos: boolean
}

export interface SegmentoSectionProps {
  segmento: Segmento
  valorMercadoIndustria: number
  valorMercadoTotal: number
}
