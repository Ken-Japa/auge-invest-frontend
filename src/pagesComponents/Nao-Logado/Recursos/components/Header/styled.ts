import { styled } from "@mui/material/styles";
import { spacing } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const HeaderContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  maxWidth: "48rem",
  margin: "0 auto",
  marginTop: spacing.md,

  "& .header-title": {
    color: visitorColors.text,
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: spacing.md,

    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },

  "& .header-subtitle": {
    color: visitorColors.textSecondary,
    fontSize: "1.25rem",
    maxWidth: "48rem",
    margin: "0 auto",
    lineHeight: 1.6,

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));
