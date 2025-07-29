import { styled } from "@mui/material/styles";
import { Box, Tab } from "@mui/material";

export const IndicesContainer = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: 400,
  display: "flex",
  flexDirection: "column",
});

export const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  padding: "0 8px",
}));

export const ChartContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  fontStyle: "italic",
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: 48,
  padding: "0 16px",
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}));

export const TabActions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));
