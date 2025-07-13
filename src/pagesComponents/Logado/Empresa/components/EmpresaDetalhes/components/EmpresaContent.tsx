import React from 'react';
import { Box } from '@mui/material';
import { EmpresaDetalhada } from '../../../types';
import { PriceDataPoint } from '../utils/metricasCalculations';
import { PriceDataPoint as GraficoPriceDataPoint } from '../components/GraficoHistorico/services/historicalService';
import { EmpresaHeader } from './EmpresaHeader';
import { MetricasEmpresa } from './MetricasEmpresa';
import { GraficoHistorico } from './GraficoHistorico';
import { DividendosTab } from './DividendosTab';
import { DerivativosTab } from './DerivativosTab';
import { AnalisePrecos } from './AnalisePrecos';
import { TabPanel } from './TabPanel';
import { StyledTabs, StyledTab, TabContent } from '../styled';

interface Metricas {
    minimo52: number;
    maximo52: number;
    dividendYield: number;
    valorizacao12m: number;
}

interface EmpresaContentProps {
    empresa: EmpresaDetalhada;
    codigoAtivo: string;
    historicalData: PriceDataPoint[];
    graficoData?: GraficoPriceDataPoint[];
    metricas: Metricas;
    currentTab: string;
    handleTabChange: (event: React.SyntheticEvent, newValue: any) => void;
    handleCodigoChange: (codigo: string) => void;
    hasDerivatives: boolean;
}

export const EmpresaContent: React.FC<EmpresaContentProps> = ({
    empresa,
    codigoAtivo,
    historicalData,
    graficoData = [],
    metricas,
    currentTab,
    handleTabChange,
    handleCodigoChange,
    hasDerivatives,
}) => {
    return (
        <>
            <EmpresaHeader
                empresa={empresa}
                codigoAtivo={codigoAtivo}
                onCodigoChange={handleCodigoChange}
            />

            <StyledTabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label="Abas da empresa"
            >
                <StyledTab label="Principal" value="principal" />
                <StyledTab label="Dividendos" value="dividendos" />
                {hasDerivatives && <StyledTab label="Derivativos" value="derivativos" />}
                <StyledTab label="Análise de Preços" value="analiseprecos" />
            </StyledTabs>

            <TabContent>
                <TabPanel value={currentTab} index="principal">
                    <Box sx={{ mb: 4 }}>
                        <MetricasEmpresa
                            valor={historicalData.length > 0 ? historicalData[historicalData.length - 1].valor : 0}
                            variacao={historicalData.length > 1 ?
                                Number((((historicalData[historicalData.length - 1].valor - historicalData[historicalData.length - 2].valor) /
                                    historicalData[historicalData.length - 2].valor) * 100).toFixed(2)) : 0}
                            minimo52={metricas.minimo52}
                            maximo52={metricas.maximo52}
                            dividendYield={metricas.dividendYield}
                            valorizacao12m={metricas.valorizacao12m}
                        />
                    </Box>

                    <GraficoHistorico
                        codigoAtivo={codigoAtivo}
                    />
                </TabPanel>

                <TabPanel value={currentTab} index="dividendos">
                    <DividendosTab dividendos={empresa.dividendos || []} />
                </TabPanel>

                <TabPanel value={currentTab} index="derivativos">
                    <DerivativosTab codigoBase={codigoAtivo} />
                </TabPanel>

                <TabPanel value={currentTab} index="analiseprecos">
                    <AnalisePrecos codigoAtivo={codigoAtivo} />
                </TabPanel>
            </TabContent>
        </>
    );
};