export interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  sector?: string
}

export interface UserPosition {
  id: number
  name: string
  return: number
  assets: MarketData[]
}

export interface EconomicIndicators {
  selic: {
    current: number
    forecast: number
    lastUpdate: string
  }
  inflation: {
    current: number
    forecast: number
    history: { date: string; value: number }[]
  }
  currencies: {
    symbol: string
    name: string
    value: number
    change: number
  }[]
  commodities: {
    symbol: string
    name: string
    value: number
    change: number
  }[]
}
