export interface Wallet {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  walletId: string;
  totalBalance: number;
  lastUpdate: string;
}