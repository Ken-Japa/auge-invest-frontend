import { Box, styled } from "@mui/material";

export const BlogContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 0,

  .background-image {
    position: 'absolute';
    z-index: 0;
    bottom: 0;
    height: 100vh;
    zIndex: -1,
  }
`;

export const BlogContent = styled(Box)`
  position: relative;
  z-index: 1;
   flex: 1,
  width: '100%',
  min-height: 100vh;
  padding: 2rem 0;
  padding-bottom: 112px;
`;
