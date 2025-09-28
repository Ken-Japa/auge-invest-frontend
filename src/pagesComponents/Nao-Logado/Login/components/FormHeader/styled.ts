import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { spacing } from "@/theme/variables";

export const HeaderContainer = styled("div")({
  marginBottom: spacing.xl,
  width: "100%",
  textAlign: "center",
});

export const Title = styled("div")({
  color: visitorColors.text,
  fontSize: "1.75rem",
  fontWeight: 600,
  marginBottom: spacing.sm,
  fontFamily: '"Roboto Mono", monospace',
  width: "100%",

  "& .matrix-title": {
    whiteSpace: "nowrap",
    display: "inline-block",
    fontSize: "1.75rem",
    fontWeight: "600",
  },

  "@media (max-width: 600px)": {
    fontSize: "1.5rem",

    "& .matrix-title": {
      fontSize: "1.5rem !important",
    },
  },
});

export const Subtitle = styled(Typography)({
  color: `${visitorColors.text}b3`,
  fontSize: "1rem",

  "@media (max-width: 600px)": {
    fontSize: "0.875rem",
  },
});
