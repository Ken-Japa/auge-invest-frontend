import { styled } from "@mui/material/styles";
import { spacing, borderRadius, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const FeaturesContainer = styled("div")({
  width: "100%",
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
});

export const FeatureCard = styled("div")(({ theme }) => ({
  background: `linear-gradient(145deg, ${visitorColors.backgroundLight} 0%, ${visitorColors.backgroundPrimary} 100%)`,
  backdropFilter: visitorColors.blur,
  border: `1px solid ${visitorColors.divider}`,
  borderRadius: borderRadius.lg,
  padding: spacing.xl,
  height: "auto",
  minHeight: "280px",
  display: "flex",
  flexDirection: "column",
  transition: transitions.medium,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",

  "&:hover": {
    background: `linear-gradient(145deg, ${visitorColors.backgroundMedium} 0%, rgba(13, 149, 249, 0.1) 100%)`,
    borderColor: "rgba(13, 149, 249, 0.3)",
    boxShadow: "0 8px 32px rgba(13, 149, 249, 0.1)",
    "& .feature-details": {
      maxHeight: "500px",
      opacity: 1,
    },
  },

  "& .feature-title": {
    color: visitorColors.primary,
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: spacing.md,
  },

  "& .feature-description": {
    color: visitorColors.textSecondary,
    fontSize: "1rem",
    lineHeight: 1.6,
    marginBottom: spacing.md,
  },

  "& .feature-details": {
    maxHeight: 0,
    opacity: 0,
    overflow: "hidden",
    transition: transitions.medium,
    marginTop: spacing.md,

    "& ul": {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },

    "& li": {
      marginBottom: spacing.sm,
      display: "flex",
      alignItems: "center",
      gap: spacing.sm,
      color: visitorColors.textSecondary,

      "&::before": {
        content: '"•"',
        color: visitorColors.primary,
      },
    },
  },

  "&.dimmed": {
    opacity: 0.5,
  },

  "&:hover .feature-details": {
    opacity: 1,
  },

  [theme.breakpoints.down("sm")]: {
    "& .feature-details": {
      padding: spacing.lg,
    },
  },
}));
