import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  flexGrow: 1,
}));
