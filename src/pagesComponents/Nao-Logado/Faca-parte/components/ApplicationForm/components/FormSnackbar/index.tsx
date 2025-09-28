import CloseIcon from '@mui/icons-material/Close';
import { type FC, useEffect, useState } from 'react';

import { SnackbarStyled } from './styled';

type Severity = 'success' | 'error' | 'info' | 'warning';

interface FormSnackbarProps {
    open: boolean;
    message: string;
    severity: Severity;
    onClose: () => void;
    autoHideDuration?: number;
}

export const FormSnackbar: FC<FormSnackbarProps> = ({
    open,
    message,
    severity,
    onClose,
    autoHideDuration = 5000
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }, autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [open, autoHideDuration, onClose]);

    if (!open && !isVisible) return null;

    return (
        <SnackbarStyled
            className={`${severity}`}
            isVisible={isVisible}
        >
            <div>{message}</div>
            <CloseIcon
                className="close-button"
                fontSize="small"
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
            />
        </SnackbarStyled>
    );
};