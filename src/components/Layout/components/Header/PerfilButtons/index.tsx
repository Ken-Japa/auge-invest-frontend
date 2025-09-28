import { Avatar,IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut,useSession } from 'next-auth/react';
import { useState } from 'react';

import { clearAuthData } from '@/utils/auth';

interface AuthButtonsProps {
    onButtonClick?: () => void;
    isFullWidth?: boolean;
}


export const PerfilButtons = ({ onButtonClick, isFullWidth }: AuthButtonsProps) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const router = useRouter();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path: string) => {
        handleClose();
        if (onButtonClick) {
            onButtonClick();
        }
        router.push(path);
    };

    const handleLogout = () => {
        handleClose();
        if (onButtonClick) {
            onButtonClick();
        }
        clearAuthData();
        signOut({ callbackUrl: '/' });
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
                    <MenuItem onClick={() => handleMenuItemClick("/perfil")}>
                        Perfil
                    </MenuItem>

                    <MenuItem onClick={() => handleMenuItemClick("/perfil/configuracoes")}>
                        Configurações
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        Sair
                    </MenuItem>
                </Menu>
            </div>

        </motion.div>
    );
};