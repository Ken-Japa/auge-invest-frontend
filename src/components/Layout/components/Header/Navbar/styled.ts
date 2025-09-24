import { styled } from "@mui/material/styles";

export const LinkNavbar = styled('a')(({ theme }) => ({    
    border: '1px solid transparent',
    padding: '4px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    ':hover': {
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `1px 1px 6px ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    }
}));

export const MobileNavContainer = styled('div')`
    @media (max-width: 768px) {
        position: fixed;
        top: 64px;
        right: 0;
        width: auto;
        min-width: 200px;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(10px);
        padding: 1rem;
        z-index: 50;
        border-radius: 0 0 0 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-right: 1rem;

        nav {
            align-items: flex-end;
        }

        a {
            text-align: right;
            white-space: nowrap;
        }
    }
`;