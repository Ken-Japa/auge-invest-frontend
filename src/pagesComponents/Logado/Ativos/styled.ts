import { styled } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

export const AtivosPageContainer = styled(Box)`
  min-height: calc(100vh - 200px);
  padding: 2rem 0 4rem; // Reduced top padding to move content up
  background: ${({ theme }) => theme.palette.background.default};
  
  .text-gradient {
    background: linear-gradient(90deg, #0D95F9 0%, #8411CC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 1rem;
    font-weight: 700;
    text-align: center;
  }
  
  .subtitle {
    color: ${({ theme }) => theme.palette.text.secondary};
    text-align: center;
    max-width: 800px;
    margin: 0 auto 2rem; // Reduced bottom margin
    font-weight: 400;
    line-height: 1.6;
  }
  
  .grid-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const AtivosHeader = styled(Box)`
  margin-bottom: 2rem; // Reduced bottom margin
  text-align: center;
  padding-top: 1rem; // Added top padding to move title up
`;

export const AtivosGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1200px; // Added max-width to help with centering
  margin: 0 auto; // Center the grid
  
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr); // Changed to 3 columns for better centering
  }
`;

export const AtivoCard = styled(motion.div)<{ available: boolean }>`
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "linear-gradient(145deg, rgba(26, 34, 52, 0.8), rgba(26, 34, 52, 0.6))"
      : "linear-gradient(145deg, #ffffff, #f5f8fa)"};
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  cursor: ${({ available }) => (available ? "pointer" : "default")};
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)"};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: ${({ available }) => (available ? 1 : 0.7)};

  &:hover {
    border-color: ${({ theme, available }) =>
      available ? theme.palette.primary.main : "rgba(255, 255, 255, 0.1)"};
  }
`;

export const CardContent = styled(Box)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

export const CardIcon = styled(Box)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #0d95f9 0%, #8411cc 100%);
  color: white;
  box-shadow: 0 10px 20px rgba(13, 149, 249, 0.3);
`;

export const CardTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const CardDescription = styled(Typography)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const ComingSoonBadge = styled(Box)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(255, 152, 0, 0.3);
`;
