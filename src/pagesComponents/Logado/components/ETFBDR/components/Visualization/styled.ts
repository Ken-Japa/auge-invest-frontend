import { Box, FormControl,Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const VisualizationContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: '200px',
  padding: theme.spacing(4),
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  color: theme.palette.error.main,
}));

export const EmptyResultsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  color: theme.palette.text.secondary,
}));

export const PaginationContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between',
  },
}));

export const PageSizeSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.text.primary,
    },
    color: theme.palette.text.primary,
  },
}));
