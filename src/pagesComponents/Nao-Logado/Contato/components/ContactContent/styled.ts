import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { spacing } from "@/theme/variables";

export const ContentContainer = styled(Stack)({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  spacing: spacing.xl,
});

export const FormContainer = styled(Stack)({
  alignItems: "flex-start",

  "@media (max-width: 900px)": {
    gap: spacing.lg,
  },
});
