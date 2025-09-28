import { Avatar,Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const CardContainer = styled(Box)({
  background: visitorColors.backgroundLight,
  backdropFilter: visitorColors.blur,
  borderRadius: borderRadius.md,
  padding: spacing.lg,
  border: `1px solid ${visitorColors.borderLight}`,
  transition: transitions.medium,
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "&:hover": {
    borderColor: `${visitorColors.gold}4d`,
  },

  "& .ambassador-name": {
    color: visitorColors.text,
    fontWeight: "bold",
  },

  "& .ambassador-role": {
    color: visitorColors.gold,
  },

  "& .ambassador-testimonial": {
    color: `${visitorColors.text}cc`,
  },
});

export const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: "2px solid #FFD700",
  boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
});

export const animationConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;
