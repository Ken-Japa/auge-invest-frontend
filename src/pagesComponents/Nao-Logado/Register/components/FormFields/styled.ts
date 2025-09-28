import { Box, LinearProgress, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: spacing.sm,

  "& .MuiOutlinedInput-root": {
    color: visitorColors.text,
    transition: transitions.medium,

    "& fieldset": {
      borderColor: `${visitorColors.text}3d`,
    },
    "&:hover fieldset": {
      borderColor: `${visitorColors.text}80`,
    },
    "&.Mui-focused fieldset": {
      borderColor: visitorColors.primary,
    },
  },

  "& .MuiInputLabel-root": {
    color: `${visitorColors.text}b3`,
  },

  "& .MuiFormHelperText-root": {
    color: visitorColors.error,
    marginLeft: 0,
  },
});

export const PasswordStrengthContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: spacing.xs,
  marginTop: spacing.sm,
});

export const StyledLinearProgress = styled(LinearProgress)({
  height: 8,
  borderRadius: borderRadius.sm,
  backgroundColor: `${visitorColors.text}33`,
  width: "100%",
});

export const StrengthText = styled(Typography)({
  color: visitorColors.text,
  opacity: 0.9,
  textAlign: "left",
});
