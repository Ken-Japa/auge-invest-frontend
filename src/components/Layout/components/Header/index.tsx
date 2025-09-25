"use client";

import Link from 'next/link';
import { useSession } from "next-auth/react";

import { Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Menu as MenuIcon } from "@mui/icons-material";

import { Logo } from "../../Logo";
import { Navbar } from "./Navbar";
import { LoginsButtons } from "./LoginRegisterButtons";
import { PerfilButtons } from "./PerfilButtons";
import { FavoriteButton } from "./PerfilButtons/components/FavoriteButton";
import { AlertButton } from "./PerfilButtons/components/AlertButton";
import { useDrawer } from "../../hooks/useDrawer";
import { HeaderContainer, DrawerContent } from "./styled";
import React, { useRef, useEffect } from 'react';
import { IconButton, Toolbar } from '@mui/material';

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

            <Toolbar className="flex justify-between items-center ">
                {isMobile ? (
                    <>
                        <Logo />
                        <div className="flex items-center">
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
                                onTransitionEnter={handleDrawerOpen}
                            >
                                <DrawerContent ref={drawerContentRef} tabIndex={-1} role="dialog" aria-modal="true">
                                    <Navbar />
                                    <div className="mt-4">
                                        <FavoriteButton />
                                        <AlertButton />
                                        {session ?
                                            <PerfilButtons onButtonClick={toggle} isFullWidth />
                                            :
                                            <LoginsButtons onButtonClick={toggle} isFullWidth />
                                        }
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-32">
                        <Link href="/">
                            <Logo />
                        </Link>
                        <Navbar />
                    </div>
                )}
                {isMobile ? (
                    <></>
                ) : (
                    <div className="flex items-center gap-2">
                        {session ? <> <FavoriteButton /> <AlertButton /> <PerfilButtons /> </> : <LoginsButtons />}
                    </div>
                )}
            </Toolbar>
        </HeaderContainer>
    );
};

export default Header;