import { useState } from 'react';
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { AddAssetDialog } from './components/AddAssetDialog';
import { RenamePositionDialog } from './components/RenamePositionDialog';
import { PositionsContainer, PositionHeader, TableFooter } from './styled';

// Mock data - will be replaced with API data
const mockPositions = {
    real: [
        {
            id: 1,
            name: 'Carteira Principal',
            assets: [
                { id: 1, symbol: 'PETR4', buyDate: '2024-01-10', buyPrice: 34.25, currentPrice: 35.80, quantity: 100 },
                { id: 2, symbol: 'VALE3', buyDate: '2024-01-11', buyPrice: 72.80, currentPrice: 71.45, quantity: 50 },
            ]
        }
    ],
    mock: [
        {
            id: 1,
            name: 'Carteira Teste',
            assets: [
                { id: 1, symbol: 'BBAS3', buyDate: '2024-01-12', buyPrice: 45.30, currentPrice: 46.75, quantity: 150 },
                { id: 2, symbol: 'WEGE3', buyDate: '2024-01-13', buyPrice: 36.75, currentPrice: 37.20, quantity: 80 },
            ]
        }
    ]
};

interface PositionsListProps {
    type: 'real' | 'mock';
}

export const PositionsList = ({ type }: PositionsListProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

    const positions = mockPositions[type];

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const calculateTotals = (assets: typeof positions[0]['assets']) => {
        return assets.reduce((acc, asset) => {
            const investedValue = asset.buyPrice * asset.quantity;
            const currentValue = asset.currentPrice * asset.quantity;
            const difference = currentValue - investedValue;
            const performance = (difference / investedValue) * 100;

            return {
                invested: acc.invested + investedValue,
                current: acc.current + currentValue,
                difference: acc.difference + difference,
                performance: acc.performance + (performance * (investedValue / acc.invested)) || 0
            };
        }, { invested: 0, current: 0, difference: 0, performance: 0 });
    };

    return (
        <PositionsContainer>
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {/* Add new position logic */ }}
                >
                    Nova Carteira
                </Button>
            </Box>

            {positions.map((position) => (
                <Accordion
                    key={position.id}
                    expanded={expanded === `panel${position.id}`}
                    onChange={handleAccordionChange(`panel${position.id}`)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center' } }}
                    >
                        <Typography variant="h4" sx={{ flex: 1 }}>{position.name}</Typography>
                        <Box
                            onClick={(e) => e.stopPropagation()}
                            sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
                        >
                            <EditIcon
                                fontSize="small"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': { color: 'primary.main' }
                                }}
                                onClick={() => {
                                    setSelectedPosition(position.id);
                                    setIsRenameOpen(true);
                                }}
                            />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    setSelectedPosition(position.id);
                                    setIsAddAssetOpen(true);
                                }}
                            >
                                Adicionar Ativo
                            </Button>
                        </Box>

                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ativo</TableCell>
                                        <TableCell align="right">Data Compra</TableCell>
                                        <TableCell align="right">Preço Compra</TableCell>
                                        <TableCell align="right">Quantidade</TableCell>
                                        <TableCell align="right">Preço Atual</TableCell>
                                        <TableCell align="right">Total Investido</TableCell>
                                        <TableCell align="right">Valor Atual</TableCell>
                                        <TableCell align="right">Diferença</TableCell>
                                        <TableCell align="right">Rentabilidade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {position.assets.map((asset) => {
                                        const investedValue = asset.buyPrice * asset.quantity;
                                        const currentValue = asset.currentPrice * asset.quantity;
                                        const difference = currentValue - investedValue;
                                        const performance = (difference / investedValue) * 100;

                                        return (
                                            <TableRow key={asset.id}>
                                                <TableCell>{asset.symbol}</TableCell>
                                                <TableCell align="right">{asset.buyDate}</TableCell>
                                                <TableCell align="right">
                                                    {asset.buyPrice.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </TableCell>
                                                <TableCell align="right">{asset.quantity}</TableCell>
                                                <TableCell align="right">
                                                    {asset.currentPrice.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {investedValue.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {currentValue.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    sx={{ color: difference >= 0 ? 'success.main' : 'error.main' }}
                                                >
                                                    {difference.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    sx={{ color: performance >= 0 ? 'success.main' : 'error.main' }}
                                                >
                                                    {performance.toFixed(2)}%
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableFooter>
                                    {position.assets.length > 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5}>Total</TableCell>
                                            {(() => {
                                                const totals = calculateTotals(position.assets);
                                                return (
                                                    <>
                                                        <TableCell align="right">
                                                            {totals.invested.toLocaleString('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL'
                                                            })}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {totals.current.toLocaleString('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL'
                                                            })}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{ color: totals.difference >= 0 ? 'success.main' : 'error.main' }}
                                                        >
                                                            {totals.difference.toLocaleString('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL'
                                                            })}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{ color: totals.performance >= 0 ? 'success.main' : 'error.main' }}
                                                        >
                                                            {totals.performance.toFixed(2)}%
                                                        </TableCell>
                                                    </>
                                                );
                                            })()}
                                        </TableRow>
                                    )}
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))}

            <AddAssetDialog
                open={isAddAssetOpen}
                onClose={() => setIsAddAssetOpen(false)}
                positionId={selectedPosition}
            />

            <RenamePositionDialog
                open={isRenameOpen}
                onClose={() => setIsRenameOpen(false)}
                positionId={selectedPosition}
            />
        </PositionsContainer>
    );
};