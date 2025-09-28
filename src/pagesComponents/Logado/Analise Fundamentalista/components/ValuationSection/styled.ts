import { Box, Button,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { transitions } from "@/theme/variables";

export const SectionContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
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

export const InputGroup = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export const InputLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontSize: "0.9rem",
    transition: transitions.medium,
}));

export const CalculateButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    transition: transitions.medium,
}));

export const ResultsContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" 
        ? theme.palette.background.default 
        : theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    transition: transitions.medium,
}));