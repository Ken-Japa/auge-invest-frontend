import { styled } from "@mui/material/styles";
import { spacing, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const ScrollButton = styled("button")({
  position: "fixed",
  bottom: spacing.lg,
  right: spacing.lg,
  backgroundColor: visitorColors.primary,
  padding: spacing.sm,
  borderRadius: "50%",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: transitions.medium,
  cursor: "pointer",
  border: "none",
  color: "white",
  zIndex: 1000,
  opacity: 1,
  pointerEvents: "auto",

  "&:hover": {
    backgroundColor: visitorColors.buttonPrimary,
    transform: "translateY(-2px)",
  },

  "@media (max-width: 600px)": {
    bottom: spacing.md,
    right: spacing.md,
    padding: spacing.xs,
  },
});
