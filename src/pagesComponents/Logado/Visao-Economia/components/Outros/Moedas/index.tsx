"use client";

import SearchIcon from '@mui/icons-material/Search';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';

import { ContentSkeleton } from '../../../../../../components/Feedback/Skeletons/ContentSkeleton';
import { SearchDialog } from './components/SearchDialog';
import {
    CurrencyName,
    CurrencyOption,
    CurrencyValue,
    MainCurrency,
    MainCurrencyValue,
    MainCurrencyVariation,
    MoedasContainer,
    SideCurrencies} from './styled';

// Mock data - will be replaced with API data
const mockCurrencies = [
    { id: 'USD', name: 'Dólar', value: 4.97, variation: 0.5 },
    { id: 'EUR', name: 'Euro', value: 5.42, variation: -0.3 },
    { id: 'GBP', name: 'Libra', value: 6.31, variation: 0.2 },
    { id: 'BTC', name: 'Bitcoin', value: 251432.89, variation: 2.1 },
    { id: 'JPY', name: 'Iene', value: 0.034, variation: -0.8 },
    { id: 'CNY', name: 'Yuan', value: 0.69, variation: 1.2 },
    { id: 'AUD', name: 'Dólar Australiano', value: 3.28, variation: -0.4 }
];

const formatCurrencyValue = (value: number) => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const Moedas = () => {
    const [selectedCurrency, setSelectedCurrency] = useState(mockCurrencies[0]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Get unique currencies for left and right sides
    const leftCurrencies = mockCurrencies
        .filter(c => c.id !== selectedCurrency.id)
        .slice(0, 3);

    const rightCurrencies = mockCurrencies
        .filter(c => c.id !== selectedCurrency.id && !leftCurrencies.includes(c))
        .slice(0, 3);

    return (
        <SuspenseWrapper
            fallback={<ContentSkeleton height={240} />}
        >
            <MoedasContainer>
                <IconButton
                    size="small"
                    onClick={() => setIsSearchOpen(true)}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <SearchIcon fontSize="small" />
                </IconButton>

                <SideCurrencies side="left">
                    {leftCurrencies.map((currency) => (
                        <CurrencyOption
                            key={currency.id}
                            onClick={() => setSelectedCurrency(currency)}
                            selected={currency.id === selectedCurrency.id}
                        >
                            <CurrencyName>{currency.name}</CurrencyName>
                            <CurrencyValue>R$ {formatCurrencyValue(currency.value)}</CurrencyValue>
                        </CurrencyOption>
                    ))}
                </SideCurrencies>

                <MainCurrency>
                    <CurrencyName>{selectedCurrency.name}</CurrencyName>
                    <MainCurrencyValue>
                        R$ {formatCurrencyValue(selectedCurrency.value)}
                    </MainCurrencyValue>
                    <MainCurrencyVariation $isPositive={selectedCurrency.variation >= 0}>
                        {selectedCurrency.variation >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        {selectedCurrency.variation >= 0 ? '+' : ''}{selectedCurrency.variation}%
                    </MainCurrencyVariation>
                </MainCurrency>

                <SideCurrencies side="right">
                    {rightCurrencies.map((currency) => (
                        <CurrencyOption
                            key={currency.id}
                            onClick={() => setSelectedCurrency(currency)}
                            selected={currency.id === selectedCurrency.id}
                        >
                            <CurrencyName>{currency.name}</CurrencyName>
                            <CurrencyValue>R$ {formatCurrencyValue(currency.value)}</CurrencyValue>
                        </CurrencyOption>
                    ))}
                </SideCurrencies>

                <SearchDialog
                    open={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    onSelect={(currency) => {
                        setSelectedCurrency(currency);
                        setIsSearchOpen(false);
                    }}
                    currencies={mockCurrencies}
                />
            </MoedasContainer>
        </SuspenseWrapper>
    );
};