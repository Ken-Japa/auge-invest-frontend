import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const AtivosPageContainer = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 200px)",
  padding: "2rem 0 4rem",
  background: theme.palette.background.default,
  "& .text-gradient": {
    background: "linear-gradient(90deg, #0d95f9 0%, #8411cc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    marginBottom: "1rem",
    fontWeight: 700,
    textAlign: "center",
  },
  "& .subtitle": {
    color: theme.palette.text.secondary,
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  "& .grid-container": {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

export const AtivosHeader = styled(Box)({
  marginBottom: "2rem",
  textAlign: "center",
  paddingTop: "1rem",
});

export const AtivosGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
  "@media (min-width: 600px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 960px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
});

export const AtivoCard = styled(motion.div)<{ available: string }>(
  ({ theme, available }) => ({
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(145deg, rgba(26, 34, 52, 0.8), rgba(26, 34, 52, 0.6))"
        : "linear-gradient(145deg, #ffffff, #f5f8fa)",
    borderRadius: "16px",
    overflow: "hidden",
    height: "100%",
    cursor: available ? "pointer" : "default",
    position: "relative",
    backdropFilter: "blur(10px)",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)"
    }`,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    opacity: available === "true" ? 1 : 0.7,
    "&:hover": {
      borderColor: available === "true"
        ? theme.palette.primary.main
        : "rgba(255, 255, 255, 0.1)",
    },
  })
);

export const CardContent = styled(Box)({
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  height: "100%",
});

export const CardIcon = styled(Box)({
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1.5rem",
  background: "linear-gradient(135deg, #0d95f9 0%, #8411cc 100%)",
  color: "white",
  boxShadow: "0 10px 20px rgba(13, 149, 249, 0.3)",
});

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: "1rem",
  color: theme.palette.text.primary,
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginBottom: "1.5rem",
  lineHeight: 1.6,
}));

export const ComingSoonBadge = styled(Box)({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  background: "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
  color: "white",
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(255, 152, 0, 0.3)",
});
