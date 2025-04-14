import { Dialog, styled, IconButton } from "@mui/material";
import { visitorColors } from "@/theme/palette/visitor";
import { spacing } from "@/theme/variables";

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-container": {
    height: "100vh",
    willChange: "opacity, transform",
  },

  "& .MuiDialog-paper": {
    height: "100vh",
    maxHeight: "100vh",
    width: "100vw",
    maxWidth: "100vw !important",
    margin: 0,
    borderRadius: 0,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "transparent",
    transform: "translateZ(0)",

    "@media (max-width: 600px)": {
      padding: spacing.md,
    },

    "& .background-image": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: visitorColors.backgroundLight,
      zIndex: 1,
    },

    "& .content": {
      position: "relative",
      zIndex: 2,
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: `${spacing.xl} ${spacing.md}`,
    },
  },
});

export const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: spacing.lg,
  top: spacing.lg,
  color: visitorColors.text,
  zIndex: 10,
  transition: "opacity 0.2s",
  backgroundColor: `${visitorColors.backgroundDark}33`,
  willChange: "opacity",

  "&:hover": {
    opacity: 0.8,
    backgroundColor: `${visitorColors.backgroundDark}66`,
  },

  "& svg": {
    willChange: "transform",
    transform: "translateZ(0)",
  },

  "@media (max-width: 600px)": {
    right: spacing.md,
    top: spacing.md,
  },
});
