import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const VisualizationWrapper = styled(Box)`
  flex: 1;
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const ContentPlaceholder = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-style: italic;
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.02)"
      : "rgba(0, 0, 0, 0.01)"};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;
