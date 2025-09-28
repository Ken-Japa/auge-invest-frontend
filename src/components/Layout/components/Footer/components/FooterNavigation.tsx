"use client";

import { Box } from "@mui/material";
import LinkNext from "next/link";
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";

import { authLinks,publicLinks } from "../../../constants/footer";
import { NavigationGrid } from "../styled";

export const FooterNavigation = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <Box className="flex flex-col gap-8">

            <NavigationGrid>

                {session ?
                    authLinks.map((link) => (
                        <LinkNext
                            key={link.href}
                            href={link.href}
                            className={`
                            relative transition-colors duration-200
                            ${pathname === link.href
                                    ? 'text-[#0D95F9] font-medium'
                                    : 'text-white/80 hover:text-white'
                                }
                        `}
                        >
                            {link.label}
                        </LinkNext>
                    ))
                    :
                    publicLinks.map((link) => (
                        <LinkNext
                            key={link.href}
                            href={link.href}
                            className={`
                            relative transition-colors duration-200
                            ${pathname === link.href
                                    ? 'text-[#0D95F9] font-medium'
                                    : 'text-white/80 hover:text-white'
                                }
                        `}
                        >
                            {link.label}
                        </LinkNext>
                    ))
                }

            </NavigationGrid>
        </Box>
    );
};