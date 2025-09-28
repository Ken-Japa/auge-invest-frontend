import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const NavigationContainer = styled("div")({
  "& .navigation-title": {
    color: visitorColors.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },

  "& .navigation-content": {
    backgroundColor: visitorColors.backgroundLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
    backdropFilter: visitorColors.blur,
  },

  "& .navigation-grid": {
    display: "grid",
    gap: spacing.md,

    "@media (min-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    "@media (min-width: 1200px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },

  "& .navigation-link": {
    color: visitorColors.textSecondary,
    cursor: "pointer",
    transition: transitions.medium,

    "&:hover": {
      color: visitorColors.primary,
    },
  },
});
