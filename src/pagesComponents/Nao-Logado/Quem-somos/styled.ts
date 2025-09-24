import { styled } from "@mui/material/styles";
import { spacing, borderRadius, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const SectionTeam = styled("section")({
  minHeight: "100vh",
  width: "100%",
  position: "relative",

  "& .background-image": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },

  "& .opacity": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: visitorColors.overlayG,
    zIndex: 0,
  },

  "& .content": {
    position: "relative",
    zIndex: 1,
  },
});

export const BaseSection = styled("section")(({ theme }) => ({
  maxWidth: "64rem",
  width: "100%",
  textAlign: "center",
  transform: "scale(1)",
  transition: transitions.medium,

  "&:hover": {
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down("sm")]: {
    padding: `0 ${spacing.md}`,
  },
}));

export const SectionTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.sm,
  marginBottom: spacing.md,
});

// Componente de container comum para seções com estilo similar
export const ContentContainer = styled("div")(({ theme }) => ({
  backgroundColor: visitorColors.backgroundLight,
  padding: spacing.xl,
  borderRadius: borderRadius.md,
  backdropFilter: visitorColors.blur,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
  },

  "& p": {
    color: visitorColors.text,
    marginBottom: spacing.xl,
    lineHeight: 1.7,

    "&:last-child": {
      marginBottom: 0,
    },
  },

  [theme.breakpoints.down("sm")]: {
    padding: spacing.lg,
  },
}));

export const Subtitle = styled("div")({
  color: visitorColors.textSecondary,
  marginBottom: spacing.xl,
});
