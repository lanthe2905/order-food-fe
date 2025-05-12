import { createContext } from 'react';
import dayjs from 'dayjs';

interface WorkshiftProcessContextType {
  thang: dayjs.Dayjs | null;
}

export const WorkshiftProcessContext = createContext<WorkshiftProcessContextType>({
  thang: null,
});
