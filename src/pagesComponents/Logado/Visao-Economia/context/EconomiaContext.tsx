import { createContext, ReactNode,useContext, useEffect, useState } from 'react';

import { EconomiaService } from '../services/api';
import { EconomicIndicators,MarketData, UserPosition } from '../types';

interface EconomiaContextType {
    stocksData: MarketData[];
    indicesData: MarketData[];
    bdrData: MarketData[];
    userPositions: UserPosition[];
    economicIndicators: EconomicIndicators | null;
    loading: boolean;
    error: Error | null;
    refreshData: () => Promise<void>;
}

const EconomiaContext = createContext<EconomiaContextType | undefined>(undefined);

export const EconomiaProvider = ({ children }: { children: ReactNode }) => {
    const [stocksData, setStocksData] = useState<MarketData[]>([]);
    const [indicesData, setIndicesData] = useState<MarketData[]>([]);
    const [bdrData, setBdrData] = useState<MarketData[]>([]);
    const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
    const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicators | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [stocks, indices, bdrs, positions, indicators] = await Promise.all([
                EconomiaService.getStocksData(),
                EconomiaService.getIndicesData(),
                EconomiaService.getBDRData(),
                EconomiaService.getUserPositions(),
                EconomiaService.getEconomicIndicators()
            ]);

            setStocksData(stocks);
            setIndicesData(indices);
            setBdrData(bdrs);
            setUserPositions(positions);
            setEconomicIndicators(indicators);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <EconomiaContext.Provider 
            value={{
                stocksData,
                indicesData,
                bdrData,
                userPositions,
                economicIndicators,
                loading,
                error,
                refreshData: fetchData
            }}
        >
            {children}
        </EconomiaContext.Provider>
    );
};

export const useEconomia = () => {
    const context = useContext(EconomiaContext);
    if (!context) {
        throw new Error('useEconomia must be used within an EconomiaProvider');
    }
    return context;
};