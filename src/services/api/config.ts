/**
 * @constant {string} API_BASE_URL - A URL base para todas as requisições da API.
 * Obtém o valor da variável de ambiente NEXT_PUBLIC_API_URL ou usa um valor padrão.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-servidor-yupg.onrender.com'

/**
 * @constant {object} API_ENDPOINTS - Objeto contendo todos os endpoints da API, categorizados por funcionalidade.
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    GOOGLE_LOGIN: '/login/google',
    REGISTER: '/auth/register',
    CURRENT_USER: '/auth/me',
  },

  // User endpoints
  USER: {
    CREATE: '/user/create',
    READ: '/user/read',
    UPDATE: '/user/update',
    DELETE: '/user/delete',
    UPDATE_PASSWORD: '/user/update-password',
  },

  // Company endpoints
  COMPANY: {
    PAGINATION: '/company/pagination',
    DETAIL: '/company',
    DIVIDENDS: '/company/dividendos/pagination',
  },
  // Historical data endpoints
  HISTORIC: {
    PAGINATION: '/historic/pagination',
  },
  // Derivative endpoints
  DERIVATIVE: {
    PAGINATION: '/derivative/pagination',
  },
  // FII endpoints
  FII: {
    PAGINATION: '/fiis/pagination',
    DETAIL: '/fiis',
    DIVIDENDS: '/fiis/dividendos/pagination',
  },
  //BDR endpoints
  BDR: {
    PAGINATION: '/bdr/pagination',
    DETAIL: '/bdr',
    DIVIDENDS: '/bdr/dividendos/pagination',
  },
  //BDR NP endpoints
  BDRNP: {
    PAGINATION: '/bdr/np/pagination',
    DETAIL: '/bdr/np',
  },
  //ETF endpoints
  ETF: {
    PAGINATION: '/etf/pagination',
    DETAIL: '/etf',
  },
  ETFBDR: {
    PAGINATION: '/etf/bdr/pagination',
    DETAIL: '/etf/bdr',
  },
  //Dictionary endpoints
  DICTIONARY: {
    PAGINATION: '/dictionary/pagination',
  },
  //Dictionary endpoints
  SUMARIO: {
    PAGINATION: '/sumario/pagination',
  },
  // Wallet endpoints
  WALLET: {
    CREATE: '/portfolios',
    DELETE: '/portfolios',
    UPDATE: '/portfolios',
    GET_WALLET_POSITION: '/positions',
    GET_USER_WALLETS: '/portfolios/user',
    GET_WALLET: '/portfolios',
  },
  // Transaction endpoints
  TRANSACTION: {
    CREATE: '/transaction',
    UPDATE: '/transaction',
    DELETE: '/transaction',
    GET: '/transaction',
    PAGINATION: '/transaction/pagination',
  },
  // Alert endpoints
  ALERTS: {
    BASE: '/alerts',
    USER_ALERTS: '/alerts',
  },
  // Favorite endpoints
  FAVORITES: {
    BASE: '/favorites',
  },
  // Outros grupos de endpoints...
}

/**
 * Constrói a URL completa para um endpoint da API.
 * @param {string} endpoint O caminho do endpoint (ex: '/login').
 * @returns {string} A URL completa do endpoint.
 */
export function getFullEndpointUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`
}
