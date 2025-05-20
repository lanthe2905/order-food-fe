// src/components/AppProvider.tsx
import { ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/lib';
import React, { createContext, ReactNode, useContext } from 'react';

interface AppContextProps {}

const customTheme: ThemeConfig & {
  token: ThemeConfig['token'];
} = {
  token: {},
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>
      <ConfigProvider theme={customTheme}>{children}</ConfigProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
