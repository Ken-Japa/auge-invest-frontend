import { styled } from "@mui/material/styles";
import { visitorColors } from "@/theme/palette/visitor";
import { spacing, borderRadius } from "@/theme/variables";

export const BlockTimerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing.md,
  padding: spacing.xl,
  backgroundColor: `${visitorColors.backgroundDark}b3`,
  backdropFilter: visitorColors.blur,
  borderRadius: borderRadius.md,
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
});

export const TimerTitle = styled("h2")({
  color: visitorColors.error,
  marginBottom: spacing.sm,
  fontSize: "1.5rem",
  fontWeight: 600,
});

export const TimerText = styled("p")({
  color: visitorColors.text,
  marginBottom: spacing.md,
});

export const TimerDisplay = styled("div")({
  color: visitorColors.primary,
  fontSize: "2rem",
  fontWeight: 700,
  fontFamily: '"Roboto Mono", monospace',
  marginBottom: spacing.md,
});

export const TimerMessage = styled("p")({
  color: `${visitorColors.text}cc`,
  fontSize: "0.875rem",
});
