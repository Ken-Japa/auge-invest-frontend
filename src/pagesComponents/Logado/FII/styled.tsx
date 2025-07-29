import { Box, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FIIPageContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    position: "relative",
    padding: theme.spacing(4, 2),
    marginTop: "-64px",

    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: theme.palette.mode === 'dark'
            ? 'url("/assets/images/background/FII-Dark.jpg")'
            : 'url("/assets/images/background/FII-Light.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        opacity: 0.15,
        zIndex: -1,
    }
}));

export const ContentWrapper = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
}));

export const ContentBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    alignItems: 'center',
}));

export const FIITitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
}));

export const FIITabsContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(19, 47, 76, 0.8)'
        : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)'
        }`,
    boxShadow: theme.shadows[3],
}));

export const TabPanelContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));