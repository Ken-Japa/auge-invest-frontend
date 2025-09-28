import { useState } from 'react';

import { CustomButton } from '@/components/Core/Button';
import { useApi } from '@/providers/ApiProvider';

import { AlertDialog } from '../AlertDialog';

interface AddAlertButtonProps {
    refreshAlerts: () => void;
}

export const AddAlertButton = ({ refreshAlerts }: AddAlertButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleAddAlert = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <CustomButton onClick={handleAddAlert} variant="contained">
                Adicionar Alerta
            </CustomButton>
            <AlertDialog
                open={open}
                onClose={handleCloseDialog}
                alert={null}
                refreshAlerts={refreshAlerts}
            />
        </>
    );
};