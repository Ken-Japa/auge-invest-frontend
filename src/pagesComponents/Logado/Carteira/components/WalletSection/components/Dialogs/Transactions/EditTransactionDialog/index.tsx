import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography, TextField, CircularProgress, MenuItem, Select, FormControl, InputLabel, Box, Grid } from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CancelButton, SaveButton } from './styled';
import { TransactionType } from '@/services/api/types/transaction';
import { api } from '@/services/api';

import { Transaction } from '@/services/api/types/transaction';

interface EditTransactionDialogProps {
    open: boolean;
    onClose: () => void;
    transaction: Transaction | null;
    onSave: () => void;
    assetCode: string | null;
    assetType: string | null;
}

export const assetTypes = [
    { value: 'acao', label: 'Ação' },
    { value: 'derivativo', label: 'Derivativo' },
    { value: 'etf', label: 'ETF' },
    { value: 'etfbdr', label: 'ETF de BDR' },
    { value: 'bdr', label: 'BDR' },
    { value: 'fii', label: 'FII' },
    { value: 'tesouro', label: 'Tesouro Direto' },
];

export const EditTransactionDialog: React.FC<EditTransactionDialogProps> = ({
    open,
    onClose,
    transaction,
    onSave,
    assetCode,
    assetType,
}) => {
    const [quantity, setQuantity] = useState<number>(transaction?.quantity || 0);
    const [price, setPrice] = useState<number>(transaction?.price || 0);
    const [type, setType] = useState<TransactionType>(transaction?.type as TransactionType || TransactionType.BUY);
    const [executedAt, setExecutedAt] = useState<Dayjs | null>(transaction?.executedAt ? dayjs(transaction.executedAt) : dayjs());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (transaction) {
            setQuantity(transaction.quantity);
            setPrice(transaction.price);
            setType(transaction.type as TransactionType);
            setExecutedAt(dayjs(transaction.executedAt));
        }
    }, [transaction]);

    const handleSave = async () => {
        if (!transaction || !executedAt) return;

        setLoading(true);
        setError(null);
        try {
            await api.wallet.updateTransaction(
                transaction._id,
                {
                    quantity,
                    price,
                    type,
                    executedAt: executedAt.toISOString(),
                }
            );
            onSave();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to update transaction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogTitle>Editar Operação</StyledDialogTitle>
            <StyledDialogContent>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">Erro ao carregar transação: {error}</Typography>
                ) : (
                    <Grid spacing={4} padding={4}>
                        <TextField
                            margin="dense"
                            label="Ativo"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={assetCode}
                            disabled
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            margin="dense"
                            label="Tipo de Ativo"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={assetTypes.find(type => type.value === assetType)?.label || assetType}
                            disabled
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Quantidade"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            margin="dense"
                            label="Preço"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            sx={{ mb: 4 }}
                        />
                        <FormControl fullWidth margin="dense" sx={{ mb: 4 }}>
                            <InputLabel>Tipo</InputLabel>
                            <Select
                                value={type}
                                label="Tipo"
                                onChange={(e) => setType(e.target.value as TransactionType)}
                            >
                                <MenuItem value={TransactionType.BUY}>Compra</MenuItem>
                                <MenuItem value={TransactionType.SELL}>Venda</MenuItem>
                            </Select>
                        </FormControl>
                        <DatePicker
                            label="Data da Operação"
                            value={executedAt}
                            onChange={(newValue) => setExecutedAt(newValue)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Grid>
                )}

                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose} disabled={loading}>
                    Cancelar
                </CancelButton>
                <SaveButton onClick={handleSave} disabled={loading}>
                    Salvar
                </SaveButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};