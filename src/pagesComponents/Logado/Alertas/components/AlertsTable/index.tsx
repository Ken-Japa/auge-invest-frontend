import { useState } from 'react';
import {
    TableCell,
    TableRow,
    IconButton,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { AlertDialog } from '../AlertDialog';
import { Alert } from '@/services/api/types';
import { StyledTable } from '@/components/Data-Display/Table';

interface AlertsTableProps {
    alerts: Alert[];
    loading: boolean;
    error: string | null;
    refreshAlerts: () => void;
    toggleAlert: (id: string, field: 'recurring' | 'triggered', value: boolean) => Promise<void>;
    deleteAlert: (id: string) => Promise<void>;
}

export const AlertsTable = ({
    alerts,
    loading,
    error,
    refreshAlerts,
    toggleAlert,
    deleteAlert,
}: AlertsTableProps) => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

    const handleEdit = (alert: Alert) => {
        setSelectedAlert(alert);
        setOpenDialog(true);
    };

    const handleToggle = async (alert: Alert) => {
        await toggleAlert(alert._id, 'recurring', !alert.recurring);
        refreshAlerts();
    };

    const handleDelete = async (id: string) => {
        await deleteAlert(id);
        refreshAlerts();
    };

    const tableHeaders = [
        'Ativo',
        'Tipo',
        'Preço Alvo',
        'Recorrente',
        'Criado em',
        'Ações'
    ];

    const tableAlignments = [
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
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
                        <TableCell align="center">
                            <Typography variant="body1" component="strong">
                                {alert.asset}
                            </Typography>
                            {alert.comments && alert.comments.trim() !== '' && (
                                <Typography variant="caption" display="block" color="textSecondary">
                                    {alert.comments}
                                </Typography>
                            )}
                        </TableCell>
                        <TableCell align="center">
                            <Typography style={{ color: alert.type === 'buy' ? theme.palette.success.main : theme.palette.error.main }}>
                                {alert.type === 'buy' ? 'Compra' : 'Venda'}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
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
                            <Typography>
                                {alert.createdAt ? new Date(alert.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'N/A'}
                            </Typography>
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
                                        onClick={async () => {
                                            await toggleAlert(alert._id, 'triggered', !alert.triggered);
                                            refreshAlerts();
                                        }}
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
                refreshAlerts={refreshAlerts}
            />
        </>
    );
};