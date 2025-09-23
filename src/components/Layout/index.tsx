"use client"
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";


type Props = {
    children: ReactNode;
}

export const Layout = ({ children }: Props) => {
    const { data: session } = useSession();

    return (
        <>
            <Header />
            <div className="border-t border-b border-infoContrastText">
                {children}
            </div>
            <Footer />
        </>
    );
}