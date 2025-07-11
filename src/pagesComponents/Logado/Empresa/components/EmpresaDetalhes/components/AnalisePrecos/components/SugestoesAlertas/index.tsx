import React from 'react';

// Serviços e tipos
import { calculateAlertSuggestions } from '../../services/analiseService';
import { PriceDataPoint } from "../../../GraficoHistorico/services/historicalService";

// Componentes
import { AlertasSection } from '../AlertasSection';

// Estilos
import {
  Container,
  AlertGrid,
  BuyAlertPaper,
  SellAlertPaper,
  BuyAlertTitle,
  SellAlertTitle,
  PriceContainer,
  BuyPriceValue,
  SellPriceValue,
  PriceInfo,
  AlertDivider,
  SecondaryPriceContainer
} from './styled';

interface SugestoesAlertasProps {
  mean: number;
  stdDev: number;
  data: PriceDataPoint[];
  codigoAtivo: string;
}

const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return date.toLocaleDateString('pt-BR');
};

const SugestoesAlertas: React.FC<SugestoesAlertasProps> = ({ mean, stdDev, data, codigoAtivo }) => {
  const alerts = calculateAlertSuggestions(mean, stdDev, data);

  return (
    <>
      <Container container spacing={2}>
        <AlertGrid item xs={12} md={6}>
          <BuyAlertPaper>
            <BuyAlertTitle variant="h3" gutterBottom>Sugestão de Alerta de Compra</BuyAlertTitle>

            <PriceContainer>
              <BuyPriceValue variant="h4">R$ {alerts.lowAlert90.price.toFixed(2)}</BuyPriceValue>
              <PriceInfo variant="body2">
                {alerts.lowAlert90.percentage.toFixed(1)}% dos preços históricos são maiores
              </PriceInfo>
              {alerts.lowAlert90.lastDate && (
                <PriceInfo variant="body2">
                  Último preço similar: {formatDate(alerts.lowAlert90.lastDate)}
                  {alerts.lowAlert90.daysSince && ` (${alerts.lowAlert90.daysSince} dias atrás)`}
                </PriceInfo>
              )}
            </PriceContainer>

            <AlertDivider />

            <SecondaryPriceContainer>
              <BuyPriceValue variant="h4">R$ {alerts.lowAlert80.price.toFixed(2)}</BuyPriceValue>
              <PriceInfo variant="body2">
                {alerts.lowAlert80.percentage.toFixed(1)}% dos preços históricos são maiores
              </PriceInfo>
              {alerts.lowAlert80.lastDate && (
                <PriceInfo variant="body2">
                  Último preço similar: {formatDate(alerts.lowAlert80.lastDate)}
                  {alerts.lowAlert80.daysSince && ` (${alerts.lowAlert80.daysSince} dias atrás)`}
                </PriceInfo>
              )}
            </SecondaryPriceContainer>
            <AlertDivider />
            <SecondaryPriceContainer>
              <BuyPriceValue variant="h4">R$ {alerts.lowAlert70.price.toFixed(2)}</BuyPriceValue>
              <PriceInfo variant="body2">
                {alerts.lowAlert70.percentage.toFixed(1)}% dos preços históricos são maiores
              </PriceInfo>
              {alerts.lowAlert70.lastDate && (
                <PriceInfo variant="body2">
                  Último preço similar: {formatDate(alerts.lowAlert70.lastDate)}
                  {alerts.lowAlert70.daysSince && ` (${alerts.lowAlert70.daysSince} dias atrás)`}
                </PriceInfo>
              )}
            </SecondaryPriceContainer>
          </BuyAlertPaper>
        </AlertGrid>

        <AlertGrid item xs={12} md={6}>
          <SellAlertPaper>
            <SellAlertTitle variant="h3" gutterBottom>Sugestão de Alerta de Venda</SellAlertTitle>

            <PriceContainer>
              <SellPriceValue variant="h4">R$ {alerts.highAlert90.price.toFixed(2)}</SellPriceValue>
              <PriceInfo variant="body2">
                {alerts.highAlert90.percentage.toFixed(1)}% dos preços históricos são menores
              </PriceInfo>
              {alerts.highAlert90.lastDate && (
                <PriceInfo variant="body2">
                  Último preço similar: {formatDate(alerts.highAlert90.lastDate)}
                  {alerts.highAlert90.daysSince && ` (${alerts.highAlert90.daysSince} dias atrás)`}
                </PriceInfo>
              )}
            </PriceContainer>

            <AlertDivider />

            <SecondaryPriceContainer>
              <SellPriceValue variant="h4">R$ {alerts.highAlert80.price.toFixed(2)}</SellPriceValue>
              <PriceInfo variant="body2">
                {alerts.highAlert80.percentage.toFixed(1)}% dos preços históricos são menores
              </PriceInfo>
              {alerts.highAlert80.lastDate && (
                <PriceInfo variant="body2">
                  Último preço similar: {formatDate(alerts.highAlert80.lastDate)}
                  {alerts.highAlert80.daysSince && ` (${alerts.highAlert80.daysSince} dias atrás)`}
                </PriceInfo>
              )}
            </SecondaryPriceContainer>

            <AlertDivider />

            <SecondaryPriceContainer>
              <SellPriceValue variant="h4">R$ {alerts.highAlert70.price.toFixed(2)}</SellPriceValue>
              <PriceInfo variant="body2">
                {alerts.highAlert70.percentage.toFixed(1)}% dos preços históricos são menores
              </PriceInfo>
              {alerts.highAlert70.lastDate && (
                <PriceInfo variant="body2">
                  Último preço similar: {formatDate(alerts.highAlert70.lastDate)}
                  {alerts.highAlert70.daysSince && ` (${alerts.highAlert70.daysSince} dias atrás)`}
                </PriceInfo>
              )}
            </SecondaryPriceContainer>


          </SellAlertPaper>
        </AlertGrid>
      </Container>
      <AlertasSection
        codigoAtivo={codigoAtivo || ''}
        lowAlert={alerts.lowAlert90.price}
        highAlert={alerts.highAlert90.price}
      />
    </>
  );
};

export default SugestoesAlertas;