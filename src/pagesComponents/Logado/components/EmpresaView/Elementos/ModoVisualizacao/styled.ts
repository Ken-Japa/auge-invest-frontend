import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ViewControls = styled(Box)`
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px;
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    background: ${({ theme }) => 
        theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.02)'
    };
`;