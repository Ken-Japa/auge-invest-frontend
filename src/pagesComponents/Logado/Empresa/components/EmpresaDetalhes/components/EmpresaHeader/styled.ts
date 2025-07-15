import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.paper
      : theme.palette.background.default,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const EmpresaInfo = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",
  maxWidth: "100%",
}));

export const EmpresaTitulo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.h5.fontSize,
  },
}));

export const EmpresaSubtitulo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const SiteLink = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(3),
  "& a": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    color: theme.palette.primary.main,
    textDecoration: "none",
    transition: theme.transitions.create("color", {
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.primary.dark,
    },
  },
}));

export const EmpresaDescricao = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));
