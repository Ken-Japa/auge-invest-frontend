import { styled } from "@mui/material/styles";
import { Typography, Paper, Grid } from "@mui/material";
import { spacing, borderRadius } from "@/theme/variables";

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  position: "relative",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: spacing.md,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.md,
  boxShadow: theme.shadows[1],
}));

export const GridContainer = styled(Grid)({
  marginBottom: spacing.lg,
});

export const GridItem = styled(Grid)({
  display: "flex",
  flexDirection: "column",
});
