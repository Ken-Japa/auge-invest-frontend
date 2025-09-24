import { styled } from "@mui/material/styles";
import { spacing } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

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
