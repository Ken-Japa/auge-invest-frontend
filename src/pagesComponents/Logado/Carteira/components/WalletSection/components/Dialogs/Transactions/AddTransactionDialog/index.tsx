import { api } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { CreateTransactionPayload } from '@/services/api/types/transaction';
import { useState } from 'react';
import {
    TextField,
    MenuItem,
    Grid
} from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CancelButton, SaveButton } from './styled';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

interface AddTransactionDialogProps {
    open: boolean;
    onClose: () => void;
    positionId: string | null;
    userId: string;
    onSave: () => void;

}

const transactionTypes = [
    { value: 'buy', label: 'Compra' },
    { value: 'sell', label: 'Venda' },
];

export const assetTypes = [
    { value: 'acao', label: 'Ação' },
    { value: 'derivativo', label: 'Derivativo' },
    { value: 'etf', label: 'ETF' },
    { value: 'etfbdr', label: 'ETF de BDR' },
    { value: 'bdr', label: 'BDR' },
    { value: 'fii', label: 'FII' },
    { value: 'tesouro', label: 'Tesouro Direto' },
];

export const AddTransactionDialog = ({ open, onClose, positionId, onSave, userId }: AddTransactionDialogProps) => {

    const [transactionType, setTransactionType] = useState('');
    const [assetType, setAssetType] = useState('');
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs());


    const createTransactionMutation = useMutation({
        mutationFn: (payload: CreateTransactionPayload) => api.wallet.createTransaction(payload),
        onSuccess: () => {
            onClose();
            onSave();
            // Optionally, you can invalidate queries here to refetch wallet data
            // queryClient.invalidateQueries(['wallets']);
        },
        onError: (error) => {
            console.error('Erro criando a transação:', error);

        },
    });

    const handleSubmit = () => {
        if (!positionId || !transactionType || !assetType || !symbol || !quantity || !price || !date) {

            return;
        }

        const payload: CreateTransactionPayload = {
            userId: userId,
            portfolioId: positionId,
            type: transactionType as 'buy' | 'sell',
            assetType: assetType as 'stocks' | 'derivatives' | 'etfs' | 'bdrs' | 'fiis' | 'treasury',
            assetCode: symbol,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            executedAt: date ? date.toISOString() : new Date().toISOString(),
        };

        createTransactionMutation.mutate(payload);
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <StyledDialogTitle>Adicionar Transação</StyledDialogTitle>
            <StyledDialogContent>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Tipo de Ativo"
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value)}
                        >
                            {assetTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Tipo de Operação"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            {transactionTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Símbolo"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Quantidade"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Preço"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DatePicker
                            label="Data da Operação"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Grid>
                </Grid>
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose}>Cancelar</CancelButton>
                <SaveButton onClick={handleSubmit} variant="contained" disabled={createTransactionMutation.isPending}>
                    {createTransactionMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
                </SaveButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};