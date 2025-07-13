import { useState } from 'react';
import AddAlertIcon from '@mui/icons-material/AddAlert';

import { AlertDialog } from '../AlertDialog';
import { CustomButton } from '@/components/Core/Button';

export const AddAlertButton = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddAlert = () => {
        setOpenDialog(true);
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
                onClose={() => setOpenDialog(false)}
                alert={null}
            />
        </>
    );
};