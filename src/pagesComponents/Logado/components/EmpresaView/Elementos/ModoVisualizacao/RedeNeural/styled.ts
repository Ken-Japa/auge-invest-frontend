import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GraphContainer = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  height: "calc(100vh - 64px)",
  minHeight: "calc(100vh - 64px)",
  width: "100%",
  "& .MuiFormControl-root": {
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

export const MenuContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  zIndex: 1,
}));

export const SelectedNodePathContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 2,
  backgroundColor: 'rgba(10,15,30,0.8)',
  padding: '5px 10px',
  borderRadius: '5px',
}));
