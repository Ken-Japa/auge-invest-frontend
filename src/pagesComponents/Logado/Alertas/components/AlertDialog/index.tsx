import { useState, useEffect } from 'react';
import {
    TextField,
    Grid,
    InputAdornment
} from '@mui/material';

import { Alert } from '../../types';
import { useAlerts } from '../../hooks/useAlerts';
import { StyledDialog } from '@/components/Feedback/Dialog/StyledDialog';

interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    alert: Alert | null;
}

export const AlertDialog = ({ open, onClose, alert }: AlertDialogProps) => {
    const { createAlert, updateAlert } = useAlerts();
    const [formData, setFormData] = useState({
        symbol: '',
        name: '',
        buyPrice: 0,
        buyPercentage: 5,
        sellPrice: 0,
        sellPercentage: 5,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (alert) {
            setFormData({
                symbol: alert.symbol,
                name: alert.name,
                buyPrice: alert.buyAlert.price,
                buyPercentage: alert.buyAlert.percentage,
                sellPrice: alert.sellAlert.price,
                sellPercentage: alert.sellAlert.percentage,
            });
        } else {
            setFormData({
                symbol: '',
                name: '',
                buyPrice: 0,
                buyPercentage: 5,
                sellPrice: 0,
                sellPercentage: 5,
            });
        }
    }, [alert, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('Percentage') || name.includes('Price') 
                ? parseFloat(value) || 0 
                : value
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            
            const alertData = {
                symbol: formData.symbol,
                name: formData.name || formData.symbol,
                currentPrice: (formData.buyPrice + formData.sellPrice) / 2,
                buyAlert: {
                    price: formData.buyPrice,
                    percentage: formData.buyPercentage
                },
                sellAlert: {
                    price: formData.sellPrice,
                    percentage: formData.sellPercentage
                },
                active: true
            };

            if (alert) {
                await updateAlert({
                    ...alertData,
                    id: alert.id,
                    active: alert.active
                });
            } else {
                await createAlert(alertData);
            }
            
            onClose();
        } catch (error) {
            console.error('Erro ao salvar alerta:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <StyledDialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            title={alert ? 'Editar Alerta' : 'Novo Alerta'}
            onSave={handleSubmit}
            disableSave={isSubmitting || !formData.symbol}
            loading={isSubmitting}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Símbolo"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleChange}
                        placeholder="Ex: PETR4"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Nome do Ativo"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Petrobras PN"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Preço de Compra"
                        name="buyPrice"
                        type="number"
                        value={formData.buyPrice}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Distância para Compra"
                        name="buyPercentage"
                        type="number"
                        value={formData.buyPercentage}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Preço de Venda"
                        name="sellPrice"
                        type="number"
                        value={formData.sellPrice}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Distância para Venda"
                        name="sellPercentage"
                        type="number"
                        value={formData.sellPercentage}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                    />
                </Grid>
            </Grid>
        </StyledDialog>
    );
};