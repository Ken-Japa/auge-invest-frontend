import { Asset } from '../types';

export const calculateTotals = (assets: Asset[]) => {
    return assets.reduce((acc, asset) => {
        const investedValue = asset.buyPrice * asset.quantity;
        const currentValue = asset.currentPrice * asset.quantity;
        const difference = currentValue - investedValue;
        const performance = (difference / investedValue) * 100;

        return {
            invested: acc.invested + investedValue,
            current: acc.current + currentValue,
            difference: acc.difference + difference,
            performance: acc.performance + (performance * (investedValue / acc.invested)) || 0
        };
    }, { invested: 0, current: 0, difference: 0, performance: 0 });
};

export const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};