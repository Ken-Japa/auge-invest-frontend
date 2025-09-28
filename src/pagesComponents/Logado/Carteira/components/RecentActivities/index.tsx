import 'dayjs/locale/pt-br';

import { Box, CircularProgress, Divider,ListItemText, Typography } from '@mui/material';

import { ActivityText, ActivityText2 } from './components/ActivityText';
import { useFocus } from './components/FocusContext/FocusContext';
import { useSearchRecentActivities } from './hooks/searchRecentActivites';
import { ActivityContainer, ActivityItem,ActivityList } from './styled';

export const RecentActivities = ({ type }: { type: 'real' | 'virtual' }) => {
    const { recentRealActivities, recentVirtualActivities, loading, error } = useSearchRecentActivities();
    const { setFocusedItem, focusedWalletId, focusedAssetCode } = useFocus();

    const handleActivityClick = (walletId: string, assetCode: string | null) => {
        if (focusedWalletId === walletId && focusedAssetCode === assetCode) {
            setFocusedItem(null, null)
        } else {
            setFocusedItem(walletId, assetCode);
        }
    };

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
                            <div key={index}>
                                <ActivityItem onClick={() => handleActivityClick(activity.walletId, activity.assetCode)}>
                                    <ListItemText
                                        primary={<ActivityText activity={activity} />}
                                        secondary={<ActivityText2 activity={activity} />}
                                    />
                                </ActivityItem>
                                <Divider component="li" />

                            </div>
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
                            <div key={index}>
                                <ActivityItem onClick={() => handleActivityClick(activity.walletId, activity.positionId)}>
                                    <ListItemText
                                        primary={<ActivityText activity={activity} />}
                                        secondary={<ActivityText2 activity={activity} />}
                                    />
                                </ActivityItem>
                                <Divider component="li" />

                            </div>
                        ))}
                    </ActivityList>
                </>
            )}
        </ActivityContainer>
    );
};