import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SettingsTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

export const SettingsControlContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "&:last-child": {
    marginBottom: 0,
  },
}));

export const SliderLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const SliderDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));
