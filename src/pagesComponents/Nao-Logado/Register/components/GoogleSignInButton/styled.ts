import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { transitions } from "@/theme/variables";
import { visitorColors } from "@/theme/palette/visitor";

export const StyledGoogleButton = styled(Button)({
  color: visitorColors.text,
  borderColor: `${visitorColors.text}80`,
  transition: transitions.medium,

  "&:hover": {
    borderColor: visitorColors.text,
    backgroundColor: `${visitorColors.text}26`,
  },

  "@media (max-width: 600px)": {
    fontSize: "0.875rem",
  },
});
