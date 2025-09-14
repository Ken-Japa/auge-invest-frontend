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
import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext';

interface AddSameTransactionDialogProps {
    open: boolean;
    onClose: () => void;
    positionId: string | null;
    userId: string;
    onSave: () => void;
    assetCode: string | null;
    assetType: string | null;


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

export const AddSameTransactionDialog = ({ open, onClose, positionId, onSave, userId, assetCode, assetType }: AddSameTransactionDialogProps) => {

    const [transactionType, setTransactionType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const { triggerRefresh } = useRecentActivitiesRefresh();

    const createTransactionMutation = useMutation({
        mutationFn: (payload: CreateTransactionPayload) => api.wallet.createTransaction(payload),
        onSuccess: () => {
            onClose();
            onSave();
            triggerRefresh();

        },
        onError: (error) => {
            console.error('Erro criando a transação:', error);
        },
    });

    const handleSubmit = () => {
        if (!positionId || !transactionType || !assetType || !assetCode || !quantity || !price || !date) {

            return;
        }

        const payload: CreateTransactionPayload = {
            userId: userId,
            portfolioId: positionId,
            type: transactionType as 'buy' | 'sell',
            assetType: assetType as 'stocks' | 'derivatives' | 'etfs' | 'bdrs' | 'fiis' | 'treasury',
            assetCode: assetCode,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            executedAt: date ? date.toISOString() : new Date().toISOString(),
        };

        createTransactionMutation.mutate(payload);
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <StyledDialogTitle>Adicionar Transação de {assetCode} </StyledDialogTitle>
            <StyledDialogContent>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            label="Ativo"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={assetCode}
                            disabled
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            label="Tipo de Ativo"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={assetTypes.find(type => type.value === assetType)?.label || assetType}
                            disabled
                            sx={{ mb: 2 }}
                        />
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