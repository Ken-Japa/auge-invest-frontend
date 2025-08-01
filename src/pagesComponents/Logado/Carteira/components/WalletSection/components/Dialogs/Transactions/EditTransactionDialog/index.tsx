import React, { useState, useEffect } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransactionType, WalletTransaction } from '@/services/api/types/transaction';
import { api } from '@/services/api';

interface EditTransactionDialogProps {
    open: boolean;
    onClose: () => void;
    transaction: WalletTransaction | null;
    onSave: () => void;
}

export const EditTransactionDialog: React.FC<EditTransactionDialogProps> = ({
    open,
    onClose,
    transaction,
    onSave,
}) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [type, setType] = useState<TransactionType>(TransactionType.BUY);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (transaction) {
            setQuantity(transaction.quantity);
            setPrice(transaction.averagePrice);

        }
    }, [transaction]);

    const handleSave = async () => {
        if (!transaction) return;

        setLoading(true);
        setError(null);
        try {
            await api.wallet.updateTransaction(
                transaction._id,
                {
                    quantity,
                    price,
                    type,
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Operação</DialogTitle>
            <DialogContent>
                {transaction && (
                    <>
                        <TextField
                            margin="dense"
                            label="Ativo"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={transaction.assetCode}
                            disabled
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Preço"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
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
                    </>
                )}
                {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary" disabled={loading}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};