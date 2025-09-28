import { Grid } from '@mui/material';
import React from 'react';

import { CodigoButton,CodigosContainer, CodigosTitulo } from './styled';

interface Codigo {
  codigo: string;
}

interface CodigosDisponiveisProps {
  codigos: Codigo[];
  codigoAtivo: string;
  onCodigoChange: (codigo: string) => void;
}

export const CodigosDisponiveis: React.FC<CodigosDisponiveisProps> = ({
  codigos,
  codigoAtivo,
  onCodigoChange
}) => {
  return (
    <CodigosContainer>
      <CodigosTitulo variant="h4">
        Códigos Disponíveis
      </CodigosTitulo>

      <Grid container spacing={2} justifyContent="center">
        {codigos.map((codigo) => (
          <Grid item key={codigo.codigo} xs={6} sm={4} md={3} lg={2}>
            <CodigoButton
              value={codigo.codigo}
              selected={codigo.codigo === codigoAtivo}
              onChange={() => onCodigoChange(codigo.codigo)}
              aria-label={codigo.codigo}
            >
              {codigo.codigo}
            </CodigoButton>
          </Grid>
        ))}
      </Grid>
    </CodigosContainer>
  );
};