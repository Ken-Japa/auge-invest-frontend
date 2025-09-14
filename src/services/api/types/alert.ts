export interface Alert {
  type: 'buy' | 'sell';
  asset: string;
  targetPrice: number;
  currentPrice: number;
  percentageDistance: number;
  notificationMethods: string[];
  expiresAt?: Date;
  recurring?: boolean;
  userId: string;
  comments?: string;
  triggered?: boolean;
}