import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { transitions } from "@/theme/variables";

export const BackgroundContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  marginTop: "-64px",
  paddingTop: "64px",
  paddingBottom: "64px",
  backgroundImage:
    theme.palette.mode === "dark"
      ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/images/background/Dashboard-Dark.jpg")'
      : 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url("/assets/images/background/Dashboard-Light.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "relative",
  transition: transitions.medium,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4), // Add bottom margin
  flexGrow: 1, // Allow this container to grow and push content to the bottom
}));
