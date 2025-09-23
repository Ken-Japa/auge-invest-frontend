"use client";

import Link from 'next/link';
import { useSession } from "next-auth/react";

import { Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

import { Logo } from "../../Logo";
import { Navbar } from "./Navbar";
import { LoginsButtons } from "./LoginRegisterButtons";
import { PerfilButtons } from "./PerfilButtons";
import { useDrawer } from "../../hooks/useDrawer";
import { HeaderContainer, HeaderContent, DrawerContent } from "./styled";

export const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { isOpen, toggle } = useDrawer();
    const { data: session, status } = useSession();
    const isLoading = status === "loading";


    if (isLoading) {
        return (
            <HeaderContainer>
                <HeaderContent className="container mx-auto">

                </HeaderContent>
            </HeaderContainer>
        );
    }

    return (
        <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
        >
            <HeaderContainer>
                <HeaderContent className="container mx-auto">
                    <div className="flex items-center gap-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            {session ?
                                <Logo width={60} height={60} />
                                :
                                <Link href="/">
                                    <Logo width={60} height={60} />
                                </Link>
                            }
                        </motion.div>

                        {!isMobile && <Navbar />}
                    </div>

                    {isMobile ? (
                        <>
                            <IconButton
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
                            >
                                <DrawerContent>
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
                        <div className="flex items-center">
                            {session ?
                                <PerfilButtons />
                                :
                                <LoginsButtons />
                            }
                        </div>
                    )}
                </HeaderContent>
            </HeaderContainer>
        </motion.div>
    );
};