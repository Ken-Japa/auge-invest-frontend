import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { transitions } from '@/theme/variables';

interface PageBackgroundProps {
  children: ReactNode;
  imageName: string;
  opacity?: number;
}

const BackgroundContainer = styled('div')<{ imageName: string; opacity: number }>(({ theme, imageName, opacity }) => ({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? `url("/assets/images/background/${imageName}-Dark.jpg")`
        : `url("/assets/images/background/${imageName}-Light.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    opacity: theme.palette.mode === 'dark' ? opacity * 0.75 : opacity,
    zIndex: -1,
    transition: transitions.medium,
  },
}));

export const PageBackground = ({ children, imageName, opacity = 0.4 }: PageBackgroundProps) => {
  return (
    <BackgroundContainer imageName={imageName} opacity={opacity}>
      {children}
    </BackgroundContainer>
  );
};