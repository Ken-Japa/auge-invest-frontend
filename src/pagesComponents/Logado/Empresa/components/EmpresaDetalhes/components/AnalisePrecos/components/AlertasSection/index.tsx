import { Grid, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

import { AlertDialog } from '@/pagesComponents/Logado/Alertas/components/AlertDialog';
import { Alert } from '@/services/api/types';

import { PriceDataPoint } from '../../../GraficoHistorico/services/historicalService';
import { AnalysisPeriod } from '../../utils/types';
import GraficoHistoricoAlertas from '../GraficoHistoricoAlertas';
import {
    AlertasSectionContainer,
    AlertasSectionTitle,
    AlertHistoryContainer,
    AlertInputContainer,
    AlertTextField,
    BuyAlertButton,
    SellAlertButton} from './styled';

interface AlertasSectionProps {
    codigoAtivo: string;
    lowAlert: number;
    highAlert: number;
    data: PriceDataPoint[];
    selectedPeriod?: AnalysisPeriod;
    onPeriodChange?: (period: AnalysisPeriod | SelectChangeEvent) => void;
}

export const AlertasSection: React.FC<AlertasSectionProps> = ({ codigoAtivo, lowAlert, highAlert, data, selectedPeriod = '5y', onPeriodChange }) => {
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [activeAlert, setActiveAlert] = useState<{ type: 'compra' | 'venda', price: number } | null>(null);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [alertToEdit, setAlertToEdit] = useState<Alert | null>(null);


    const handleCreateBuyAlert = () => {
        const price = parseFloat(buyPrice || lowAlert.toFixed(2));
        setAlertToEdit({
            _id: '',
            asset: codigoAtivo,
            type: 'buy',
            targetPrice: price,
            currentPrice: 0,
            percentageDistance: 0,
            notificationMethods: ['app_notification'],
            expiresAt: undefined,
            recurring: false,
            comments: '',
            triggered: false,
            userId: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        setShowAlertDialog(true);
    };

    const handleCreateSellAlert = () => {
        const price = parseFloat(sellPrice || highAlert.toFixed(2));
        setAlertToEdit({
            _id: '',
            asset: codigoAtivo,
            type: 'sell',
            targetPrice: price,
            currentPrice: 0,
            percentageDistance: 0,
            notificationMethods: [],
            expiresAt: undefined,
            recurring: false,
            comments: '',
            triggered: false,
            userId: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        setShowAlertDialog(true);
    };

    const handleCloseAlertDialog = () => {
        setShowAlertDialog(false);
        setAlertToEdit(null);
    };


    return (
        <AlertasSectionContainer>
            <AlertasSectionTitle variant="h3" gutterBottom align="center">
                Configurar Alertas para {codigoAtivo}
            </AlertasSectionTitle>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AlertTextField
                        fullWidth
                        label="Alerta de Compra"
                        type="number"
                        value={buyPrice || lowAlert.toFixed(2)}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        InputProps={{
                            startAdornment: `R$ `
                        }}
                        helperText="Notificar quando o preço estiver neste valor"
                    />
                    <BuyAlertButton
                        variant="contained"
                        fullWidth
                        onClick={handleCreateBuyAlert}
                    >
                        Criar Alerta de Compra
                    </BuyAlertButton>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AlertTextField
                        fullWidth
                        label="Alerta de Venda"
                        type="number"
                        value={sellPrice || highAlert.toFixed(2)}
                        onChange={(e) => setSellPrice(e.target.value)}
                        InputProps={{
                            startAdornment: `R$ `
                        }}
                        helperText="Notificar quando o preço estiver neste valor"
                    />
                    <SellAlertButton
                        variant="contained"
                        fullWidth
                        onClick={handleCreateSellAlert}
                    >
                        Criar Alerta de Venda
                    </SellAlertButton>
                </Grid>
            </Grid>

            {activeAlert && (
                <AlertHistoryContainer>
                    <GraficoHistoricoAlertas
                        data={data}
                        alertaCompra={activeAlert.type === 'compra' ? activeAlert.price : null}
                        alertaVenda={activeAlert.type === 'venda' ? activeAlert.price : null}
                    />
                </AlertHistoryContainer>
            )}

            <AlertDialog
                open={showAlertDialog}
                onClose={handleCloseAlertDialog}
                alert={alertToEdit}
            />
        </AlertasSectionContainer>
    );
};