import { styled } from "@mui/material/styles";

export const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease-in-out',
    width: '60px',
    height: '60px',
    '& img': {
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto'
    },
    '&:hover': {
        opacity: 0.9
    }
});