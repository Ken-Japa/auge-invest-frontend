import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

export const FooterContainer = styled(motion.footer)`
  background-color: #111111;
  padding: 4rem 0;
  width: 100%;
`;

export const TopSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const NavigationGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    gap: 1.5rem;
  }
`;

export const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    & > * {
      flex: 1;
      max-width: 350px;
    }
  }
`;

export const LogoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  max-width: 300px;

  margin-right: 2rem;
  @media (min-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const NavigationSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 600px;
    margin: 0 2rem;
  }
`;

export const SocialSection = styled(Box)`
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  min-width: 250px;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const SectionTitle = styled(Typography)`
  color: white;
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: #0d95f9;
    opacity: 0.8;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 60px;
  }
`;
