import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { spacing, borderRadius, transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const QuestionContainer = styled("div")({
  backgroundColor: visitorColors.backgroundLight,
  borderRadius: borderRadius.md,
  marginBottom: spacing.md,
  overflow: "hidden",
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.backgroundMedium,
  },

  "& .question-header": {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    border: "none",
    background: "none",
    cursor: "pointer",
    textAlign: "left",
  },

  "& .question-title": {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 500,
    color: visitorColors.text,
  },

  "& .question-answer": {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.3s ease, padding 0.3s ease",

    "&.open": {
      maxHeight: "1000px",
      padding: `0 ${spacing.lg} ${spacing.lg}`,
    },

    "&.closed": {
      maxHeight: 0,
      padding: `0 ${spacing.lg}`,
    },
  },

  "& .answer-content": {
    color: visitorColors.textSecondary,
    lineHeight: 1.6,

    "& a": {
      color: visitorColors.primary,
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
});

export const NoResultsContainer = styled("div")({
  textAlign: "center",
  padding: spacing.xl,
  backgroundColor: visitorColors.backgroundLight,
  borderRadius: borderRadius.md,
  color: visitorColors.textSecondary,

  "& p": {
    margin: spacing.sm,
  },
});

export const StyledExpandIcon = styled(ExpandMoreIcon, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen?: boolean }>(({ isOpen, theme }) => ({
  fontSize: 24,
  color: visitorColors.primary,
  transition: "transform 0.3s ease",
  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
}));
