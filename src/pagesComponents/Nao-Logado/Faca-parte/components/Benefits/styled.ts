import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const BenefitsContainer = styled("div")({
  backgroundColor: visitorColors.backgroundLight,
  padding: spacing.md,
  borderRadius: borderRadius.md,
  backdropFilter: visitorColors.blur,

  "& .benefits-title": {
    color: visitorColors.primary,
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  },

  "& .rocket-icon": {
    marginRight: spacing.sm,
  },

  "& .benefits-grid": {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.xs,
  },

  "& .benefit-chip": {
    backgroundColor: `${visitorColors.primary}26`, // 15% opacity
    color: visitorColors.text,
    transition: transitions.fast,

    "&:hover": {
      backgroundColor: `${visitorColors.primary}40`, // 25% opacity
    },
  },
});
