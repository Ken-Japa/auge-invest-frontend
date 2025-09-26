"use client"
import { ReactNode } from "react";

import { usePathname } from "next/navigation";
import { Box } from "@mui/material";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";



type Props = {
    children: ReactNode;
}

export const Layout = ({ children }: Props) => {

    const pathname = usePathname();

    const isLoginPage = pathname === "/login";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {!isLoginPage && (
                <Header />
            )}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};