import { styled } from "@mui/material/styles";
import { spacing } from "@/theme/variables";

export const PageHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: spacing.xl,

  "& h1": {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
}));

export const ActionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginBottom: spacing.xl,
  justifyContent: "space-between",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: spacing.md,
  },
}));
