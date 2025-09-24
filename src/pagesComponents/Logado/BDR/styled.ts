import { styled } from "@mui/material/styles";
import { Box, Container, Paper, Typography } from "@mui/material";

export const ContentWrapper = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  textAlign: "center",
  alignItems: "center",
}));

export const BDRTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
}));

export const BDRSubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(3),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.secondary
      : theme.palette.text.secondary,
}));

export const BDRTabsContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(19, 47, 76, 0.85)"
      : "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  boxShadow: theme.shadows[3],
}));

export const TabPanelContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));
