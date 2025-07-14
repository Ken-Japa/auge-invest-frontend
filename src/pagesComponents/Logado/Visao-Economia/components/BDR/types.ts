export type ViewMode = "grid" | "tabela" | "cartao";

export interface Empresa {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  volume: number;
}
