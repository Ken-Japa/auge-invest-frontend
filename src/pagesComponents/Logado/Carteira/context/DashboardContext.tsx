import { createContext, useContext, ReactNode } from 'react';
import { Position, Activity, ChartData, SummaryData } from '../types';

interface DashboardContextType {
    positions: Position[];
    activities: Activity[];
    chartData: ChartData;
    summaryData: SummaryData;
    loading: boolean;
    error: Error | null;
    addPosition: (name: string) => Promise<void>;
    addAsset: (positionId: number, assetData: any) => Promise<void>;
    renamePosition: (positionId: number, newName: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    // Implementation will go here
    return (
        <DashboardContext.Provider value={{} as DashboardContextType}>
            {children}
        </DashboardContext.Provider>
    );
};