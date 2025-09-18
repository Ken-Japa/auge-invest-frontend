"use client"
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SkipLinks } from "./SkipLinks";

type Props = {
    children: ReactNode;
}

export const Layout = ({ children }: Props) => {
    const { data: session } = useSession();

    return (
        <>
            <SkipLinks />
            <Header />
            <main id="main-content" role="main" className="border-t border-b border-infoContrastText">
                {children}
            </main>
            <Footer />
        </>
    );
}
