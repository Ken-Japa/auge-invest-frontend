import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const DetailPageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "900px",
  margin: "0 auto",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
  padding: theme.spacing(4),
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "200px",
  padding: theme.spacing(4),
  textAlign: "center",
}));

export const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
