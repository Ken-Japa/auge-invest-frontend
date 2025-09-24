import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const StyledSubmitButton = styled(Button)({
  height: "56px",
  backgroundColor: visitorColors.buttonPrimary,
  color: visitorColors.buttonText,
  transition: transitions.medium,
  "&:hover": {
    backgroundColor: "#004a9e",
  },
  "&:disabled": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    color: "rgba(255, 255, 255, 0.3)",
  },
});
