export interface Wallet {
  simulated: boolean
  _id: string
  userId: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export interface CreateWalletPayload {
  userId: string
  name: string
  description?: string
  simulated: boolean
}

export interface UpdateWalletPayload {
  name?: string
  description?: string
  simulated?: boolean
}
