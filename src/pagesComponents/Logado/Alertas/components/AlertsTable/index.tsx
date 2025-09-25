import { useState } from 'react';
import {
    TableCell,
    TableRow,
    IconButton,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { AlertDialog } from '../AlertDialog';
import { Alert } from '@/services/api/types';
import { useAlerts } from '../../hooks/useAlerts';
import { StyledTable } from '@/components/Data-Display/Table';

export const AlertsTable = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const { alerts, toggleAlert, deleteAlert, loading } = useAlerts();

    const handleEdit = (alert: Alert) => {
        setSelectedAlert(alert);
        setOpenDialog(true);
    };

    const handleToggle = async (alert: Alert) => {
        await toggleAlert(alert._id, 'recurring', !alert.recurring);
    };

    const handleDelete = async (id: string) => {
        await deleteAlert(id);
    };

    const tableHeaders = [
        'Ativo',
        'Tipo',
        'Preço Alvo',
        'Recorrente',
        'Ações'
    ];

    const tableAlignments = [
        'left',
        'center',
        'right',
        'center',
        'center'
    ] as ('left' | 'center' | 'right')[];

    return (
        <>
            <StyledTable
                headers={tableHeaders}
                alignments={tableAlignments}
                showData={alerts.length > 0}
                loading={loading}
                noDataMessage="Nenhum alerta encontrado"
                noDataDescription="Clique em 'Adicionar Alerta' para criar seu primeiro alerta de preço."
            >
                {alerts.map((alert) => (
                    <TableRow key={alert._id}>
                        <TableCell>
                            <Typography variant="body1" component="strong">
                                {alert.asset}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography>
                                {alert.type === 'buy' ? 'Compra' : 'Venda'}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography className="price-value">
                                R$ {alert.targetPrice.toFixed(2)}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Switch
                                checked={alert.recurring}
                                onChange={() => handleToggle(alert)}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <div className="action-buttons">
                                <Tooltip title="Editar">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEdit(alert)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Excluir">
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(alert._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Notificações">
                                    <IconButton
                                        size="small"
                                        color={alert.triggered ? "primary" : "default"}
                                        onClick={() => toggleAlert(alert._id, 'triggered', !alert.triggered)}
                                    >
                                        <NotificationsActiveIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </StyledTable>

            <AlertDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                alert={selectedAlert}
            />
        </>
    );
};