// API base URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api-servidor-yupg.onrender.com";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    GOOGLE_LOGIN: "/login/google",
    REGISTER: "/auth/register",
    CURRENT_USER: "/auth/me",
  },

  // User endpoints
  USER: {
    CREATE: "/user/create",
    READ: "/user/read",
    UPDATE: "/user/update",
    DELETE: "/user/delete",
    UPDATE_PASSWORD: "/user/update-password",
  },

  // Company endpoints
  COMPANY: {
    PAGINATION: "/company/pagination",
    DETAIL: "/company",
  },
  // Historical data endpoints
  HISTORIC: {
    PAGINATION: "/historic/pagination",
  },
  // Derivative endpoints
  DERIVATIVE: {
    PAGINATION: "/derivative/pagination",
  },
  // FII endpoints
  FII: {
    PAGINATION: "/fiis/pagination",
    DETAIL: "/fiis",
    DIVIDENDS: "/fiis/dividendos/pagination",
  },
  //BDR endpoints
  BDR: {
    PAGINATION: "/bdr/pagination",
    DETAIL: "/bdr",
    DIVIDENDS: "/bdr/dividendos/pagination",
  },
  //BDR NP endpoints
  BDRNP: {
    PAGINATION: "/bdr/np/pagination",
    DETAIL: "/bdr/np",
    DIVIDENDS: "/bdrs/np/dividendos/pagination",
  },
  ETF: {
    PAGINATION: "/etf/pagination",
    DETAIL: "/etf",
    DIVIDENDS: "/etf/dividendos/pagination",
  },
  ETFBDR: {
    PAGINATION: "/etf/bdr/pagination",
    DETAIL: "/etf/bdr",
    DIVIDENDS: "/etf/bdr/dividendos/pagination",
  },
  // Outros grupos de endpoints...
};

export function getFullEndpointUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}
