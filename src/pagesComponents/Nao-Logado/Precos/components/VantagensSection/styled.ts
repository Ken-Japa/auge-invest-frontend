import { styled } from "@mui/material/styles";
import { spacing, borderRadius, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const VantagemCard = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: spacing.lg,
  backgroundColor: visitorColors.overlay,
  borderRadius: borderRadius.md,
  color: visitorColors.text,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
  },

  "& .title": {
    fontSize: "1.25rem",
    marginBottom: spacing.md,
    color: visitorColors.primary,
  },

  "& .description": {
    color: visitorColors.textSecondary,
  },
}));

export const VantagensGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: spacing.xl,
  width: "100%",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));
