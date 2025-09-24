import { Dialog, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiPaper-root": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(10, 25, 41, 0.95)"
        : "rgba(255, 255, 255, 0.95)",
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
}));

export const StepsList = styled("ul")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  "& .highlight": {
    color: theme.palette.error.main,
    fontWeight: "bold",
  },
  "& li": {
    marginBottom: theme.spacing(1),
  },
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.25rem",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

export const MetricsTable = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

export const MetricsTableRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));
