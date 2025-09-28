import React from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ReferenceLine,ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { generateStdDevLines } from '../../services/analiseService';
import { useChartStyles } from '../../utils/chartConfig';
import { StatisticalData, StdDevLine } from '../../utils/types';
import { ChartContainer, ChartDescription,ChartTitle } from './styled';


interface GraficoAnalisePrecoProps {
  stats: StatisticalData;
}

const GraficoAnalisePreco: React.FC<GraficoAnalisePrecoProps> = ({ stats }) => {
  const chartStyles = useChartStyles();
  const { mean, stdDev, histogramData } = stats;

  const stdDevLines = generateStdDevLines(mean, stdDev);

  return (
    <>
      <ChartTitle variant="h5" sx={{ textAlign: 'center' }}>Distribuição de Preços</ChartTitle>
      <ChartDescription variant="body2">
        Este gráfico mostra a distribuição de frequência dos preços históricos e a curva normal correspondente.
        As linhas verticais indicam a média e os desvios padrão.
      </ChartDescription>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={histogramData}
            margin={{ top: 20, right: 40, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="price"
              label={{ value: 'Preço (R$)', position: 'insideBottom', offset: -8 }}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <YAxis
              yAxisId="left"
              stroke={chartStyles.colors.primary}
              tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}

            />

            <Tooltip
              formatter={(value: any, name: string) => {
                if (name === 'Frequência') {
                  const percentage = (value as number * 100).toFixed(2);
                  return [`${percentage}%`, name];
                }
                return [`${(value * 100).toFixed(2)}%`, name];
              }}
              labelFormatter={(label) => {
                // Converter o label para número
                const price = parseFloat(label as string);
                // Acessar min e max diretamente do stats
                const { min, max } = stats;
                const binSize = (max - min) / 20;

                // Calcular o início e fim do bin
                const binStart = min + Math.floor((price - min) / binSize) * binSize;
                const binEnd = binStart + binSize;

                return `Intervalo de Preço: R$ ${binStart.toFixed(2)} - R$ ${binEnd.toFixed(2)}`;
              }}
              wrapperStyle={{ zIndex: 1000 }}
              contentStyle={{
                backgroundColor: chartStyles.tooltip.background,
                border: chartStyles.tooltip.border,
                padding: '10px',
                borderRadius: chartStyles.tooltip.borderRadius,
                boxShadow: chartStyles.tooltip.boxShadow,
                color: '#000000'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />


            <Bar
              dataKey="frequency"
              name="Frequência"
              fill={chartStyles.colors.primary}
              yAxisId="left"
              opacity={0.7}
            />


            <Line
              type="monotone"
              dataKey="normalValue"
              name="Curva Normal"
              stroke={chartStyles.colors.secondary}
              strokeWidth={2}
              dot={false}
              yAxisId="right"
            />

            {stdDevLines.map((line: StdDevLine, index: number) => (
              <ReferenceLine
                key={index}
                x={line.value}
                stroke={line.label === 'Média' ? chartStyles.colors.error : chartStyles.colors.info}
                strokeDasharray={line.label === 'Média' ? chartStyles.markers.solidLine : chartStyles.markers.dashArray}
                label={{
                  value: `${line.label} (${line.value.toFixed(2)})`,
                  position: 'top',
                  fill: line.label === 'Média' ? chartStyles.colors.error : chartStyles.colors.info,
                  fontSize: 12
                }}
                yAxisId="left"
              />
            ))}

          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default GraficoAnalisePreco;