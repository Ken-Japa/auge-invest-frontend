import { useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, useTheme } from '@mui/material';


interface AlertasSectionProps {
    codigoAtivo: string;
    lowAlert: number;
    highAlert: number;
}

export const AlertasSection: React.FC<AlertasSectionProps> = ({ codigoAtivo, lowAlert, highAlert }) => {
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const theme = useTheme();
    const handleCreateBuyAlert = () => {
        // Implementar criação de alerta de compra
        console.log(`Criando alerta de compra para ${codigoAtivo} a R$ ${buyPrice}`);
    };

    const handleCreateSellAlert = () => {
        // Implementar criação de alerta de venda
        console.log(`Criando alerta de venda para ${codigoAtivo} a R$ ${sellPrice}`);
    };


    return (
        <Paper sx={{ p: 3, my: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
                Configurar Alertas para {codigoAtivo}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
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
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 2, color: 'white' }}
                        onClick={handleCreateBuyAlert}
                    >
                        Criar Alerta de Compra
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
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
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ mt: 2, color: 'white' }}
                        onClick={handleCreateSellAlert}

                    >
                        Criar Alerta de Venda
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};