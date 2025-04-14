import { ElementType } from "react";
import {
  styled,
  Paper,
  Box,
  Typography,
  Button as MuiButton,
  ButtonProps,
} from "@mui/material";
import { transitions } from "@/theme/variables";

export const ProfileContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage:
    theme.palette.mode === "dark"
      ? 'url("/assets/images/background/Perfil-Dark.jpg")'
      : 'url("/assets/images/background/Perfil-Light.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  transition: transitions.medium,
  padding: theme.spacing(4, 2),
  marginTop: "-64px",
  paddingTop: "84px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

export const ProfileCard = styled(Paper)(({ theme }) => ({
  maxWidth: 1000,
  width: "100%",
  margin: "0 auto",
  padding: theme.spacing(4),
  background:
    theme.palette.mode === "dark"
      ? "rgba(19, 47, 76, 0.8)"
      : "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  marginBottom: theme.spacing(4),
}));

export const ProfileTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "2.5rem",
  fontWeight: 600,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  variant: "h1",
}));

export const ContactButton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  maxWidth: 800,
  margin: `${theme.spacing(4)} auto`,
}));

export const StyledContactButton = styled(MuiButton)<
  ButtonProps & {
    component?: ElementType;
  }
>(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "rgba(19, 47, 76, 0.4)"
      : "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.primary.main,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  padding: theme.spacing(1, 3),
  transition: transitions.medium,
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(19, 47, 76, 0.6)"
        : "rgba(255, 255, 255, 0.9)",
    boxShadow: theme.shadows[4],
  },
}));

export const ProfileSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

export const ProfileLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  variant: "body2",
}));

export const ProfileValue = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: theme.spacing(2),
  color: theme.palette.text.primary,
  variant: "body1",
}));
