import { Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChipsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  margin: theme.spacing(1, 0, 2, 0),
  justifyContent: "center",
}));

export const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' 
    ? "rgba(255, 255, 255, 0.08)" 
    : "rgba(0, 0, 0, 0.05)",
  borderColor: theme.palette.mode === 'dark' 
    ? "rgba(255, 255, 255, 0.2)" 
    : "rgba(0, 0, 0, 0.1)",
  color: theme.palette.mode === 'dark' 
    ? theme.palette.common.white 
    : theme.palette.text.primary,
  "& .MuiChip-label": {
    padding: theme.spacing(0, 1),
  },
}));

export const ValorMercadoChip = styled(InfoChip)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? "rgba(25, 118, 210, 0.15)" 
    : "rgba(25, 118, 210, 0.1)",
  borderColor: theme.palette.mode === 'dark' 
    ? "rgba(25, 118, 210, 0.5)" 
    : "rgba(25, 118, 210, 0.3)",
  padding: theme.spacing(1.5),
  "& .MuiChip-label": {
    fontWeight: "bold",
    padding: theme.spacing(0, 2),
    color: theme.palette.mode === 'dark' 
      ? theme.palette.common.white 
      : theme.palette.primary.dark,
  },
}));
