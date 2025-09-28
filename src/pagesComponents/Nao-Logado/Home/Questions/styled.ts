import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { spacing } from "@/theme/variables";

export const QuestionsSection = styled("section")({
  padding: `${spacing.md} 0`,
  "& .section-title": {
    fontSize: "2rem",
    color: visitorColors.primary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  "& .section-subtitle": {
    color: visitorColors.textMuted,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
});
