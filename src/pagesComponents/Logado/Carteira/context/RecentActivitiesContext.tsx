import React, { createContext, useContext, useState, useCallback } from 'react';

interface RecentActivitiesContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const RecentActivitiesContext = createContext<RecentActivitiesContextType | undefined>(undefined);

export const RecentActivitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <RecentActivitiesContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </RecentActivitiesContext.Provider>
  );
};

export const useRecentActivitiesRefresh = () => {
  const context = useContext(RecentActivitiesContext);
  if (context === undefined) {
    throw new Error('useRecentActivitiesRefresh must be used within a RecentActivitiesProvider');
  }
  return context;
};