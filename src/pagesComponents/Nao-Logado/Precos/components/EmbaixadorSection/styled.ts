import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const EmbaixadorCard = styled("div")({
  backgroundColor: visitorColors.overlay,
  padding: spacing.xl,
  borderRadius: borderRadius.md,
  border: `1px solid ${visitorColors.divider}`,
  color: visitorColors.text,
  width: "100%",
  maxWidth: "400px",
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
    borderColor: visitorColors.primary,
  },

  "& .card-title": {
    fontSize: "1.5rem",
    marginBottom: spacing.md,
    textAlign: "center",
  },

  "& .card-price": {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: spacing.xs,
    textAlign: "center",
  },

  "& .card-period": {
    opacity: 0.75,
    marginBottom: spacing.lg,
    textAlign: "center",
  },

  "& .benefits-list": {
    marginBottom: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },

  "& .benefit-item": {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,

    "& .icon": {
      color: visitorColors.primary,
    },
  },
});

export const Description = styled("p")({
  color: visitorColors.text,
  textAlign: "center",
  maxWidth: "800px",
  marginBottom: spacing.xl,
  lineHeight: 1.6,
});
