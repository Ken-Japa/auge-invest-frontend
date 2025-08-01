import { Pagination } from "./common";

export enum TransactionType {
    BUY = 'buy',
    SELL = 'sell',
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

export interface WalletTransactions {
    result: WalletTransaction[];
    pagination: Pagination;
}

export interface CreateTransactionPayload {
    userId: string;
    assetCode: string;
    assetType: string;
    type: string;
    quantity: number;
    price: number;
    portfolioId: string;
    executedAt: string;
}
