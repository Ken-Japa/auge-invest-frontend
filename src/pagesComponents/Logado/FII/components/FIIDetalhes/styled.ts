import {
  Box,
  Button as MuiButton,
  Chip as MuiChip,
  Divider as MuiDivider,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const DetailPageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  padding: theme.spacing(4, 2),
  marginTop: "-64px",
  paddingTop: "84px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      theme.palette.mode === "dark"
        ? 'url("/assets/images/background/FII-Detalhes-Dark.jpg")'
        : 'url("/assets/images/background/FII-Detalhes-Light.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    opacity: 0.15,
    zIndex: -1,
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
}));

export const DetailContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const DetailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(19, 47, 76, 0.9)"
      : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
}));

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});

export const FIITitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export const FIISubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const CodeChip = styled(MuiChip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontWeight: "bold",
  fontSize: "1rem",
}));

export const SectionDivider = styled(MuiDivider)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

export const InfoValue = styled(Typography)({
  display: "flex",
  alignItems: "center",
});

export const InfoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
}));

export const BackButton = styled(MuiButton)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightMedium,
}));

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
});

export const ErrorContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
