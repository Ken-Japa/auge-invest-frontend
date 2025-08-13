import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import {
  Wallet,
  Transaction,
  CreateWalletPayload,
  UpdateTransactionPayload,
  CreateTransactionPayload,
  UpdateWalletPayload,
  WalletTransactions,
  PaginatedTransactions,
} from "../types";
import { handleApiError, ErrorCode } from "../errorHandler";

class WalletApiService extends BaseApiService {
  constructor() {
    super();
  }

  public async createWallet(payload: CreateWalletPayload): Promise<Wallet> {
    try {
      const response = await this.post<Wallet>(
        API_ENDPOINTS.WALLET.CREATE,
        payload
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.WALLET_CREATION_FAILED);
    }
  }

  public async deleteWallet(id: string): Promise<void> {
    try {
      await this.delete<void>(`${API_ENDPOINTS.WALLET.DELETE}/${id}`);
    } catch (error) {
      throw handleApiError(error, ErrorCode.WALLET_DELETION_FAILED);
    }
  }

  public async updateWallet(
    id: string,
    payload: UpdateWalletPayload
  ): Promise<Wallet> {
    try {
      const response = await this.put<Wallet>(
        `${API_ENDPOINTS.WALLET.UPDATE}/${id}`,
        payload
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.WALLET_UPDATE_FAILED);
    }
  }

  public async getWalletPosition(id: string): Promise<WalletTransactions> {
    try {
      const response = await this.get<WalletTransactions>(
        `${API_ENDPOINTS.WALLET.GET_WALLET_POSITION}/${id}`
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.WALLET_NOT_FOUND);
    }
  }

  public async getUserWallets(userId: string): Promise<Wallet[]> {
    try {
      const response = await this.get<Wallet[]>(
        `${API_ENDPOINTS.WALLET.GET_USER_WALLETS}/${userId}`
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.WALLET_DATA_ERROR);
    }
  }

  public async getWalletById(id: string): Promise<Wallet> {
    try {
      const response = await this.get<Wallet>(
        `${API_ENDPOINTS.WALLET.GET_WALLET}/${id}`
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.WALLET_NOT_FOUND);
    }
  }

  // Transaction methods
  public async createTransaction(
    payload: CreateTransactionPayload
  ): Promise<Transaction> {
    try {
      const response = await this.post<Transaction>(
        API_ENDPOINTS.TRANSACTION.CREATE,
        payload
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.TRANSACTION_CREATION_FAILED);
    }
  }

  public async updateTransaction(
    positionId: string,
    payload: UpdateTransactionPayload
  ): Promise<Transaction> {
    try {
      const response = await this.put<Transaction>(
        `${API_ENDPOINTS.TRANSACTION.UPDATE}/${positionId}`,
        payload
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.TRANSACTION_UPDATE_FAILED);
    }
  }

  public async deleteTransaction(transactionId: string): Promise<void> {
    try {
      await this.delete<void>(
        `${API_ENDPOINTS.TRANSACTION.DELETE}/${transactionId}`
      );
    } catch (error) {
      throw handleApiError(error, ErrorCode.TRANSACTION_DELETION_FAILED);
    }
  }

  public async getTransaction(transactionId: string): Promise<Transaction> {
    try {
      const response = await this.get<Transaction>(
        `${API_ENDPOINTS.TRANSACTION.GET}/${transactionId}`
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.TRANSACTION_NOT_FOUND);
    }
  }

  public async getTransactionsByPositionId(
    positionId: string,
    page: number = 0,
    pageSize: number = 10
  ): Promise<PaginatedTransactions> {
    try {
      const response = await this.get<PaginatedTransactions>(
        `${API_ENDPOINTS.TRANSACTION.PAGINATION}?positionId=${positionId}&page=${page}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      throw handleApiError(error, ErrorCode.TRANSACTION_NOT_FOUND);
    }
  }
}
export const walletApi = new WalletApiService();
