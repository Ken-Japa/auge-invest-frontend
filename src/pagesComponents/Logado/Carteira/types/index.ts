export interface Asset {
    id: number;
    symbol: string;
    buyDate: string;
    buyPrice: number;
    currentPrice: number;
    quantity: number;
}

export interface Position {
    id: number;
    name: string;
    assets: Asset[];
}

export interface Activity {
    id: number;
    type: 'buy' | 'sell';
    asset: string;
    quantity: number;
    price: number;
    date: Date;
}

export interface ChartData {
    labels: string[];
    data: number[];
    performance: number;
}

export interface SummaryData {
    totalValue: number;
    invested: number;
    result: number;
    performance: number;
}