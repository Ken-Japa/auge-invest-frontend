import React from 'react';
import { useTheme, Box } from '@mui/material';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { StatisticalData } from '../../services/analiseService';
import { generateStdDevLines } from '../../services/analiseService';


interface GraficoAnalisePrecoProps {
  stats: StatisticalData;
}

const GraficoAnalisePreco: React.FC<GraficoAnalisePrecoProps> = ({ stats }) => {
  const theme = useTheme();
  const { mean, stdDev, histogramData } = stats;

  const stdDevLines = generateStdDevLines(mean, stdDev);

  return (
    <Box sx={{ height: 400, width: '100%', position: 'relative' }}>

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
            stroke="#1E88E5"
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
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #ccc', padding: '10px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />


          <Bar
            dataKey="frequency"
            name="Frequência"
            fill={theme.palette.primary.main}
            yAxisId="left"
            opacity={0.7}
          />


          <Line
            type="monotone"
            dataKey="normalValue"
            name="Curva Normal"
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
            dot={false}
            yAxisId="right"
          />

          {stdDevLines.map((line, index) => (
            <ReferenceLine
              key={index}
              x={line.value}
              stroke={line.label === 'Média' ? theme.palette.error.main : theme.palette.info.main}
              strokeDasharray={line.label === 'Média' ? '3 0' : '3 3'}
              label={{
                value: `${line.label} (${line.value.toFixed(2)})`,
                position: 'top',
                fill: line.label === 'Média' ? theme.palette.error.main : theme.palette.info.main,
                fontSize: 12
              }}
              yAxisId="left"
            />
          ))}

        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GraficoAnalisePreco;