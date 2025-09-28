import { Box, Button,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { transitions } from "@/theme/variables";

export const SaveReportContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: transitions.medium,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
  transition: transitions.medium,
}));

export const OptionsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: transitions.medium,
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));