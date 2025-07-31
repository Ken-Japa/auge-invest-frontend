import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

interface AddAssetDialogProps {
    open: boolean;
    onClose: () => void;
    positionId: string | null;
}

const assetTypes = [
    { value: 'stocks', label: 'Ações' },
    { value: 'derivatives', label: 'Derivativos' },
    { value: 'indices', label: 'Índices' },
    { value: 'bdrs', label: 'BDRs' },
    { value: 'fiis', label: 'Fundos Imobiliários' },
];

export const AddAssetDialog = ({ open, onClose, positionId }: AddAssetDialogProps) => {
    const [assetType, setAssetType] = useState('');
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs());

    const handleSubmit = () => {
        // Add asset logic will be implemented
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Adicionar Ativo</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
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
                            label="Data da Compra"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    );
};