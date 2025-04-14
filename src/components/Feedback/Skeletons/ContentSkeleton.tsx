import React from 'react';
import { Skeleton, Box } from '@mui/material';

interface ContentSkeletonProps {
  type?: 'text' | 'card' | 'avatar' | 'chart';
  textLines?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
}

export const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  type = 'text',
  textLines = 3,
  height,
  width,
  className = '',
  variant,
}) => {
  const getDefaultHeight = () => {
    switch (type) {
      case 'card':
        return height || 200;
      case 'avatar':
        return height || 40;
      case 'chart':
        return height || 300;
      case 'text':
      default:
        return height || 20;
    }
  };

  const getDefaultWidth = () => {
    switch (type) {
      case 'avatar':
        return width || 40;
      default:
        return width || '100%';
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'avatar':
        return 'circular';
      case 'card':
      case 'chart':
        return 'rectangular';
      case 'text':
      default:
        return variant || 'text';
    }
  };

  if (type === 'text') {
    return (
      <Box className={className} sx={{ width: getDefaultWidth() }}>
        {Array(textLines)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant={getVariant() as any}
              height={getDefaultHeight()}
              width={index === textLines - 1 && textLines > 1 ? '80%' : '100%'}
              sx={{ my: 0.5 }}
              animation="wave"
            />
          ))}
      </Box>
    );
  }

  return (
    <Skeleton
      variant={getVariant() as any}
      height={getDefaultHeight()}
      width={getDefaultWidth()}
      className={className}
      animation="wave"
      sx={{
        transform: 'none',
        transformOrigin: 'center'
      }}
    />
  );
};