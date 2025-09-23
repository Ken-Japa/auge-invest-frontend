import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { useSnackbar } from 'notistack';

interface ShareSectionProps {
    title: string;
    description?: string;
}

export const ShareSection = ({ title, description }: ShareSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url,
                });
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    enqueueSnackbar('Error sharing the article', { variant: 'error' });
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                enqueueSnackbar('Link copied to clipboard!', { variant: 'success' });
            } catch (err) {
                enqueueSnackbar('Error copying to clipboard', { variant: 'error' });
            }
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            marginTop: '2rem'
        }}>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Compartilhar artigo:
            </Typography>
            <Tooltip title="Compartilhar">
                <IconButton
                    onClick={handleShare}
                    sx={{
                        color: '#0D95F9',
                        '&:hover': {
                            color: 'white',
                        }
                    }}
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};