import { EconomicIndicators, MarketData, UserPosition } from '../types'

export const EconomiaService = {
  getStocksData: async () => {
    // Will be implemented with real API
    return [] as MarketData[]
  },

  getIndicesData: async () => {
    // Will be implemented with real API
    return [] as MarketData[]
  },

  getBDRData: async () => {
    // Will be implemented with real API
    return [] as MarketData[]
  },

  getUserPositions: async () => {
    // Will be implemented with real API
    return [] as UserPosition[]
  },

  getEconomicIndicators: async () => {
    // Will be implemented with real API
    return {} as EconomicIndicators
  },
}
