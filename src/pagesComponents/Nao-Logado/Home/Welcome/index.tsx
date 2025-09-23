import { type FC, useEffect, useState } from "react";
import Link from "next/link";

import { Stack, Grid, Typography, Container } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MonitorIcon from '@mui/icons-material/Monitor';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { motion } from "framer-motion";

import { CustomButton } from "@/components/Core/Button";
import { MatrixRainText } from "@/components/Effects/MatrixRainText";

import { SectionWelcome } from "./styled";
import { WelcomeSkeleton } from "./WelcomeSkeleton";

interface WelcomeProps {
    isLoading?: boolean;
}
export const Welcome: FC<WelcomeProps> = ({ isLoading }) => {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const hasAnimationPlayed = localStorage.getItem('matrixAnimationPlayed');
        if (!hasAnimationPlayed) {
            setShowAnimation(true);
            localStorage.setItem('matrixAnimationPlayed', 'true');
        }
    }, []);

    const highlights = [
        {
            icon: <MonitorIcon sx={{ fontSize: 40, color: "#0D95F9" }} />,
            title: "Ativos Monitorados",
            value: "+1500",
            description: "Ações, FIIs, ETFs, moedas e até derivativos obscuros – tudo num só lugar"
        },
        {
            icon: <PsychologyIcon sx={{ fontSize: 50, color: "#0D95F9" }} />,
            title: "Previsões com Redes Neurais",
            value: "",
            description: "Análise automática de padrões para identificar oportunidades antes que todos"
        },
        {
            icon: <NotificationsActiveIcon sx={{ fontSize: 50, color: "#0D95F9" }} />,
            title: "Alertas de Preço Cirúrgicos",
            value: "",
            description: "Configure níveis críticos e receba notificações exatas no seu celular ou no email"
        }
    ];

    if (isLoading) {
        return <WelcomeSkeleton />;
    }
    return (
        <SectionWelcome>
            <div className="home">
                <div className="welcome mb-20">
                    <div className="title-left">
                        <MatrixRainText
                            text="Seja bem vindo a"
                            className="text-white"
                        />
                    </div>
                    <div className="title-right">
                        <MatrixRainText
                            text="Auge Invest"
                            className="text-white font-bold text-5xl"
                        />
                    </div>
                </div>

                <div className="content-container">
                    <Container maxWidth="xl">
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Stack spacing={4}>


                                    <Typography variant="h3" className="text-white">
                                        Domine o Mercado com Dados, Não com Palpites
                                    </Typography>

                                    <Typography variant="body1" className="text-white/90">
                                        A única plataforma do Brasil com <span className="text-[#FF6B00] font-bold">histórico de derivativos</span>, simulação de estratégias em cenários reais e fictícios e recomendações através de análises – para você investir como um profissional.
                                    </Typography>

                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Link href="/register">
                                            <CustomButton
                                                value="Experimente Grátis por 21 Dias"
                                                Icon={RocketLaunchIcon}
                                                customColor="#F5F5F5"
                                                textColor="#000000"
                                            />
                                        </Link>
                                        <CustomButton
                                            value="Ver Demonstração em Vídeo"
                                            Icon={PlayCircleIcon}
                                            customColor="#0056b3"
                                        />
                                    </Stack>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Grid container spacing={3}>
                                    {highlights.map((item, index) => (
                                        <Grid item xs={12} md={4} key={index}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.2 }}
                                                className="bg-[#ffffff08] p-6 rounded-lg backdrop-blur-sm border border-white/5 hover:border-[#0D95F9]/30 transition-all"
                                            >
                                                <Stack spacing={2} alignItems="center" textAlign="center">
                                                    {item.icon}
                                                    <Typography variant="h3" className="text-[#0D95F9] font-bold">
                                                        {item.value}
                                                    </Typography>
                                                    <Typography variant="subtitle1" className="text-white">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-white/60">
                                                        {item.description}
                                                    </Typography>
                                                </Stack>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </SectionWelcome>
    );
};