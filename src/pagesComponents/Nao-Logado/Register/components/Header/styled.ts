import { styled } from "@mui/material/styles";
import { spacing } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const HeaderContainer = styled("div")({
  width: "100%",
  textAlign: "center",
  marginBottom: spacing.md,

  "& .matrix-title": {
    color: visitorColors.text,
    fontSize: "1.75rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
    display: "inline-block",
    marginBottom: spacing.sm,

    "@media (max-width: 600px)": {
      fontSize: "1.5rem",
    },
  },

  "& .header-subtitle": {
    color: `${visitorColors.text}cc`,
    marginBottom: spacing.sm,
  },
});
