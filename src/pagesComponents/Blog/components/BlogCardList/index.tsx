"use client";

import { useState } from "react";
import { Grid, Pagination, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { ProgressiveLoad } from "@/components/Feedback/ProgressiveLoad";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";
import type { BlogPost } from "../../constants/blogPosts";
import { BlogCard } from "../BlogCard";
import { BlogCardListSkeleton } from "./BlogCardListSkeleton";


interface BlogCardListProps {
    posts: BlogPost[];
    isLoading: boolean;
}

const ITEMS_PER_PAGE = 20;

export const BlogCardList = ({ posts, isLoading }: BlogCardListProps) => {
    const [page, setPage] = useState(1);

    if (isLoading) {
        return <BlogCardListSkeleton />;
    }

    if (posts.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2
            }}>
                <Typography variant="h6" color="text.secondary">
                    Nenhum artigo encontrado
                </Typography>
            </Box>
        );
    }

    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Box>
            <Grid container spacing={3}>
                {currentPosts.map((post, index) => (
                    <Grid item xs={12} key={post.id}>
                        <ProgressiveLoad delay={index * 0.1} rootMargin="100px">
                            <SuspenseWrapper>
                                <BlogCard {...post} isLoading={isLoading} />
                            </SuspenseWrapper>
                        </ProgressiveLoad>
                    </Grid>
                ))}
            </Grid>


            {totalPages > 1 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4,
                    '& .MuiPagination-ul': {
                        gap: 1
                    }
                }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        siblingCount={1}
                        boundaryCount={1}
                        sx={{

                            '& .MuiPaginationItem-root': {
                                color: 'white',
                                '&.Mui-selected': {
                                    backgroundColor: '#0D95F9'
                                },
                                '&.MuiPaginationItem-firstLast': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                }
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};