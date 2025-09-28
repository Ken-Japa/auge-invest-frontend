import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const SearchContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& .search-wrapper": {
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    marginBottom: spacing.xl,
  },

  "& .search-input": {
    width: "100%",
    padding: `${spacing.md} ${spacing.xl}`,
    paddingLeft: "48px",
    backgroundColor: visitorColors.backgroundLight,
    color: visitorColors.text,
    border: `1px solid ${visitorColors.borderLight}`,
    borderRadius: borderRadius.md,
    fontSize: "1rem",
    transition: transitions.medium,

    "&:focus": {
      outline: "none",
      borderColor: visitorColors.primary,
      backgroundColor: visitorColors.backgroundMedium,
    },

    "&::placeholder": {
      color: visitorColors.textMuted,
    },
  },

  "& .search-icon": {
    position: "absolute",
    left: spacing.md,
    top: "50%",
    transform: "translateY(-50%)",
  },

  "& .clear-button": {
    position: "absolute",
    right: spacing.md,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
});

export const StyledSearchIcon = styled(SearchIcon)({
  fontSize: 24,
  color: visitorColors.textMuted,
});

export const StyledCloseIcon = styled(CloseIcon)({
  fontSize: 24,
  color: visitorColors.textMuted,
});
