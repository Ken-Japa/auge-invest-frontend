import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { transitions } from "@/theme/variables";

export const ThemeContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

export const ThemeInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

export const ThemeLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  variant: "body2",
}));

export const ThemeControlContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: theme.spacing(1),
}));

export const DarkIcon = styled(DarkModeIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: transitions.medium,
  marginLeft: theme.spacing(1),
}));

export const LightIcon = styled(LightModeIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
  transition: transitions.medium,
  marginLeft: theme.spacing(1),
}));
