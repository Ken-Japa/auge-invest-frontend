import { styled } from "@mui/material/styles";
import { Box, Typography, Card, Container } from "@mui/material";
import { PageTransition } from "@/components/Utils/PageTransition";

export const BackgroundImageStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isloaded'
})<{ $isloaded: boolean }>(
  ({ $isloaded }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "filter 0.7s ease-in-out",
    filter: $isloaded ? "blur(0) grayscale(0)" : "blur(20px) grayscale(100%)",
    "& > div": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  })
);

export const PageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  // backgroundImage:
  //   theme.palette.mode === "dark"
  //     ? 'url("/assets/images/background/Desenvolvimento-Dark.jpg")'
  //     : 'url("/assets/images/background/Desenvolvimento-Light.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(18, 24, 38, 0.4)"
        : "rgba(255, 255, 255, 0.7)",
  },
}));

export const Page = styled(Container)(({ theme }) => ({
  maxWidth: "lg",
  zIndex: 1,
  position: "relative",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(24, 33, 57, 1)"
      : "rgba(255, 255, 255, 0.85)",
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  color: theme.palette.primary.main,
  textAlign: "center",
}));

export const ToolCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}));

export const ToolIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  minHeight: 100,
  "& svg": {
    fontSize: "4rem",
  },
}));

export const StyledPageTransition = styled(PageTransition)({
  width: "100%",
});
