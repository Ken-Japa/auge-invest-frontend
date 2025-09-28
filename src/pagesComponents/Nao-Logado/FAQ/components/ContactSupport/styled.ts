import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const SupportContainer = styled("div")({
  marginTop: spacing.xxl,
  textAlign: "center",
  backgroundColor: visitorColors.backgroundLight,
  padding: spacing.xl,
  borderRadius: borderRadius.md,
  width: "100%",
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
  },

  "& .support-title": {
    color: visitorColors.text,
    fontSize: "1.5rem",
    marginBottom: spacing.md,
  },

  "& .support-text": {
    color: visitorColors.textSecondary,
    marginBottom: spacing.lg,
  },
});
