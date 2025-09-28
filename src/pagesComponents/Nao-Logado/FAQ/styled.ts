import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { spacing } from "@/theme/variables";

export const SectionFAQ = styled("section")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: `${spacing.xl}`,
  backgroundColor: visitorColors.overlay,
  paddingBottom: visitorColors.paddingPage,

  "& .background-image": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    "& > span": {
      height: "100vh !important",
    },
    "& img": {
      objectFit: "cover",
      objectPosition: "center",
    },
  },

  "& .content-container": {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: `${spacing.xl} ${spacing.lg}`,
    backgroundColor: visitorColors.overlay,
    backdropFilter: visitorColors.blur,

    [theme.breakpoints.down("sm")]: {
      padding: `${spacing.lg} ${spacing.md}`,
    },
  },
}));
