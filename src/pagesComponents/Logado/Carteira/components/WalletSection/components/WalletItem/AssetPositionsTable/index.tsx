import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TableBody, IconButton, TableCell, Tooltip } from '@mui/material';

import { TransactionTable } from '../TransactionTable';
import { Add as AddIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { Transaction, WalletTransactions } from '@/services/api/types/transaction';
import { walletApi } from '@/services/api/endpoints/wallet';
import { formatDate2 as formatDate, formatCurrency } from '@/components/Utils/Formatters/formatters';

import { StyledAssetHeaderTableRow, StyledAssetTableContainer, StyledAssetTable, StyledAssetTableHead, StyledAssetTableRow, StyledAssetTableCell, StyledAssetTableHeaderCell } from './styled';

import { assetTypes } from '../../Dialogs/Transactions/AddTransactionDialog';


interface AssetPositionsTableProps {
    walletPositions: WalletTransactions | null;
    loadingPositions: boolean;
    errorPositions: string | null;
    expandedRows: string[];
    handleToggleRow: (positionId: string) => void;
    setSelectedAssetPositionId: (id: string | null) => void;
    setIsTransactionsDialogOpen: (isOpen: boolean) => void;
    setAssetCode: (code: string | null) => void;
    setAssetType: (type: string | null) => void;
    setIsAddSameTransactionOpen: (isOpen: boolean) => void;
    onTransactionChange: () => void;
    focusedAssetCode: string | null;
}

export const AssetPositionsTable: React.FC<AssetPositionsTableProps> = ({
    walletPositions,
    loadingPositions,
    errorPositions,
    expandedRows,
    handleToggleRow,
    setSelectedAssetPositionId,
    setIsTransactionsDialogOpen,
    setAssetCode,
    setAssetType,
    setIsAddSameTransactionOpen,
    onTransactionChange,
    focusedAssetCode,
}) => {
    const [calculatedAssetData, setCalculatedAssetData] = useState<{
        [positionId: string]: { averagePrice: number; spentValue: number; quantity: number; netSpentValue: number };
    }>({});

    useEffect(() => {
        const calculateAssetData = async () => {
            if (!walletPositions || walletPositions.result.length === 0) {
                setCalculatedAssetData({});
                return;
            }

            const newCalculatedData: { [positionId: string]: { averagePrice: number; spentValue: number; quantity: number; netSpentValue: number } } = {};

            for (const position of walletPositions.result) {
                try {
                    const response = await walletApi.getTransactionsByPositionId(position._id);
                    const transactions = response.result;

                    let totalQuantity = 0;
                    let totalSpent = 0;

                    transactions.forEach((transaction: Transaction) => {
                        if (transaction.type === 'buy') {
                            totalQuantity += transaction.quantity;
                            totalSpent -= transaction.quantity * transaction.price;
                        } else if (transaction.type === 'sell') {
                            totalQuantity -= transaction.quantity;
                            totalSpent += transaction.quantity * transaction.price;
                        }
                    });

                    const averagePrice = totalQuantity !== 0 ? totalSpent / totalQuantity : 0;

                    newCalculatedData[position._id] = {
                        averagePrice: averagePrice,
                        spentValue: Math.abs(totalSpent),
                        quantity: totalQuantity,
                        netSpentValue: totalSpent,
                    };
                } catch (error) {
                    console.error(`Error calculating asset data for position ${position._id}:`, error);
                    newCalculatedData[position._id] = {
                        averagePrice: 0,
                        spentValue: 0,
                        quantity: 0,
                        netSpentValue: 0,
                    };
                }
            }
            setCalculatedAssetData(newCalculatedData);
        };

        calculateAssetData();
    }, [walletPositions, onTransactionChange]);

    useEffect(() => {
        if (focusedAssetCode && walletPositions) {
            const element = document.getElementById(`asset-row-${focusedAssetCode}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            const positionToExpand = walletPositions.result.find(position => position.assetCode === focusedAssetCode);
            if (positionToExpand && !expandedRows.includes(positionToExpand._id)) {
                handleToggleRow(positionToExpand._id);
            }
        }
    }, [focusedAssetCode, walletPositions, expandedRows, handleToggleRow]);

    return (
        <>
            {loadingPositions ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </Box>
            ) : errorPositions ? (
                <Typography color="error">Erro ao carregar operações: {errorPositions}</Typography>
            ) : walletPositions && walletPositions.result.length > 0 ? (
                <StyledAssetTableContainer sx={{ borderRadius: 3 }}>
                    <StyledAssetTable size="small" >
                        <StyledAssetTableHead>
                            <StyledAssetHeaderTableRow>
                                <StyledAssetTableHeaderCell>Ativo</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Quantidade</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Preço Médio</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Total</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Valor Atual</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Diferença</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Tipo</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Data Início</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Ações</StyledAssetTableHeaderCell>
                            </StyledAssetHeaderTableRow>
                        </StyledAssetTableHead>
                        <TableBody>
                            {walletPositions.result.map((position) => {
                                const isRowExpanded = expandedRows.includes(position._id);
                                return (
                                    <React.Fragment key={position._id}>
                                        <StyledAssetTableRow
                                            id={`asset-row-${position.assetCode}`}
                                        >
                                            <StyledAssetTableCell
                                                onClick={() => {
                                                    setSelectedAssetPositionId(position._id);
                                                    setIsTransactionsDialogOpen(true);
                                                    setAssetCode(position.assetCode);
                                                    setAssetType(position.assetType);
                                                }}
                                                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                            >
                                                {position.assetCode}
                                            </StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">
                                                <Typography variant="body2"
                                                    sx={{
                                                        color: calculatedAssetData[position._id]?.quantity !== undefined
                                                            ? (calculatedAssetData[position._id]?.quantity > 0 ? 'success.main' : 'error.main')
                                                            : 'inherit',
                                                    }}>
                                                    {calculatedAssetData[position._id]?.quantity !== undefined
                                                        ? calculatedAssetData[position._id]?.quantity.toFixed(2)
                                                        : 'N/A'}
                                                </Typography>
                                            </StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">
                                                <Typography variant="body2">
                                                    {calculatedAssetData[position._id]?.averagePrice !== undefined
                                                        ? formatCurrency(Math.abs(calculatedAssetData[position._id]?.averagePrice))
                                                        : 'N/A'}
                                                </Typography>
                                            </StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: calculatedAssetData[position._id]?.netSpentValue !== undefined
                                                            ? (calculatedAssetData[position._id]?.netSpentValue > 0 ? 'success.main' : 'error.main')
                                                            : 'inherit',
                                                    }}
                                                >
                                                    {calculatedAssetData[position._id]?.netSpentValue !== undefined
                                                        ? formatCurrency(calculatedAssetData[position._id]?.netSpentValue)
                                                        : 'N/A'}
                                                </Typography>
                                            </StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">{assetTypes.find(type => type.value === position.assetType)?.label || position.assetType}</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">{formatDate(position.createdAt)}</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => {
                                                        handleToggleRow(position._id);
                                                        setSelectedAssetPositionId(position._id);
                                                        setAssetCode(position.assetCode);
                                                        setAssetType(position.assetType);
                                                    }}
                                                >
                                                    {isRowExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </IconButton>
                                                <Tooltip title="Adicionar Transação">

                                                    <IconButton
                                                        aria-label="add same transaction"
                                                        size="small"
                                                        onClick={() => {
                                                            setIsAddSameTransactionOpen(true);
                                                            setSelectedAssetPositionId(position._id);
                                                            setAssetCode(position.assetCode);
                                                            setAssetType(position.assetType);
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledAssetTableCell>
                                        </StyledAssetTableRow>
                                        {isRowExpanded && (
                                            <StyledAssetTableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                                                    <TransactionTable
                                                        assetCode={position.assetCode}
                                                        assetType={position.assetType}
                                                        positionId={position._id}
                                                        onTransactionChange={onTransactionChange}
                                                    />
                                                </TableCell>
                                            </StyledAssetTableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </StyledAssetTable>
                </StyledAssetTableContainer>
            ) : (
                <Typography>Nenhuma operação encontrada para esta carteira.</Typography>
            )}
        </>
    );
};