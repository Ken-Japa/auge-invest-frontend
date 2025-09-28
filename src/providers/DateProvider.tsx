'use client';

import 'dayjs/locale/pt-br';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            {children}
        </LocalizationProvider>
    );
};