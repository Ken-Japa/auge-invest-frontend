import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MatrixRainText } from "@/components/Effects/MatrixRainText";
import { spacing } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const HeaderContainer = styled("div")({
  textAlign: "center",
  marginBottom: spacing.lg,
});

export const SubtitleText = styled(Typography)({
  opacity: 0.9,
  color: visitorColors.textSecondary,
});

export const HeaderSkeletonStyled = styled(Stack)({
  width: "100%",
  minHeight: "120px",
});

export const HeaderStack = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing.md,
});

export const MatrixTitle = styled(MatrixRainText)({
  fontSize: "2.5rem",
  color: visitorColors.text,
});
