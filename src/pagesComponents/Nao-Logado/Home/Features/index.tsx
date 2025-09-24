import { type FC, useState } from 'react';
import { Stack, Box, Container, Typography, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import dynamic from "next/dynamic";
import { OptimizedImage } from "@/components/Utils/OptimizedImage";

import { FEATURES_DATA, ICON_STYLES } from './constants';
import { FeaturesSkeleton } from "./FeaturesSkeleton";

interface FeaturesProps {
    isLoading?: boolean;
}

const DynamicMatrixRainText = dynamic(() => import("@/components/Effects/MatrixRainText").then(mod => mod.MatrixRainText), {
    ssr: false,
    loading: () => <span className="title">Carregando...</span>,
});

export const Features: FC<FeaturesProps> = ({ isLoading }) => {
    const [activeFeature, setActiveFeature] = useState(0);

    if (isLoading) {
        return <FeaturesSkeleton />;
    }

    return (
        <Container maxWidth="xl">
            <Box className="text-center mb-12">
                <Stack className="gap-2">
                    <DynamicMatrixRainText
                        text="Por que escolher a Auge Invest?"
                        className="text-4xl font-bold text-white mb-4"
                    />
                    <Typography variant="h4" className="text-white/70">
                        Tecnologia de Hedge Fund, Preço de Startup
                    </Typography>
                </Stack>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="relative h-[500px] rounded-xl overflow-hidden"
                        >
                            <OptimizedImage
                                src={FEATURES_DATA[activeFeature].image}
                                alt={FEATURES_DATA[activeFeature].title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover w-full h-full"
                                loadingClassName="scale-100 blur-lg grayscale"
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <Typography variant="h4" className="text-white mb-3">
                                    {FEATURES_DATA[activeFeature].title}
                                </Typography>
                                <Typography className="text-white/70 mb-4">
                                    {FEATURES_DATA[activeFeature].description}
                                </Typography>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={3}>
                        {FEATURES_DATA.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Grid item xs={12} key={index}>
                                    <motion.div
                                        className={`p-6 rounded-xl cursor-pointer transition-all ${activeFeature === index
                                            ? 'bg-[#0D95F9]/10 border border-[#0D95F9]/30'
                                            : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                        onClick={() => setActiveFeature(index)}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg bg-white/5">
                                                <Icon sx={ICON_STYLES} />
                                            </div>
                                            <div>
                                                <Typography variant="h5" className="text-white mb-2">
                                                    {feature.title}
                                                </Typography>
                                                <Typography className="text-white/70 mb-3">
                                                    {feature.description}
                                                </Typography>
                                                {activeFeature === index && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="flex gap-2 flex-wrap"
                                                    >
                                                        {feature.highlights.map((highlight, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-3 py-1 rounded-full bg-[#0969A6]/20 text-[#52BCFF] text-sm"
                                                            >
                                                                {highlight}
                                                            </span>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};