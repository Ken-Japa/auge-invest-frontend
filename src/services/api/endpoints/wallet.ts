import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { Wallet, Transaction, Position } from "../types";
import { handleApiError, ErrorCode } from "../errorHandler";

interface CreateWalletPayload {
  name: string;
  description: string;
  userId: string;
}

interface UpdateWalletPayload {
  name?: string;
  description?: string;
}

export class WalletApiService extends BaseApiService {
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

  // Transaction methods (placeholders for future implementation)
  public async createTransaction(): Promise<Transaction> {
    throw new Error("Not implemented");
  }

  public async updateTransaction(): Promise<Transaction> {
    throw new Error("Not implemented");
  }

  public async deleteTransaction(): Promise<void> {
    throw new Error("Not implemented");
  }

  public async getTransaction(): Promise<Transaction> {
    throw new Error("Not implemented");
  }

  // Position method (placeholder for future implementation)
  public async getPosition(): Promise<Position> {
    throw new Error("Not implemented");
  }
}

export const walletApi = new WalletApiService();
