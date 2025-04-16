"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container, Typography, Box } from "@mui/material";
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { PageTransition } from '@/components/Utils/PageTransition';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { ativosList } from "./constants";
import {
    AtivosPageContainer,
    AtivosHeader,
    AtivosGrid,
    AtivoCard,
    CardContent,
    CardIcon,
    CardTitle,
    CardDescription,
    ComingSoonBadge
} from "./styled";


export const AtivosPage = () => {
    const router = useRouter();

    const handleCardClick = (path: string, available: boolean) => {
        if (available) {
            router.push(path);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <AtivosPageContainer>
                            <Container maxWidth="lg">
                                <AtivosHeader>
                                    <Typography variant="h1" component="h1" className="text-gradient">
                                        Ativos
                                    </Typography>
                                    <Typography variant="h4" component="p" className="subtitle">
                                        Explore diferentes classes de ativos e encontre as melhores oportunidades de investimento
                                    </Typography>
                                </AtivosHeader>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid-container"
                                >
                                    <AtivosGrid>
                                        {ativosList.map((ativo) => (
                                            <motion.div key={ativo.id} variants={itemVariants}>
                                                <AtivoCard
                                                    onClick={() => handleCardClick(ativo.path, ativo.available)}
                                                    available={ativo.available}
                                                    whileHover={{ y: -8, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <CardContent>
                                                        <CardIcon>
                                                            <ativo.icon fontSize="large" />
                                                        </CardIcon>
                                                        <CardTitle>{ativo.title}</CardTitle>
                                                        <CardDescription>{ativo.description}</CardDescription>

                                                        {!ativo.available && (
                                                            <ComingSoonBadge>
                                                                Em breve
                                                            </ComingSoonBadge>
                                                        )}
                                                    </CardContent>
                                                </AtivoCard>
                                            </motion.div>
                                        ))}
                                    </AtivosGrid>
                                </motion.div>
                            </Container>
                        </AtivosPageContainer>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};

export default AtivosPage;