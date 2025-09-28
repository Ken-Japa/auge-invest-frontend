import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { spacing, transitions } from "@/theme/variables";

export const RegisterFormStyled = styled("form")({
  position: "relative",
  width: "100%",
  maxWidth: "400px",
  padding: spacing.xl,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
  alignItems: "center",
  paddingTop: spacing.xl,
  paddingBottom: spacing.xl, // Adicionado para dar espaço no final do formulário

  "@media (max-width: 600px)": {
    padding: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },

  "& .divider-container": {
    display: "flex",
    alignItems: "center",
    margin: `${spacing.lg} 0`,
    width: "100%",

    "& .divider": {
      flex: 1,
      borderBottom: `1px solid ${visitorColors.text}33`,
    },
    "& .divider-text": {
      margin: `0 ${spacing.md}`,
      color: `${visitorColors.text}b3`,
      fontSize: "0.875rem",
    },
  },

  "& .login-text": {
    marginTop: spacing.lg,
    fontFamily: '"Roboto Mono", monospace',
    letterSpacing: "0.5px",
    textAlign: "center",
    width: "100%",
  },
});

export const SubmitButton = styled(Button)({
  marginTop: spacing.md,
  backgroundColor: visitorColors.primary,
  color: visitorColors.buttonText,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: visitorColors.buttonPrimary,
  },

  "&:disabled": {
    backgroundColor: `${visitorColors.primary}80`,
    color: `${visitorColors.buttonText}cc`,
  },
});
