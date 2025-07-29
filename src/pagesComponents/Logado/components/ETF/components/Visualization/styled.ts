import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

export const VisualizationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  padding: theme.spacing(4),
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.error.main,
  textAlign: "center",
}));

export const EmptyResultsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const PaginationContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
}));

export const PageSizeSelector = styled(Box)(({ theme }) => ({
  minWidth: 120,
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
  },
  "& .MuiSelect-select": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
