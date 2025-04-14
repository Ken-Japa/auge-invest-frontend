import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import { spacing } from "@/theme/variables";

export const ContentWrapper = styled("div")({
  position: "relative",
  zIndex: 10,
  padding: `${spacing.xl} 0`,
  minHeight: "calc(100vh - 200px)",
  display: "flex",
  flexDirection: "column",
});

export const StyledContainer = styled(Container)({
  maxWidth: "lg",
  "& > .MuiStack-root": {
    minHeight: "500px",
  },
});
