import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { spacing, transitions } from "@/theme/variables";

export const SectionWelcome = styled("section")({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  background: "transparent",

  "& .home": {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: `${spacing.xxl} 0`,
  },

  "& .content-container": {
    width: "100%",
  },

  "& .welcome": {
    width: "100%",
    textAlign: "center",
    marginBottom: "164px",
  },

  "& .title-left": {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: visitorColors.text,
  },

  "& .title-right": {
    fontSize: "40px",
    fontWeight: "bold",
    color: visitorColors.primary,
  },

  "& .highlight-card": {
    backgroundColor: visitorColors.backgroundLight,
    borderRadius: "8px",
    padding: spacing.lg,
    height: "100%",
    transition: transitions.medium,
    backdropFilter: visitorColors.blur,

    "&:hover": {
      backgroundColor: visitorColors.backgroundMedium,
      transform: "translateY(-5px)",
    },

    "& h3": {
      color: visitorColors.text,
      marginBottom: spacing.sm,
    },

    "& .value": {
      color: visitorColors.primary,
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: spacing.sm,
    },

    "& p": {
      color: visitorColors.textSecondary,
    },
  },
});
