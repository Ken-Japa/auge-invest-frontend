import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(18, 24, 38)" : "rgba(255, 255, 255)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  padding: theme.spacing(3),
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.standard,
  }),
  zIndex: 2,
  position: "relative",
}));

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
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
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
