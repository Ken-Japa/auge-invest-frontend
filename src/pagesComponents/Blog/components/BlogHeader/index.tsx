import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { BlogHeaderSkeleton } from "./BlogHeaderSkeleton";
import { HeaderContainer, HeaderContent } from "./styled";

interface BlogHeaderProps {
    isLoading?: boolean;
}
export const BlogHeader = ({ isLoading }: BlogHeaderProps) => {
    if (isLoading) {
        return <BlogHeaderSkeleton />;
    }
    return (
        <HeaderContainer>
            <Container maxWidth="lg">
                <HeaderContent>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#0D95F9',
                                marginBottom: '3rem'
                            }}
                        >
                            Blog Auge Invest
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.3rem', md: '1.25rem' },
                                color: 'rgba(255, 255, 255, 0.8)',
                                maxWidth: '32rem',
                                margin: '0 auto'
                            }}
                        >
                            Análises, insights e estratégias para você tomar as melhores decisões no mercado financeiro.
                        </Typography>
                    </motion.div>
                </HeaderContent>
            </Container>
        </HeaderContainer>
    );
};