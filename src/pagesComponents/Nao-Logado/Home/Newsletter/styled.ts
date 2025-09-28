import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const NewsletterContainer = styled("div")({
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
  marginRight: "calc(-50vw + 50%)",
  padding: `${spacing.xxl} ${spacing.md}`,
  backgroundColor: visitorColors.backgroundPrimary,
  backdropFilter: "blur(4px)",
  textAlign: "center",

  "@media (max-width: 600px)": {
    padding: `${spacing.xl} ${spacing.md}`,
  },
});

export const NewsletterForm = styled("form")({
  width: "100%",
  maxWidth: "500px",
  padding: `0 ${spacing.md}`,

  "@media (max-width: 600px)": {
    "& .MuiStack-root": {
      flexDirection: "column",
      gap: spacing.md,
    },
    "& button": {
      width: "100%",
    },
  },

  "& input": {
    flex: 1,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.sm,
    backgroundColor: visitorColors.backgroundLight,
    border: `1px solid ${visitorColors.divider}`,
    color: visitorColors.text,
    width: "100%",
    "&::placeholder": {
      color: visitorColors.textMuted,
    },
    "&:focus": {
      outline: "none",
      borderColor: visitorColors.primary,
    },
  },
});

export const SubmitButton = styled(Button)({
  padding: "0.75rem 1.5rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  backgroundColor: visitorColors.buttonPrimary,
  color: visitorColors.buttonText,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: "#004a9e",
  },

  "&:disabled": {
    backgroundColor: `${visitorColors.primary}80`,
    color: `${visitorColors.buttonText}cc`,
  },
  "@media (max-width: 600px)": {
    width: "100%",
  },
});

export const StyledTextField = styled(TextField)({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: visitorColors.primary,
    },
  },
  "& .MuiInputBase-input": {
    color: visitorColors.text,
  },
  "& .MuiFormHelperText-root": {
    color: "#f44336",
  },
});
