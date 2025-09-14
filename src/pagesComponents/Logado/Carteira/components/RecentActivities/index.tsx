import 'dayjs/locale/pt-br';
import { ActivityContainer, ActivityList, ActivityItem } from './styled';
import { useSearchRecentActivities } from './hooks/searchRecentActivites';
import { Typography, ListItemText, CircularProgress, Box, Divider } from '@mui/material';
import { ActivityText, ActivityText2 } from './components/ActivityText';

export const RecentActivities = ({ type }: { type: 'real' | 'virtual' }) => {
    const { recentRealActivities, recentVirtualActivities, loading, error } = useSearchRecentActivities();

    return (
        <ActivityContainer>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                Atividades Recentes
            </Typography>
            <Divider />

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error">Erro ao carregar atividades: {error}</Typography>
            )}

            {!loading && !error && type === 'real' && recentRealActivities.length === 0 && (
                <Typography>Nenhuma atividade recente encontrada.</Typography>
            )}

            {!loading && !error && type === 'real' && recentRealActivities.length > 0 && (
                <>
                    <ActivityList dense>
                        {recentRealActivities.map((activity, index) => (
                            <ActivityItem key={index}>
                                <ListItemText
                                    primary={<ActivityText activity={activity} />}
                                    secondary={<ActivityText2 activity={activity} />}
                                />
                            </ActivityItem>
                        ))}
                    </ActivityList>
                </>
            )}
            {!loading && !error && type === 'virtual' && recentVirtualActivities.length === 0 && (
                <Typography>Nenhuma atividade recente encontrada.</Typography>
            )}
            {!loading && !error && type === 'virtual' && recentVirtualActivities.length > 0 && (
                <>
                    <ActivityList dense>
                        {recentVirtualActivities.map((activity, index) => (
                            <ActivityItem key={index}>
                                <ListItemText
                                    primary={<ActivityText activity={activity} />}
                                    secondary={<ActivityText2 activity={activity} />}
                                />

                            </ActivityItem>

                        ))}
                    </ActivityList>
                </>
            )}
        </ActivityContainer>
    );
};