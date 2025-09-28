import {
Checkbox, FormControlLabel,
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { formatCurrency } from '../utils/currency';
import { sumarioService } from '../utils/sumarioService';
import { FlatTableView } from './components/FlatTableView';
import { IndustriaRow } from './components/IndustriaRow';
import { SegmentoSection } from './components/SegmentoSection';
import { useSortableData } from './hooks/useSortableData';
import {
    CheckboxesContainer,
    LoadingContainer,
    StyledCircularProgress,
    TableContainer,
    TableControlsContainer,
    TableTitle
} from './styled';
import { SumarioData } from './types';

interface TabelaViewProps {
    onLoadingChange?: (loading: boolean) => void;
}

export const TabelaView: React.FC<TabelaViewProps> = ({ onLoadingChange }) => {
    const [data, setData] = useState<SumarioData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hideIndustrias, setHideIndustrias] = useState(false);
    const [hideSegmentos, setHideSegmentos] = useState(false);
    const { orderBy, order, handleSort } = useSortableData('valorMercado');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                onLoadingChange?.(true);
                const response = await sumarioService.getSumarioData();
                setData(response);
            } catch (error) {
                setError('Falha ao carregar os dados');
                console.error('Erro ao carregar dados:', error);
            } finally {
                setIsLoading(false);
                onLoadingChange?.(false);
            }
        };

        fetchData();
    }, [onLoadingChange]);

    if (isLoading) {
        return (
            <LoadingContainer>
                <StyledCircularProgress />
            </LoadingContainer>
        );
    }

    if (error) return <Typography color="error">{error}</Typography>;
    if (!data) return null;

    const sortedIndustrias = [...data.sumario].sort(
        (a, b) => b.valorMercadoTotal - a.valorMercadoTotal
    );

    return (
        <TableContainer>
            <TableControlsContainer>
                <CheckboxesContainer>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hideIndustrias}
                                onChange={(e) => setHideIndustrias(e.target.checked)}
                            />
                        }
                        label="Ocultar Indústrias"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hideSegmentos}
                                onChange={(e) => setHideSegmentos(e.target.checked)}
                            />
                        }
                        label="Ocultar Segmentos"
                    />
                </CheckboxesContainer>
                <TableTitle>
                    <Typography variant="h4">
                        Mercado Brasileiro {data && formatCurrency(data.sumarioTotal.valorMercadoTotalGeral)}
                    </Typography>
                </TableTitle>
            </TableControlsContainer>

            {hideIndustrias && hideSegmentos ? (
                <FlatTableView
                    data={data}
                    orderBy={orderBy}
                    order={order}
                    handleSort={handleSort}
                />
            ) : hideIndustrias ? (
                <Table sx={{ width: '100%', tableLayout: 'fixed' }} className="StyledTable">

                    <TableHead>
                        <TableRow>
                            <TableCell width={50} />
                            <TableCell>Segmento</TableCell>
                            <TableCell align="right">Valor de Mercado</TableCell>
                            <TableCell align="right">Número de Empresas</TableCell>
                            <TableCell align="right">Participação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.sumario
                            .flatMap(industria =>
                                industria.segmentos.map(segmento => ({
                                    ...segmento,
                                    industria: industria.industria
                                }))
                            )
                            .sort((a, b) => b.valorMercado - a.valorMercado)
                            .map((segmento, index) => (
                                <SegmentoSection
                                    key={index}
                                    segmento={segmento}
                                    valorMercadoIndustria={data.sumarioTotal.valorMercadoTotalGeral}
                                    valorMercadoTotal={data.sumarioTotal.valorMercadoTotalGeral}
                                />
                            ))}
                    </TableBody>
                </Table>

            ) : (
                <Table sx={{ width: '100%', tableLayout: 'fixed' }} className="StyledTable">

                    <TableHead>
                        <TableRow>
                            <TableCell width={50} />
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Valor de Mercado</TableCell>
                            <TableCell align="right">Número de Empresas</TableCell>
                            <TableCell align="right">%</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedIndustrias.map((industria, index) => (
                            <IndustriaRow
                                key={index}
                                industria={industria.industria}
                                valorMercadoTotal={industria.valorMercadoTotal}
                                valorMercadoGeral={data.sumarioTotal.valorMercadoTotalGeral}
                                segmentos={industria.segmentos}
                                hideSegmentos={hideSegmentos}
                            />
                        ))}
                    </TableBody>
                </Table>

            )}
        </TableContainer>
    );
};