import { useState } from 'react';
import AddAlertIcon from '@mui/icons-material/AddAlert';

import { AlertDialog } from '../AlertDialog';
import { CustomButton } from '@/components/Core/Button';

interface AddAlertButtonProps {
    refreshAlerts: () => void;
}

export const AddAlertButton = ({ refreshAlerts }: AddAlertButtonProps) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddAlert = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <CustomButton
                variant="contained"
                startIcon={<AddAlertIcon />}
                onClick={handleAddAlert}
            >
                Adicionar Alerta
            </CustomButton>

            <AlertDialog
                open={openDialog}
                onClose={handleCloseDialog}
                alert={null}
                refreshAlerts={refreshAlerts}
            />
        </>
    );
};