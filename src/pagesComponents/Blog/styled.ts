import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BlogContainer = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    z-index: -1;
  }
`;

export const BlogContent = styled(Box)`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  padding: 2rem 0;
  padding-bottom: 112px;
`;
