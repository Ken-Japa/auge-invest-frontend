import { Pagination } from "./common";

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

export interface Positions {
  _id: string;
  portfolioId: string;
  assetCode: string;
  assetType: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  simulationType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WalletTransactions {
  result: Positions[];
  pagination: Pagination;
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
  executedAt?: string;
}

export interface CreateWalletPayload {
  name: string;
  description: string;
  userId: string;
  simulated: boolean;
}

export interface UpdateWalletPayload {
  name?: string;
  description?: string;
  simulated?: boolean;
}

export enum TransactionType {
  BUY = "buy",
  SELL = "sell",
}

export interface WalletTransaction {
  _id: string;
  positionId: string;
  assetCode: string;
  assetType: string;
  quantity: number;
  averagePrice: number;
  executedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedTransactions {
  result: Transaction[];
  pagination: Pagination;
}
