import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const NavigationContainer = styled("div")({
  backgroundColor: visitorColors.backgroundLight,
  padding: spacing.md,
  borderRadius: borderRadius.md,
  marginBottom: spacing.xl,
  backdropFilter: visitorColors.blur,

  "& .navigation-grid": {
    display: "grid",
    gap: spacing.md,
    zIndex: 2,

    "@media (min-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    "@media (min-width: 900px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },

    "@media (min-width: 1200px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },

  "& .nav-link": {
    color: visitorColors.textSecondary,
    cursor: "pointer",
    transition: transitions.medium,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",

    "&:hover": {
      color: visitorColors.primary,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transform: "translateY(-2px)",
    },
  },
});

export const NavigationTitle = styled(Typography)(({ theme }) => ({
  color: visitorColors.primary,
  textAlign: "center",
  marginBottom: spacing.md,
  fontSize: "1.25rem",
  fontWeight: "500",
}));
