import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ETFPageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  padding: theme.spacing(4, 2),
  marginTop: "-64px",

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
        ? 'url("/assets/images/background/ETFs-Dark.jpg")'
        : 'url("/assets/images/background/ETFs-Light.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    opacity: 0.15,
    zIndex: -1,
  },
}));
