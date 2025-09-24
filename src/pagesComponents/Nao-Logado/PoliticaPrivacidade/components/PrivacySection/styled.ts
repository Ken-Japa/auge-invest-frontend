import { styled } from "@mui/material/styles";

export const SectionContainer = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  padding: "24px",
  borderRadius: "8px",
  marginBottom: "24px",

  "& .section-title": {
    fontSize: "1.5rem",
    color: "#0D95F9",
    marginBottom: "20px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },

  "& .section-content": {
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 1.7,

    "& p": {
      marginBottom: "16px",

      "&:last-child": {
        marginBottom: 0,
      },
    },

    "& a": {
      color: "#0D95F9",
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));
