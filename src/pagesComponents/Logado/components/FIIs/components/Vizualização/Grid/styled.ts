import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 40, 60, 0.8)"
      : theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: theme.spacing(1),
  "&:last-child": {
    paddingBottom: theme.spacing(1.5),
  },
}));

export const FIIName = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.9rem",
  marginBottom: theme.spacing(1),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: theme.palette.text.primary,
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

export const CodeChip = styled(Chip)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    cursor: "pointer",
  },
}));

export const GridContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
