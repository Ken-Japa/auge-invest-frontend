import { styled } from "@mui/material/styles";
import { Box, Stack, FormControl, Paper } from "@mui/material";

export const VisualizationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
}));

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const ErrorContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const EmptyResultsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const PaginationContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

export const PageSizeSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
  },
}));

export const FilterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .visualization-controls": {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    flexWrap: "wrap",
  },
}));
