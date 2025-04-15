// Common API response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
}

// User related types
export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  googleId?: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  cpf?: string;
  isActive?: boolean;
  preferences?: {
    defaultDashboard?: string;
    defaultPositionType?: "real" | "simulated";
    notifications?: boolean;
    theme?: "light" | "dark";
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Company related types
export interface CompanyCode {
  codigo: string;
  derivativos: boolean;
  dataInicial: string;
  preco: number | null;
  valorMercado: number | null;
}

export interface Company {
  _id: string;
  nome: string;
  setor: string;
  subsetor: string;
  descricao: string;
  site: string;
  derivativos: boolean;
  codigos: CompanyCode[];
}

export interface CompanyPagination {
  offset: number;
  limit: number;
  total: number;
  page: number;
  pages: number;
}

export interface CompanyListResponse {
  success: boolean;
  data: {
    companies: Company[];
    pagination: CompanyPagination;
  };
}

export interface CompanyFilter {
  nome?: string;
  setor?: string;
  subsetor?: string;
  page?: number;
  pageSize?: number;
}

export interface CompanyHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose?: number;
}

export interface CompanyDividend {
  id: string;
  companyId: string;
  exDate: string;
  paymentDate: string;
  recordDate?: string;
  amount: number;
  type: "DIVIDEND" | "JCP" | "STOCK_SPLIT" | "OTHER";
  currency: string;
}

// Legacy Company types (keeping for backward compatibility)
export interface LegacyCompany {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  description?: string;
  marketCap?: number;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for historical data item
export interface HistoricalDataItem {
  data: string;
  preco: number;
  volume: number;
}

// Interface for historical data response
export interface HistoricalDataResponse {
  success: boolean;
  data: {
    _id: string;
    empresa: string;
    codigo: string;
    totalHistoric: number;
    historic: HistoricalDataItem[];
    pagination: {
      offset: number;
      limit: number;
      total: number;
      page: number;
      pages: number;
    };
  };
}

// Interface for historical data filters
export interface HistoricalDataFilter {
  codigo: string;
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
}

// Derivative related types
export interface DerivativeItem {
  "COD Opcao": string;
  "Call ou Put": string;
  Tipo: string;
  "ON ou PN": string;
  Strike: string;
  Vencimento: string;
  "Ultimo Preco": number;
  "Data Negocio": string | null;
  "Hora Negocio": string;
  "Oferta Compra": number;
  "Oferta Venda": number;
  Volume: number;
  Contratos: number;
  _id: string;
}

export interface DerivativeResponse {
  success: boolean;
  data: {
    _id: string;
    Empresa: string;
    "COD Empresa": string;
    totalDerivativos: number;
    Derivativos: DerivativeItem[];
    pagination: {
      offset: number;
      limit: number;
      total: number;
      page: number;
      pages: number;
    };
  };
}

export interface DerivativeFilter {
  cod_empresa: string;
  page?: number;
  pageSize?: number;
}

export interface FIIInformation {
  cnpj: string;
  site: string;
}

export interface FII {
  _id: string;
  nomeCompletoFII: string;
  nomeFII: string;
  codigoFII: string;
  codigo: string[];
  quotaCount: string;
  quotaDateApproved: string;
  industria: string;
  segmento: string;
  informacoes: FIIInformation;
}

export interface FIIPagination {
  offset: number;
  limit: number;
  total: number;
  page: number;
  pages: number;
}

export interface FIIListResponse {
  result: FII[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
    page: number;
    pages: number;
  };
}

export interface FIIFilter {
  nome?: string;
  segmento?: string;
  page?: number;
  pageSize?: number;
}

// FII Dividend related types
export interface FIIDividendItem {
  dataPagamento: string;
  valor: string;
  relativo: string;
  dataAprovacao: string;
  tipoDividendo: string;
  ultimoDiaCom: string;
  _id: string;
}

export interface FIIDividendData {
  _id: string;
  nomeFII: string;
  quantidade: string;
  totalDividendos: number;
  dividendos: FIIDividendItem[];
}

export interface FIIDividendResponse {
  success: boolean;
  data: {
    result: FIIDividendData;
    pagination: FIIPagination;
  };
}

export interface FIIDividendFilter {
  nomeFII?: string;
  page?: number;
  pageSize?: number;
}
