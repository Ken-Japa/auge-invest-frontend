"use client";

import Link from 'next/link';
import { useSession } from "next-auth/react";

import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

import { Logo } from "../../Logo";
import { Navbar } from "./Navbar";
import { LoginsButtons } from "./LoginRegisterButtons";
import { PerfilButtons } from "./PerfilButtons";
import { useDrawer } from "../../hooks/useDrawer";
import { HeaderContainer, HeaderContent, DrawerContent } from "./styled";
import React, { useRef, useEffect } from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';

export const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { isOpen, toggle } = useDrawer();
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const iconButtonRef = useRef<HTMLButtonElement>(null);
    const drawerContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMobile && isOpen) {
            toggle();
        }
    }, [isMobile, isOpen, toggle]);

    const handleDrawerOpen = () => {
        if (drawerContentRef.current) {
            drawerContentRef.current.focus();
        }
    };

    const handleDrawerClose = () => {
        if (iconButtonRef.current) {
            iconButtonRef.current.focus();
        }
    };

    return (
        <HeaderContainer>
            <Toolbar className="flex justify-between items-center w-full">
                <Logo />
                <div className="flex items-center">
                    {isMobile ? (
                        <>
                            <IconButton
                                ref={iconButtonRef}
                                color="inherit"
                                aria-label="open menu"
                                edge="start"
                                onClick={toggle}
                                className="text-white bg-[#1A1A1A]"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={isOpen}
                                onClose={toggle}
                                ModalProps={{ keepMounted: true }}
                                onTransitionExited={handleDrawerClose}
                            >
                                <DrawerContent ref={drawerContentRef} tabIndex={-1}>
                                    <Navbar />
                                    <div className="mt-4">
                                        {session ?
                                            <PerfilButtons onButtonClick={toggle} isFullWidth />
                                            :
                                            <LoginsButtons onButtonClick={toggle} isFullWidth />
                                        }
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </>
                    ) : (
                        <>
                            <Navbar />
                            {session ? <PerfilButtons /> : <LoginsButtons />}
                        </>
                    )}
                </div>
            </Toolbar>
        </HeaderContainer>
    );
};

export default Header;