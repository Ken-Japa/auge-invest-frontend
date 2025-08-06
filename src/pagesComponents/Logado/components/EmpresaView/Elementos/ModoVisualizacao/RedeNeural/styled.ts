import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GraphContainer = styled("div")(({ theme }) => ({
  position: 'relative',
  flex: 1,
  height: "calc(100vh - 64px)",
  minHeight: "calc(100vh - 64px)",
  width: "100%",
  '& .MuiFormControl-root': {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  background:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : "#f5f5f7",
  backdropFilter: "blur(10px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 24px rgba(0, 0, 0, 0.4)"
      : "0 4px 24px rgba(0, 0, 0, 0.1)",
  "& .vis-network": {
    outline: "none",
    height: "100%",
    background:
      theme.palette.mode === "dark"
        ? "rgba(10, 15, 30, 0.95)"
        : "rgba(10, 15, 30, 0.95)",
  },
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 64px)",
  width: "100%",
  background:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.background.paper,
}));
