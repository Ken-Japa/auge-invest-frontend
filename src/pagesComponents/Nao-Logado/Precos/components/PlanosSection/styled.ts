import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { borderRadius, spacing, transitions } from "@/theme/variables";

export const PlanosGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: spacing.xl,
  width: "100%",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const PlanoCard = styled("div")({
  padding: spacing.xl,
  backgroundColor: visitorColors.overlay,
  borderRadius: borderRadius.md,
  border: `1px solid ${visitorColors.divider}`,
  color: visitorColors.text,
  transition: transitions.medium,

  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: visitorColors.primary,
    backgroundColor: visitorColors.backgroundMedium,
  },

  "& .plano-tipo": {
    fontSize: "1.5rem",
    marginBottom: spacing.md,
  },

  "& .plano-preco": {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },

  "& .plano-periodo": {
    opacity: 0.75,
    marginBottom: spacing.xs,
  },

  "& .plano-desconto": {
    color: visitorColors.success,
    marginBottom: spacing.lg,
  },
});
