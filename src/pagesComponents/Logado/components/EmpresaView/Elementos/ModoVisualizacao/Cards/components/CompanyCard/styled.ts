import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { transitions } from "@/theme/variables";

export const HeaderContainer = styled(Box)({
  position: "relative",
  width: "100%",
  marginBottom: "16px",
});

export const InfoIconContainer = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
});

export const CompanyTitle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  transition: transitions.medium,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: theme.palette.mode === "dark" 
    ? "#ffffff" 
    : theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "1.1rem",
  lineHeight: 1.3,
  marginBottom: theme.spacing(1),
  paddingRight: theme.spacing(4), // Espaço para o ícone
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const SegmentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" 
    ? "rgba(255, 255, 255, 0.9)" 
    : theme.palette.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.85rem",
  marginTop: theme.spacing(0.5),
  display: "block", // Garante que fique em uma linha separada
}));

export const IndustryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" 
    ? "rgba(255, 255, 255, 0.9)" 
    : theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.9rem",
  display: "block", // Garante que fique em uma linha separada
  marginBottom: theme.spacing(0.5),
}));

export const MarketValueText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0.5),
  fontWeight: 600,
  fontSize: "1.25rem",
  color: theme.palette.mode === "dark" 
    ? "#ffffff" 
    : theme.palette.text.primary,
}));

export const ParticipationText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" 
    ? "rgba(255, 255, 255, 0.9)" 
    : theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  fontSize: "0.85rem",
}));

export const CodesTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  fontSize: "0.95rem",
  color: theme.palette.mode === "dark" 
    ? "#ffffff" 
    : theme.palette.text.primary,
}));
