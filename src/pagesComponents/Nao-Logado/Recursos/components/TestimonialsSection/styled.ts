import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const TestimonialCard = styled("div")(({ theme }) => ({
  backgroundColor: visitorColors.backgroundLight,
  padding: spacing.lg,
  borderRadius: borderRadius.md,
  backdropFilter: visitorColors.blur,
  transition: transitions.medium,
  height: "100%",

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
  },

  "& .testimonial-text": {
    color: visitorColors.textSecondary,
    marginBottom: spacing.md,
    fontStyle: "italic",
  },

  "& .testimonial-author": {
    color: visitorColors.primary,
    fontWeight: "bold",
  },

  "& .testimonial-role": {
    color: visitorColors.textMuted,
    fontSize: "0.875rem",
  },

  [theme.breakpoints.down("sm")]: {
    padding: spacing.md,
  },
}));
