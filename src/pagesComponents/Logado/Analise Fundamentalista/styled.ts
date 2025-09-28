import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { transitions } from "@/theme/variables";

export const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  padding: theme.spacing(4, 0),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  backdropFilter: "blur(5px)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  transition: transitions.medium,
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.mode === "dark" 
      ? 'rgba(26, 34, 52, 0.7)' 
      : 'rgba(255, 255, 255, 0.7)'
  }
}));

export const PageTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));
