import { styled } from "@mui/material/styles";
import { borderRadius, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const SnackbarStyled = styled("div")<{ isVisible: boolean }>(
  ({ isVisible }) => ({
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: isVisible ? "translate(-50%, 0)" : "translate(-50%, 20px)",
    zIndex: 9999,
    minWidth: "300px",
    maxWidth: "500px",
    padding: "16px 24px",
    borderRadius: borderRadius.md,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    backdropFilter: visitorColors.blur,
    transition: transitions.medium,
    opacity: isVisible ? 1 : 0,

    "&.success": {
      backgroundColor: "rgba(46, 125, 50, 0.9)",
      color: "#fff",
    },

    "&.error": {
      backgroundColor: "rgba(211, 47, 47, 0.9)",
      color: "#fff",
    },

    "&.info": {
      backgroundColor: "rgba(2, 136, 209, 0.9)",
      color: "#fff",
    },

    "&.warning": {
      backgroundColor: "rgba(237, 108, 2, 0.9)",
      color: "#fff",
    },

    "& .close-button": {
      position: "absolute",
      top: "8px",
      right: "8px",
      color: "rgba(255, 255, 255, 0.7)",
      cursor: "pointer",
      transition: transitions.fast,

      "&:hover": {
        color: "#fff",
      },
    },
  })
);
