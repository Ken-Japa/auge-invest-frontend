import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { ApiSuccessResponse,User } from "../types";

class UserApiService extends BaseApiService {
  createUser = async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await this.post<User>(
        API_ENDPOINTS.USER.CREATE,
        userData
      );
      return response;
    } catch (error) {
      console.error(`Erro criando o usuário:`, error);
      throw handleApiError(error, ErrorCode.USER_NOT_FOUND);
    }
  };

  getUserById = async (userId: string): Promise<User> => {
    try {
      const response = await this.get<User>(
        `${API_ENDPOINTS.USER.READ}/${userId}`
      );
      return response;
    } catch (error) {
      console.error(`Erro ao buscar o usuário com ID: ${userId}:`, error);
      throw handleApiError(error, ErrorCode.USER_NOT_FOUND);
    }
  };

  updateUser = async (
    userId: string,
    userData: Partial<User>
  ): Promise<User> => {
    try {
      const response = await this.put<User>(
        `${API_ENDPOINTS.USER.UPDATE}/${userId}`,
        userData
      );
      return response;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${userId}:`, error);
      throw handleApiError(error, ErrorCode.USER_NOT_FOUND);
    }
  };

  deleteUser = async (userId: string): Promise<void> => {
    try {
      await this.delete<void>(`${API_ENDPOINTS.USER.DELETE}/${userId}`);
    } catch (error) {
      console.error(`Erro ao excluir usuário com ID ${userId}:`, error);
      throw handleApiError(error, ErrorCode.USER_NOT_FOUND);
    }
  };

  updatePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    try {
      await this.put<ApiSuccessResponse<void>>(
        `${API_ENDPOINTS.USER.UPDATE_PASSWORD}/${userId}`,
        { oldPassword, newPassword }
      );
    } catch (error) {
      console.error(
        `Erro ao atualizar a senha para o usuário: ${userId}:`,
        error
      );
      throw handleApiError(error, ErrorCode.INVALID_CREDENTIALS);
    }
  };
}

export const userApi = new UserApiService();
