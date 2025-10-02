export interface Alert {
  id: number
  symbol: string
  name: string
  buyAlert: {
    price: number
    percentage: number
  }
  sellAlert: {
    price: number
    percentage: number
  }
  active: boolean
}

export interface AlertFormData {
  symbol: string
  name: string
  buyPrice: number
  buyPercentage: number
  sellPrice: number
  sellPercentage: number
}
