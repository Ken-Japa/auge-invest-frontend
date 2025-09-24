import { styled } from "@mui/material/styles";
import { spacing } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const CTAContainer = styled("section")(({ theme }) => ({
  width: "100vw",
  position: "relative",
  padding: `${spacing.xxl} ${spacing.lg}`,
  marginLeft: "calc(-50vw + 50%)",
  marginRight: "calc(-50vw + 50%)",
  backgroundColor: visitorColors.backgroundPrimary,
  backdropFilter: visitorColors.blur,
  textAlign: "center",

  "& .cta-title": {
    color: visitorColors.text,
    marginBottom: spacing.md,
    minHeight: "48px",
  },

  "& .cta-description": {
    color: visitorColors.textSecondary,
    maxWidth: "600px",
    margin: "0 auto",
    marginBottom: spacing.lg,
    minHeight: "24px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: `${spacing.xl} ${spacing.md}`,
  },
}));
