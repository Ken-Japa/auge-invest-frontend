import { Box, ToggleButton,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CodigosContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark' 
    ? "rgba(0, 0, 0, 0.2)" 
    : "rgba(0, 0, 0, 0.03)",
  borderRadius: theme.shape.borderRadius,
}));

export const CodigosTitulo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: "center",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

export const CodigoButton = styled(ToggleButton)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5, 0),
  justifyContent: "center",
  fontWeight: "normal",
  backgroundColor: theme.palette.mode === 'dark' 
    ? "rgba(255, 255, 255, 0.05)" 
    : theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
  "&:hover": {
    backgroundColor: (props: { selected?: boolean }) =>
      props.selected 
        ? theme.palette.primary.dark 
        : theme.palette.mode === 'dark' 
          ? "rgba(255, 255, 255, 0.1)" 
          : "rgba(0, 0, 0, 0.05)",
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));
