import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const DetailPageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundImage: `url(${
    theme.palette.mode === "dark"
      ? "/assets/images/background/ETF-Dark.jpg"
      : "/assets/images/background/ETF-Light.jpg"
  })`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
  marginTop: -64,
  paddingTop: 64,
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(18, 24, 38, 0.85)"
      : "rgba(255, 255, 255, 0.85)",
  borderRadius: theme.shape.borderRadius,
  backdropFilter: "blur(8px)",
  boxShadow: theme.shadows[4],
  padding: theme.spacing(3),
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.standard,
  }),
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

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
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

export const NomeETF = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SubHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

export const BoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(1),
}));

export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: "2.2rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export const BoxBody = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  "& strong": {
    marginRight: theme.spacing(1),
  },
}));
