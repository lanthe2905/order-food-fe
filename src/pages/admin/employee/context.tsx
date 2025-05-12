import { createContext } from 'react';
import { Employee } from './typing';

export const PageContext = createContext<{
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  selectdEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
}>;
