import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { type FC } from 'react';

import { HeaderContainer } from "./styled";

const DynamicMatrixRainText = dynamic(() => import("@/components/Effects/MatrixRainText").then(mod => mod.MatrixRainText), {
  ssr: false,
  loading: () => <span className="title">Carregando...</span>,
});

export const RegisterHeader: FC = () => {
  return (
    <HeaderContainer>
      <DynamicMatrixRainText
        text="Criar Conta"
        className="matrix-title"
      />
      <Typography variant="body1" className="header-subtitle">
        Junte-se à nossa comunidade e comece a explorar
      </Typography>
    </HeaderContainer>
  );
};

export default RegisterHeader;