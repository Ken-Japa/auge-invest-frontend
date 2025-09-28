import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { spacing } from "@/theme/variables";

export const HeaderContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  marginBottom: spacing.xxl,

  "& .header-icon-wrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  "& .title": {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: visitorColors.primary,

    "@media (max-width: 600px)": {
      fontSize: "2rem",
    },
  },

  "& .subtitle": {
    color: visitorColors.textSecondary,
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
}));

export const HeaderIcon = styled(HelpIcon)({
  fontSize: 60,
  color: visitorColors.primary,
});
