import { Avatar, Box } from '@mui/material';
import React, { useEffect,useState } from 'react';

import { OptimizedImage } from '@/components/Utils/OptimizedImage';

import { getBestCompanyLogoPath } from '../../utils/imageUtils';


interface CompanyAvatarProps {
  companyName: string;
  size?: number;
  showFallback?: boolean;
}

export const CompanyAvatar: React.FC<CompanyAvatarProps> = ({
  companyName,
  size = 60,
  showFallback = true
}) => {
  const [imagePath, setImagePath] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadImage = async () => {
      try {
        const bestPath = await getBestCompanyLogoPath(companyName);
        if (isMounted) {
          setImagePath(bestPath);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setImagePath("");
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [companyName]);

  // If no image is available or still loading, show fallback avatar
  if (!imagePath || loading) {
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: '#1a2234',
          fontSize: size * 0.4,
          fontWeight: 'bold',
        }}
      >
        {showFallback ? companyName.charAt(0).toUpperCase() : null}
      </Avatar>
    );
  }

  // If image is available, use OptimizedImage
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <OptimizedImage
        src={imagePath}
        alt={`${companyName} logo`}
        fill
        sizes={`${size}px`}
        style={{
          objectFit: 'cover',
        }}
        priority
        quality={90}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTIyMzQiLz48L3N2Zz4="
      />
    </Box>
  );
};