"use client";

import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import LinkNext from "next/link";

import { Container, Typography, Box, IconButton, Link } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from "framer-motion";

import { Logo } from "../../Logo";
import { FooterNavigation } from "./components/FooterNavigation";
import {
    FooterContainer,
    TopSection,
    MainContent,
    LogoSection,
    NavigationSection,
    SocialSection,
    SectionTitle
} from "./styled";
import { socialLinks } from "../../constants/footer";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    if (isLoading) {
        return (
            <FooterContainer>
                <Container maxWidth="lg">
                </Container>
            </FooterContainer>
        );
    }

    return (
        <FooterContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container
                maxWidth={false}
                disableGutters
            >
                <TopSection>
                    <MainContent>
                        {/* Top Section */}
                        <LogoSection>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {session ?
                                    <Logo width={60} height={60} />
                                    :
                                    <Link href="/">
                                        <Logo width={60} height={60} />
                                    </Link>
                                }
                            </motion.div>

                            <Typography variant="body1" className="text-white/80 mb-2">
                                Inovações tecnológicas com o objetivo de fornecer ao investidor a melhor visão do mercado.
                            </Typography>
                            <Link
                                href="mailto:capitalauge@gmail.com"
                                className="text-white/60 hover:text-white flex items-center justify-center md:justify-end gap-2"
                                underline="hover"
                            >
                                <EmailIcon fontSize="small" />
                                capitalauge@gmail.com
                            </Link>

                        </LogoSection>

                        {/* Middle Section */}
                        <NavigationSection>
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <SectionTitle variant="h6">
                                    Links
                                </SectionTitle>
                                <FooterNavigation />
                            </Box>
                        </NavigationSection>

                        <SocialSection>
                            <Typography variant="h4">
                                Redes Sociais
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <IconButton
                                            key={social.label}
                                            component={LinkNext}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: 'white',
                                                transition: 'transform 0.2s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    transform: 'scale(1.1)'
                                                }
                                            }}
                                        >
                                            <Icon />
                                        </IconButton>
                                    );
                                })}
                            </Box>
                            <LinkNext
                                href="/visitante/embaixadores"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: pathname === '/visitante/embaixadores' ? '#FFD700' : 'rgba(255, 255, 255, 0.8)',
                                    transition: 'color 0.2s'
                                }}
                            >
                                <WorkspacePremiumIcon />
                                <span style={{ fontWeight: 'bold' }}>
                                    Programa de Embaixadores
                                </span>
                            </LinkNext>

                            <LinkNext
                                href="/visitante/em-desenvolvimento"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <span style={{ fontWeight: '200' }}>
                                    Em Desenvolvimento
                                </span>
                            </LinkNext>
                        </SocialSection>

                    </MainContent>

                    {/* Bottom Section */}
                    <Typography
                        variant="body2"
                        className="text-white/60 text-center"
                    >
                        © {currentYear} Auge Capital. Todos os direitos reservados.
                    </Typography>
                </TopSection>
            </Container>
        </FooterContainer >
    );
};