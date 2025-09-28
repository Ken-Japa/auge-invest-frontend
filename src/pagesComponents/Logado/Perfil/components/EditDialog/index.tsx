import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AnimatePresence,motion } from 'framer-motion';

import { CustomButton } from '@/components/Core/Button';

// Add loading prop to the interface
interface EditDialogProps {
    open: boolean;
    title: string;
    value: string;
    onClose: () => void;
    onSave: (value: string) => void;
    loading?: boolean;
}

export const EditDialog = ({ open, title, value, onClose, onSave, loading = false }: EditDialogProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        onSave(formData.get('value') as string);
    };

    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    open={open}
                    onClose={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Editar {title}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="value"
                                    label={title}
                                    defaultValue={value}
                                    fullWidth
                                    disabled={loading}
                                />
                            </DialogContent>
                            <DialogActions>
                                <CustomButton value="Cancelar" onClick={onClose} color="inherit" disabled={loading} />
                                <CustomButton
                                    value={loading ? "Salvando..." : "Salvar"}
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                />
                            </DialogActions>
                        </form>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};