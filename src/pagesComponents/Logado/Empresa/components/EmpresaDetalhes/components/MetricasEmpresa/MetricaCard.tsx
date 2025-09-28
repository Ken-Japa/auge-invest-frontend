import { ArrowDropDown,ArrowDropUp } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface MetricaCardProps {
    label: string;
    value: string;
    isPositive?: boolean;
}

export const MetricaCard = ({ label, value, isPositive }: MetricaCardProps) => {
    return (
        <Box sx={{ 
            textAlign: 'center',
            p: 1,
            borderRadius: 1,
            bgcolor: 'background.paper',
            boxShadow: 1
        }}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isPositive !== undefined 
                        ? (isPositive ? 'success.main' : 'error.main')
                        : 'text.primary'
                }}
            >
                {value}
                {isPositive !== undefined && (
                    isPositive ? <ArrowDropUp /> : <ArrowDropDown />
                )}
            </Typography>
        </Box>
    );
};