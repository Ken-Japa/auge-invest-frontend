import { styled } from '@mui/material/styles';
import { Box, List, ListItem } from '@mui/material';
import { spacing, borderRadius } from "@/theme/variables";

export const ActivityContainer = styled(Box)(({ theme }) => ({
  maxHeight: "300px",
  overflowY: "auto",
  padding: spacing.sm,
  
  // Estilização da barra de rolagem
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.05)" 
      : "rgba(0, 0, 0, 0.05)",
    borderRadius: borderRadius.sm,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.2)" 
      : "rgba(0, 0, 0, 0.2)",
    borderRadius: borderRadius.sm,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.3)" 
      : "rgba(0, 0, 0, 0.3)",
  },
}));

export const ActivityList = styled(List)(({ theme }) => ({
  padding: 0,
}));

export const ActivityItem = styled(ListItem)(({ theme }) => ({
  padding: spacing.sm,
  borderRadius: borderRadius.sm,
  marginBottom: spacing.xs,
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.05)" 
      : "rgba(0, 0, 0, 0.02)",
  },
}));