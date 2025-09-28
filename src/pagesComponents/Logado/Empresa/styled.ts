import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const EmpresasContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "url('/assets/images/background/Empresas-Dark.jpg')"
      : "url('/assets/images/background/Empresas-Light.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  position: "relative",
  marginTop: -64,
  paddingTop: 64,

  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.2)",
    pointerEvents: "none",
  },
}));

export const SearchBarWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
}));

export const ContentContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(8),
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: theme.breakpoints.values.lg,
  },
}));

export const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.02)",
}));
