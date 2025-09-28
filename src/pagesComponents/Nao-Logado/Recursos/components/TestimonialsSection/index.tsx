import { Divider,Grid, Stack, Typography } from "@mui/material";
import { motion } from 'framer-motion';

import { visitorColors } from "@/theme/palette/visitor";

import { TESTIMONIALS } from "../../constants/testimonials";
import { TestimonialCard } from "./styled";
import { TestimonialsSkeleton } from "./TestimonialsSkeleton";

interface TestimonialsSectionProps {
    isLoading?: boolean;
}

export const TestimonialsSection = ({ isLoading }: TestimonialsSectionProps) => {
    if (isLoading) {
        return <TestimonialsSkeleton />;
    }
    return (
        <div className="w-full my-8">
            <Stack spacing={4} alignItems="center">
                <Typography
                    variant="h3"
                    className="text-center"
                    sx={{ color: visitorColors.text }}
                    component={motion.h2}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    O que nossos usuários dizem:
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <TestimonialCard>
                                    <Typography className="testimonial-text">
                                        &quot;{testimonial.comment}&quot;
                                    </Typography>
                                    <Divider sx={{ bgcolor: visitorColors.divider, my: 2 }} />
                                    <Typography className="testimonial-author">
                                        {testimonial.name}
                                    </Typography>
                                    <Typography className="testimonial-role">
                                        {testimonial.role}
                                    </Typography>
                                </TestimonialCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </div>
    );
};