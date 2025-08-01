import { Typography, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { ActivityContainer, ActivityList, ActivityItem } from './styled';

// Dados simulados - serão substituídos por dados da API
const mockActivities = {
    real: [
        { id: 1, type: 'buy', asset: 'PETR4', quantity: 100, price: 34.25, date: new Date('2024-01-15') },
        { id: 2, type: 'sell', asset: 'VALE3', quantity: 50, price: 72.80, date: new Date('2024-01-14') },
        { id: 3, type: 'buy', asset: 'ITUB4', quantity: 200, price: 28.45, date: new Date('2024-01-13') },
    ],
    mock: [
        { id: 1, type: 'buy', asset: 'BBAS3', quantity: 150, price: 45.30, date: new Date('2024-01-15') },
        { id: 2, type: 'buy', asset: 'WEGE3', quantity: 80, price: 36.75, date: new Date('2024-01-14') },
        { id: 3, type: 'sell', asset: 'MGLU3', quantity: 300, price: 2.45, date: new Date('2024-01-13') },
    ]
};

interface RecentActivitiesProps {
    type: 'real' | 'mock';
}

export const RecentActivities = ({ type }: RecentActivitiesProps) => {
    const activities = mockActivities[type];

    const getActivityText = (activity: typeof activities[0]) => {
        const action = activity.type === 'buy' ? 'Compra' : 'Venda';
        const value = (activity.quantity * activity.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return `${action} de ${activity.quantity} ${activity.asset} - ${value}`;
    };

    return (
        <ActivityContainer>
            <Typography variant="h4" gutterBottom>
                Atividades Recentes
            </Typography>

            <ActivityList dense>
                {activities.map((activity) => (
                    <ActivityItem key={activity.id}>
                        <ListItemText
                            primary={getActivityText(activity)}
                            secondary={dayjs(activity.date).locale('pt-br').format('DD [de] MMMM')}
                            primaryTypographyProps={{
                                color: activity.type === 'buy' ? 'success.main' : 'error.main'
                            }}
                        />
                    </ActivityItem>
                ))}
            </ActivityList>
        </ActivityContainer>
    );
};