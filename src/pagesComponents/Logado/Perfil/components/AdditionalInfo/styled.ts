import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { transitions } from "@/theme/variables";

export const ProfileCard = styled(Paper)`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
`;

export const ProfileInfo = styled(Box)`
  padding: 0 1rem 1rem;
`;

export const ProfileSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"};

  &:last-child {
    border-bottom: none;
  }
`;

export const ProfileLabel = styled("span")`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const ProfileValue = styled("span")`
  flex-grow: 1;
  margin-left: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;
export const HeaderContainer = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  transition: transitions.medium,
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.1rem",
  margin: 0,
  variant: "h6",
}));
