import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { spacing, borderRadius } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const InfoContainer = styled(Stack)({
  padding: spacing.lg,
  backgroundColor: visitorColors.backgroundLight,
  borderRadius: borderRadius.md,
  backdropFilter: visitorColors.blur,
});

export const InfoItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: spacing.xs,
});

export const InfoHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: spacing.sm,

  "& .info-icon": {
    color: visitorColors.primary,
  },

  "& .info-title": {
    fontWeight: 600,
    color: visitorColors.text,
  },
});

export const ContactInfoSkeletonStyled = styled(Stack)({
  width: "100%",
  minHeight: "200px",
});
