// Initial content for WalletItem.tsx
import React from 'react';
import { useState } from 'react';
import { Box, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, Add as AddIcon } from '@mui/icons-material';
import { Wallet } from '@/services/api/types';

import { AddTransactionDialog } from '../AddTransactionDialog';


interface WalletItemProps {
    wallet: Wallet;
    expanded: boolean;
    onAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onEdit: (wallet: Wallet) => void;
    onDelete: (walletId: string) => void;
}

export const WalletItem: React.FC<WalletItemProps> = ({
    wallet,
    expanded,
    onAccordionChange,
    onEdit,
    onDelete,
}) => {
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
    return (
        <Accordion expanded={expanded} onChange={onAccordionChange(wallet._id)} key={wallet._id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${wallet._id}-content`}
                id={`panel-${wallet._id}-header`}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        {wallet.name}
                        <Typography variant="body2" color="text.secondary">
                            {wallet.description}
                        </Typography>
                    </Typography>

                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
                    <IconButton
                        aria-label="edit"
                        onClick={() => onEdit(wallet)}
                        size="small"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => onDelete(wallet._id)}
                        size="small"
                        color="error"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{ mb: 2, alignItems: 'right' }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedPosition(wallet._id);
                            setIsAddTransactionOpen(true);
                        }}
                    >
                        Cadastrar Operação
                    </Button>
                </Box>
                <AddTransactionDialog
                    open={isAddTransactionOpen}
                    onClose={() => setIsAddTransactionOpen(false)}
                    positionId={selectedPosition}
                    userId={wallet.userId}
                />
            </AccordionDetails>
        </Accordion>

    );
};