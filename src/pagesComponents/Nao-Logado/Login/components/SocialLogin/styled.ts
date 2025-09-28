import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { visitorColors } from "@/theme/palette/visitor";
import { transitions } from "@/theme/variables";

export const GoogleButton = styled(Button)({
  color: visitorColors.text,
  borderColor: `${visitorColors.text}4d`,
  transition: transitions.medium,

  "&:hover": {
    borderColor: visitorColors.text,
    backgroundColor: `${visitorColors.text}1a`,
  },

  "@media (max-width: 600px)": {
    fontSize: "0.875rem",
  },
});

export const RegisterLink = styled("span")({
  "& a": {
    color: visitorColors.primary,
    textDecoration: "underline",
    transition: transitions.medium,

    "&:hover": {
      opacity: 0.8,
    },
  },
});
