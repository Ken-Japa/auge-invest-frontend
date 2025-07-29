import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const ETFBDRTabsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
}));
