import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { spacing, borderRadius, shadows, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const SectionPlans = styled("section")({
  width: "100vw",
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "calc(-50vw + 50%)",
  marginRight: "calc(-50vw + 50%)",
  background: "transparent",

  ".plans": {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${spacing.lg} ${spacing.md}`,
    maxWidth: "1920px",
    margin: "0 auto",

    "@media (max-width: 900px)": {
      padding: `${spacing.md} ${spacing.sm}`,
    },
  },
});

export const CardContainer = styled(Stack)({
  maxWidth: "250px",
  width: "100%",
  padding: spacing.md,
  backgroundColor: visitorColors.cardBackground,
  boxShadow: shadows.sm,
  borderRadius: borderRadius.sm,
  color: visitorColors.text,
  backdropFilter: visitorColors.blur,
  transition: transitions.medium,

  "@media (max-width: 900px)": {
    maxWidth: "100%",
    margin: "0 auto",
  },

  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: shadows.md,
  },

  ul: {
    fontSize: "13px",
    listStyleType: "none",
    padding: 0,
    margin: 0,

    li: {
      marginBottom: spacing.sm,
      display: "flex",
      alignItems: "flex-start",
    },
  },
});
