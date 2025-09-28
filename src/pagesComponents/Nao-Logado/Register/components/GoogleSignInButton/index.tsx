import GoogleIcon from '@mui/icons-material/Google';
import { type MouseEvent } from 'react';

import { StyledGoogleButton } from "./styled";

interface GoogleSignInButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => {
    return (
        <StyledGoogleButton
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={onClick}
            aria-label="Continuar com Google"
        >
            Continuar com Google
        </StyledGoogleButton>
    );
};