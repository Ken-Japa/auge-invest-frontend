import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { transitions } from "@/theme/variables";

export const CategoryContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: transitions.medium,
}));

export const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
  transition: transitions.medium,
}));

export const MetricsGrid = styled(Grid)({
  display: "flex",
  flexWrap: "wrap",
});

export const UnitText = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: "2px",
  fontSize: "0.9em",
  transition: transitions.medium,
}));

export const FormulaText = styled("span")(({ theme }) => ({
  color: theme.palette.info.light,
  display: "block",
  marginTop: theme.spacing(1),
  fontSize: "0.8rem",
  transition: transitions.medium,
}));
