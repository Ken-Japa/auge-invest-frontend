import { styled } from "@mui/material/styles";
import { Dialog, IconButton } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    margin: 0,
    padding: 0,
    maxWidth: "1200px",
    width: "100%",
    height: "800px",
    maxHeight: "95vh",
    display: "flex",
    position: "relative",
    willChange: "transform",
    backfaceVisibility: "hidden",
    
    "@media (max-width: 600px)": {
      height: "100%",
      maxHeight: "100vh",
      borderRadius: 0,
    },
  },

  "& .background-image": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    transform: "translateZ(0)",
    
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))",
      zIndex: 1,
    },
  },

  "& .content": {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
  },
}));

export const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.common.white,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 3,
  
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  
  transform: "translateZ(0)",
  willChange: "transform",
  transition: "background-color 0.2s",
}));
