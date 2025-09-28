import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const ContactFormSkeletonStyled = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
});

export const ContactFormStyled = styled("form")({
  flex: "1 1 auto",
  maxWidth: "600px",

  "& .MuiTextField-root": {
    marginBottom: spacing.md,
    width: "100%",

    "& .MuiOutlinedInput-root": {
      backgroundColor: visitorColors.backgroundOverlay,
      borderRadius: borderRadius.sm,
    },
  },

  "& .MuiOutlinedInput-root": {
    color: visitorColors.text,
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: visitorColors.primary,
    },
  },

  "& .MuiInputLabel-root": {
    color: visitorColors.textSecondary,
    "&.Mui-focused": {
      color: visitorColors.primary,
    },
  },

  "& .submit-button": {
    marginTop: spacing.lg,
    backgroundColor: visitorColors.buttonPrimary,
    color: visitorColors.buttonText,
    transition: transitions.medium,
    "&:hover": {
      backgroundColor: "#004a9e",
    },
  },
});

export const AutocompletePaper = styled("div")({
  backgroundColor: visitorColors.backgroundLight,
  color: visitorColors.text,
  borderRadius: borderRadius.sm,

  "& .MuiAutocomplete-option": {
    "&:hover": {
      backgroundColor: visitorColors.backgroundOverlay,
    },
    "&[aria-selected='true']": {
      backgroundColor: `${visitorColors.primary}40`,
    },
  },
});
