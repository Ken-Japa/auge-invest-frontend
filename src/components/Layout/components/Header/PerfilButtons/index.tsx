import { useState } from 'react';
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { clearAuthData } from '@/utils/auth';

import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from "framer-motion";

interface AuthButtonsProps {
    onButtonClick?: () => void;
    isFullWidth?: boolean;
}


export const PerfilButtons = ({ onButtonClick, isFullWidth }: AuthButtonsProps) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <motion.div
            className={`flex gap-4 ${isFullWidth ? 'w-full' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div>
                <IconButton
                    onClick={handleMenu}
                    sx={{
                        padding: 0,
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'inherit',
                    }}
                    aria-label="account menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                >
                    <Avatar
                        alt={session?.user?.name || 'User'}
                        sx={{
                            color: theme.palette.mode === 'light' ? 'text.primary' : 'inherit',
                        }}
                    >
                        {session?.user?.name?.[0] || 'U'}
                    </Avatar>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255)' : 'rgba(33, 33, 33, 0.95)',
                            color: theme.palette.mode === 'light' ? 'text.primary' : 'inherit',
                        }
                    }}
                >
                    <MenuItem component={Link} href="/perfil" onClick={handleClose}>
                        Perfil
                    </MenuItem>

                    <MenuItem component={Link} href="/perfil/configuracoes" onClick={handleClose}>
                        Configurações
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        clearAuthData();
                        signOut({ callbackUrl: '/' });
                    }}>
                        Sair
                    </MenuItem>
                </Menu>
            </div>

        </motion.div>
    );
};