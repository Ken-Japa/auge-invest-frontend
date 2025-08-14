import 'dayjs/locale/pt-br';
import { ActivityContainer, ActivityList, ActivityItem } from './styled';
import { useSearchRecentActivities } from './hooks/searchRecentActivites';
import { Typography, ListItemText, CircularProgress, Box } from '@mui/material';
import dayjs from 'dayjs';

export const RecentActivities = ({ type }: { type: 'real' | 'virtual' }) => {
    const { recentRealActivities, recentVirtualActivities, loading, error } = useSearchRecentActivities();

    const getActivityText = (activity: any) => {
        const isBuy = activity.type === 'buy';
        const actionText = isBuy ? 'Compra' : 'Venda';
        const actionColor = isBuy ? 'success.main' : 'error.main';
        const valueSign = isBuy ? '-' : '+';
        const valueColor = isBuy ? 'error.main' : 'success.main';
        const price = activity.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const formattedValue = (activity.quantity * activity.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return (
            <Typography component="span">
                <Typography component="span" color={actionColor}>
                    {actionText}
                </Typography>
                <Typography component="span" color="text.primary">
                    {` de ${activity.quantity} `}
                    <Typography component="span" fontWeight="bold">
                        {activity.assetCode}
                    </Typography>
                    {` por ${price}. \nTotal: `}
                </Typography>
                <Typography component="span" color={valueColor} fontWeight="bold">
                    {`${valueSign} ${formattedValue}`}
                </Typography>
            </Typography>
        );
    };

    return (
        <ActivityContainer>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                Atividades Recentes
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error">Erro ao carregar atividades: {error}</Typography>
            )}

            {!loading && !error && recentRealActivities.length === 0 && (
                <Typography>Nenhuma atividade recente encontrada.</Typography>
            )}

            {!loading && !error && type === 'real' && recentRealActivities.length > 0 && (
                <>
                    <ActivityList dense>
                        {recentRealActivities.map((activity, index) => (
                            <ActivityItem key={index}>
                                <ListItemText
                                    primary={getActivityText(activity)}
                                    secondary={dayjs(activity.executedAt).locale('pt-br').format('DD [de] MMMM [de] YYYY')}
                                />
                            </ActivityItem>
                        ))}
                    </ActivityList>
                </>
            )}
            {!loading && !error && recentVirtualActivities.length === 0 && (
                <Typography>Nenhuma atividade recente encontrada.</Typography>
            )}
            {!loading && !error && type === 'virtual' && recentVirtualActivities.length > 0 && (
                <>
                    <ActivityList dense>
                        {recentVirtualActivities.map((activity, index) => (
                            <ActivityItem key={index}>
                                <ListItemText
                                    primary={getActivityText(activity)}
                                    secondary={dayjs(activity.executedAt).locale('pt-br').format('DD [de] MMMM [de] YYYY')}
                                />
                            </ActivityItem>
                        ))}
                    </ActivityList>
                </>
            )}
        </ActivityContainer>
    );
};