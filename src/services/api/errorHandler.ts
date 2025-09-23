import { ApiError } from "./client";

// Códigos de erro comuns
export enum ErrorCode {
  AUTHENTICATION_FAILED = "auth/failed",
  USER_NOT_FOUND = "user/not-found",
  INVALID_CREDENTIALS = "auth/invalid-credentials",
  SERVER_ERROR = "server/error",
  NETWORK_ERROR = "network/error",
  UNKNOWN_ERROR = "unknown/error",
  COMPANY_NOT_FOUND = "company/not-found",
  COMPANY_DATA_ERROR = "company/data-error",
  REGISTRATION_FAILED = "auth/registration-failed",
  FII_NOT_FOUND = "fii/not-found",
  FII_DATA_ERROR = "fii/data-error",
  BDR_NOT_FOUND = "bdr/not-found",
  BDR_DATA_ERROR = "bdr/data-error",
  ETF_NOT_FOUND = "etf/not-found",
  ETF_DATA_ERROR = "etf/data-error",
  DICTIONARY_DATA_ERROR = "dictionary/data-error",
  WALLET_NOT_FOUND = "wallet/not-found",
  WALLET_CREATION_FAILED = "wallet/creation-failed",
  WALLET_UPDATE_FAILED = "wallet/update-failed",
  WALLET_DELETION_FAILED = "wallet/deletion-failed",
  WALLET_DATA_ERROR = "wallet/data-error",
  TRANSACTION_CREATION_FAILED = "transaction/creation-failed",
  TRANSACTION_UPDATE_FAILED = "transaction/update-failed",
  TRANSACTION_DELETION_FAILED = "transaction/deletion-failed",
  TRANSACTION_NOT_FOUND = "transaction/not-found",
  FAVORITE_NOT_FOUND = "favorite/not-found",
  FAVORITE_CREATION_FAILED = "favorite/creation-failed",
  FAVORITE_DELETION_FAILED = "favorite/deletion-failed",
  ALERT_CREATION_ERROR = "alert/creation-error",
  ALERT_DATA_ERROR = "alert/data-error",
  ALERT_NOT_FOUND = "alert/not-found",
  ALERT_UPDATE_ERROR = "alert/update-error",
  ALERT_DELETE_ERROR = "alert/delete-error",
}

// Mapeamento de mensagens de erro amigáveis
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.AUTHENTICATION_FAILED]:
    "Falha na autenticação. Por favor, verifique suas credenciais e tente novamente.",
  [ErrorCode.USER_NOT_FOUND]:
    "Usuário não encontrado. Por favor, verifique as informações fornecidas.",
  [ErrorCode.INVALID_CREDENTIALS]:
    "Email ou senha inválidos. Por favor, tente novamente.",
  [ErrorCode.SERVER_ERROR]:
    "Erro no servidor. Por favor, tente novamente mais tarde.",
  [ErrorCode.NETWORK_ERROR]:
    "Erro de rede. Por favor, verifique sua conexão com a internet.",
  [ErrorCode.UNKNOWN_ERROR]:
    "Ocorreu um erro inesperado. Por favor, tente novamente.",
  [ErrorCode.COMPANY_NOT_FOUND]:
    "Empresa não encontrada. Por favor, verifique as informações fornecidas.",
  [ErrorCode.COMPANY_DATA_ERROR]:
    "Erro ao processar dados da empresa. Por favor, tente novamente.",
  [ErrorCode.REGISTRATION_FAILED]:
    "Falha no registro. Por favor, verifique as informações e tente novamente.",
  [ErrorCode.FII_NOT_FOUND]:
    "FII não encontrado. Por favor, verifique as informações fornecidas.",
  [ErrorCode.FII_DATA_ERROR]:
    "Erro ao processar dados do FII. Por favor, tente novamente.",
  [ErrorCode.BDR_NOT_FOUND]:
    "BDR não encontrado. Por favor, verifique as informações fornecidas.",
  [ErrorCode.BDR_DATA_ERROR]:
    "Erro ao processar dados do BDR. Por favor, tente novamente.",
  [ErrorCode.ETF_NOT_FOUND]:
    "ETF não encontrado. Por favor, verifique as informações fornecidas.",
  [ErrorCode.ETF_DATA_ERROR]: "Erro ao carregar dados de ETF.",
  [ErrorCode.DICTIONARY_DATA_ERROR]: "Erro ao carregar dados do dicionário.",
  [ErrorCode.WALLET_NOT_FOUND]: "Carteira não encontrada. Por favor, verifique as informações fornecidas.",
  [ErrorCode.WALLET_CREATION_FAILED]: "Falha ao criar carteira. Por favor, tente novamente.",
  [ErrorCode.WALLET_UPDATE_FAILED]: "Falha ao atualizar carteira. Por favor, tente novamente.",
  [ErrorCode.WALLET_DELETION_FAILED]: "Falha ao deletar carteira. Por favor, tente novamente.",
  [ErrorCode.WALLET_DATA_ERROR]: "Erro ao processar dados da carteira. Por favor, tente novamente.",
  [ErrorCode.TRANSACTION_CREATION_FAILED]: "Falha ao criar transação. Por favor, tente novamente.",
  [ErrorCode.TRANSACTION_UPDATE_FAILED]: "Falha ao atualizar transação. Por favor, tente novamente.",
  [ErrorCode.TRANSACTION_DELETION_FAILED]: "Falha ao deletar transação. Por favor, tente novamente.",
  [ErrorCode.TRANSACTION_NOT_FOUND]: "Transação não encontrada. Por favor, verifique as informações fornecidas.",
  [ErrorCode.FAVORITE_NOT_FOUND]: "Favorito não encontrado. Por favor, verifique as informações fornecidas.",
  [ErrorCode.FAVORITE_CREATION_FAILED]: "Falha ao criar favorito. Por favor, tente novamente.",
  [ErrorCode.FAVORITE_DELETION_FAILED]: "Falha ao deletar favorito. Por favor, tente novamente.",
  [ErrorCode.ALERT_CREATION_ERROR]: "Erro ao criar alerta. Por favor, tente novamente.",
  [ErrorCode.ALERT_DATA_ERROR]: "Erro ao buscar dados de alerta. Por favor, tente novamente.",
  [ErrorCode.ALERT_NOT_FOUND]: "Alerta não encontrado. Por favor, verifique as informações fornecidas.",
  [ErrorCode.ALERT_UPDATE_ERROR]: "Erro ao atualizar alerta. Por favor, tente novamente.",
  [ErrorCode.ALERT_DELETE_ERROR]: "Erro ao deletar alerta. Por favor, tente novamente.",
};

export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
}

export function handleApiError(
  error: any,
  defaultCode: ErrorCode = ErrorCode.UNKNOWN_ERROR
): ApiError {
  console.error("API Error:", error);

  let errorCode = defaultCode;

  if (error.response) {
    const status = error.response.status;

    if (status === 401) {
      errorCode = ErrorCode.AUTHENTICATION_FAILED;
    } else if (status === 404) {
      errorCode = ErrorCode.USER_NOT_FOUND;
    } else if (status >= 500) {
      errorCode = ErrorCode.SERVER_ERROR;
    }
  } else if (error.request) {
    errorCode = ErrorCode.NETWORK_ERROR;
  }

  return {
    message: getErrorMessage(errorCode),
    status: error.response?.status,
    data: error.response?.data,
    code: errorCode,
  };
}
