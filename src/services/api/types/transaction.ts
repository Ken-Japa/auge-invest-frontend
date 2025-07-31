export interface Transaction {
  _id: string;
  positionId: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  executedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  _id: string;
  walletId: string;
  assetCode: string;
  assetType: string;
  quantity: number;
  averagePrice: number;
  totalCost: number;
  currentPrice: number;
  currentValue: number;
  profitOrLoss: number;
  profitOrLossPercentage: number;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  userId: string;
  assetCode: string;
  assetType: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  portfolioId: string;
  executedAt: string;
}

export interface UpdateTransactionPayload {
  quantity?: number;
  price?: number;
  type?: "buy" | "sell";
}

export interface CreateWalletPayload {
  name: string;
  description: string;
  userId: string;
}

export interface UpdateWalletPayload {
  name?: string;
  description?: string;
}
