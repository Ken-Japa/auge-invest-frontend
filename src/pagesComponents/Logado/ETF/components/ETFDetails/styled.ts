import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const DetailPageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  padding: theme.spacing(4, 2),
  marginTop: "-64px",

  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      theme.palette.mode === "dark"
        ? 'url("/assets/images/background/ETF-Dark.jpg")'
        : 'url("/assets/images/background/ETF-Light.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    opacity: 0.15,
    zIndex: -1,
  },
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
