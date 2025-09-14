import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, TableBody, IconButton, TableCell, Tooltip } from '@mui/material';

import { TransactionTable } from '../TransactionTable';
import { Add as AddIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { WalletTransactions } from '@/services/api/types/transaction';
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
                                <StyledAssetTableHeaderCell align="center">Preço</StyledAssetTableHeaderCell>
                                <StyledAssetTableHeaderCell align="center">Valor Gasto</StyledAssetTableHeaderCell>
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
                                            <StyledAssetTableCell align="center">{position.quantity}</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">{position.averagePrice.toFixed(2)}</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">{formatCurrency((position.quantity * position.averagePrice).toFixed(2))}</StyledAssetTableCell>
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