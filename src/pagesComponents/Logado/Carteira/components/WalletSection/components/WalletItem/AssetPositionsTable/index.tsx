import React from 'react';
import { Box, Typography, CircularProgress, TableBody, IconButton, TableCell } from '@mui/material';
import { TransactionTable } from '../TransactionTable';
import { Add as AddIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { WalletTransactions } from '@/services/api/types/transaction';
import { formatDate2 as formatDate } from '@/components/Utils/Formatters/formatters';

import { StyledAssetTableContainer, StyledAssetTable, StyledAssetTableHead, StyledAssetTableRow, StyledAssetTableCell } from './styled';

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
}) => {
    return (
        <>
            {loadingPositions ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </Box>
            ) : errorPositions ? (
                <Typography color="error">Erro ao carregar operações: {errorPositions}</Typography>
            ) : walletPositions && walletPositions.result.length > 0 ? (
                <StyledAssetTableContainer>
                    <StyledAssetTable size="small">
                        <StyledAssetTableHead>
                            <StyledAssetTableRow>
                                <StyledAssetTableCell>Ativo</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Quantidade</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Preço</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Valor Gasto</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Valor Atual</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Diferença</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Tipo</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Data Início</StyledAssetTableCell>
                                <StyledAssetTableCell align="center">Ações</StyledAssetTableCell>
                            </StyledAssetTableRow>
                        </StyledAssetTableHead>
                        <TableBody>
                            {walletPositions.result.map((position) => {
                                const isRowExpanded = expandedRows.includes(position._id);
                                return (
                                    <React.Fragment key={position._id}>
                                        <StyledAssetTableRow>
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
                                            <StyledAssetTableCell align="center">{(position.quantity * position.averagePrice).toFixed(2)}</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">{assetTypes.find(type => type.value === position.assetType)?.label || position.assetType}</StyledAssetTableCell>
                                            <StyledAssetTableCell align="center">{formatDate(position.createdAt)}</StyledAssetTableCell>
                                            <StyledAssetTableCell>
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