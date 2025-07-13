import { useState } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import GraficoHistoricoAlertas from '../GraficoHistoricoAlertas';
import { PriceDataPoint } from '../../../GraficoHistorico/services/historicalService';
import { AnalysisPeriod } from '../../utils/types';
import {
    AlertasSectionContainer,
    AlertasSectionTitle,
    AlertInputContainer,
    AlertTextField,
    BuyAlertButton,
    SellAlertButton,
    AlertHistoryContainer
} from './styled';

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


    const handleCreateBuyAlert = () => {
        // Implementar criação de alerta de compra
        const price = parseFloat(buyPrice || lowAlert.toFixed(2));
        console.log(`Criando alerta de compra para ${codigoAtivo} a R$ ${price}`);
        setActiveAlert({ type: 'compra', price });
        // Aqui futuramente será implementada a lógica para salvar o alerta no backend
    };

    const handleCreateSellAlert = () => {
        // Implementar criação de alerta de venda
        const price = parseFloat(sellPrice || highAlert.toFixed(2));
        console.log(`Criando alerta de venda para ${codigoAtivo} a R$ ${price}`);
        setActiveAlert({ type: 'venda', price });
        // Aqui futuramente será implementada a lógica para salvar o alerta no backend
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
        </AlertasSectionContainer>
    );
};