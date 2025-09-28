import SendIcon from '@mui/icons-material/Send';
import { type FC } from 'react';

import { StyledSubmitButton } from './styled';

interface SubmitButtonProps {
    isSubmitting: boolean;
    isBlocked: boolean;
    blockTimer: number;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ isSubmitting, isBlocked, blockTimer }) => (
    <StyledSubmitButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isSubmitting || isBlocked}
        endIcon={<SendIcon />}
    >
        {isSubmitting ? 'Enviando...' :
            isBlocked ? `Aguarde ${blockTimer}s` :
                'Enviar Candidatura'}
    </StyledSubmitButton>
);