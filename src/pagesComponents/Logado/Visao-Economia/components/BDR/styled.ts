import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const BdrContainer = styled(Box)`
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ControlsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.02)"};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
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

export const VisualizationWrapper = styled(Box)`
  height: 1000px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.02)"};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)"};
    border-radius: 4px;
    &:hover {
      background: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)"};
    }
  }
`;
