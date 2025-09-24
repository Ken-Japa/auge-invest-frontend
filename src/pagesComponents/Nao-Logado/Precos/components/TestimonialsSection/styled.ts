import { styled } from "@mui/material/styles";
import { spacing, borderRadius, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const TestimonialCard = styled("div")({
  backgroundColor: visitorColors.overlay,
  padding: spacing.lg,
  borderRadius: borderRadius.md,
  border: `1px solid ${visitorColors.divider}`,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
    borderColor: visitorColors.primary,
  },

  "& .testimonial-text": {
    color: visitorColors.textSecondary,
    marginBottom: spacing.md,
    fontStyle: "italic",
  },

  "& .divider": {
    height: "1px",
    backgroundColor: visitorColors.divider,
    margin: `${spacing.md} 0`,
  },

  "& .testimonial-author": {
    color: visitorColors.primary,
    marginBottom: spacing.xs,
  },

  "& .testimonial-role": {
    color: visitorColors.textMuted,
    fontSize: "0.875rem",
  },
});

export const TestimonialsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: spacing.xl,
  width: "100%",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));
