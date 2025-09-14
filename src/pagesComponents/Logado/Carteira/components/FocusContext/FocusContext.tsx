import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FocusContextType {
  focusedWalletId: string | null;
  focusedAssetCode: string | null;
  setFocusedItem: (walletId: string | null, assetCode: string | null) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

interface FocusProviderProps {
  children: ReactNode;
}

export const FocusProvider: React.FC<FocusProviderProps> = ({ children }) => {
  const [focusedWalletId, setFocusedWalletId] = useState<string | null>(null);
  const [focusedAssetCode, setFocusedAssetCode] = useState<string | null>(null);

  const setFocusedItem = (walletId: string | null, assetCode: string | null) => {
    setFocusedWalletId(walletId);
    setFocusedAssetCode(assetCode);
  };

  return (
    <FocusContext.Provider value={{ focusedWalletId, focusedAssetCode, setFocusedItem }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};