import { useState, useEffect } from 'react';
import {
    TextField,
    Grid,
    InputAdornment,
    Switch,
    FormControlLabel,
    Checkbox,
    FormGroup,
    FormLabel,
    RadioGroup,
    Radio
} from '@mui/material';

import { useSession } from "next-auth/react";

import { Alert } from '@/services/api/types';
import { useAlerts } from '../../hooks/useAlerts';
import { StyledDialog } from '@/components/Feedback/Dialog/StyledDialog';

interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    alert: Alert | null;
}

export const AlertDialog = ({ open, onClose, alert }: AlertDialogProps) => {
    const { createAlert, updateAlert } = useAlerts();
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [formData, setFormData] = useState({
        asset: '',
        type: 'buy',
        targetPrice: 0,
        currentPrice: 0,
        percentageDistance: 0,
        notificationMethods: [] as string[],
        expiresAt: '',
        recurring: false,
        comments: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (alert) {
            setFormData({
                asset: alert.asset,
                type: alert.type,
                targetPrice: alert.targetPrice,
                currentPrice: alert.currentPrice || 0,
                percentageDistance: alert.percentageDistance || 0,
                notificationMethods: alert.notificationMethods || [],
                expiresAt: alert.expiresAt ? new Date(alert.expiresAt).toISOString().split('T')[0] : '',
                recurring: alert.recurring || false,
                comments: alert.comments || '',
            });
        } else {
            setFormData({
                asset: '',
                type: 'buy',
                targetPrice: 0,
                currentPrice: 0,
                percentageDistance: 0,
                notificationMethods: [],
                expiresAt: '',
                recurring: false,
                comments: '',
            });
        }
    }, [alert, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const type = (e.target as HTMLInputElement).type;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prevData) => ({
            ...prevData,
            [name]:
                type === "checkbox"
                    ? checked
                    : name.includes("Price") || name.includes("Distance")
                        ? parseFloat(value) || 0
                        : value,
        }));
    };

    const handleNotificationMethodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const newMethods = checked
                ? [...prevData.notificationMethods, value]
                : prevData.notificationMethods.filter((method) => method !== value);
            return {
                ...prevData,
                notificationMethods: newMethods,
            };
        });
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            if (!userId) {
                console.error('User not authenticated.');
                return;
            }

            const alertData = {
                asset: formData.asset,
                type: formData.type as "buy" | "sell",
                targetPrice: formData.targetPrice,
                currentPrice: formData.currentPrice,
                percentageDistance: formData.percentageDistance,
                notificationMethods: formData.notificationMethods,
                expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined,
                comments: formData.comments,
                triggered: false, // Default to false as per requirements
                userId: userId,
            };

            if (alert) {
                await updateAlert(alert.id, alertData);
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
            disableSave={isSubmitting || !formData.asset || !formData.targetPrice || formData.notificationMethods.length === 0}
            loading={isSubmitting}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ativo"
                        name="asset"
                        value={formData.asset}
                        onChange={handleChange}
                        placeholder="Ex: PETR4"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel component="legend">Tipo de Alerta</FormLabel>
                    <RadioGroup
                        row
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="buy" control={<Radio />} label="Compra" />
                        <FormControlLabel value="sell" control={<Radio />} label="Venda" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Preço Alvo"
                        name="targetPrice"
                        type="number"
                        value={formData.targetPrice}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Preço Atual"
                        name="currentPrice"
                        type="number"
                        value={formData.currentPrice}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Distância Percentual"
                        name="percentageDistance"
                        type="number"
                        value={formData.percentageDistance}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel component="legend">Métodos de Notificação</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.notificationMethods.includes('email')}
                                    onChange={handleNotificationMethodsChange}
                                    value="email"
                                />
                            }
                            label="Email"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.notificationMethods.includes('app_notification')}
                                    onChange={handleNotificationMethodsChange}
                                    value="app_notification"
                                />
                            }
                            label="Notificação no App"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.notificationMethods.includes('sms')}
                                    onChange={handleNotificationMethodsChange}
                                    value="sms"
                                />
                            }
                            label="SMS"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.notificationMethods.includes('whatsapp')}
                                    onChange={handleNotificationMethodsChange}
                                    value="whatsapp"
                                />
                            }
                            label="WhatsApp"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Expira em (opcional)"
                        name="expiresAt"
                        type="date"
                        value={formData.expiresAt}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.recurring}
                                onChange={handleChange}
                                name="recurring"
                            />
                        }
                        label="Recorrente"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Comentários (opcional)"
                        name="comments"
                        multiline
                        rows={4}
                        value={formData.comments}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </StyledDialog>
    );
};