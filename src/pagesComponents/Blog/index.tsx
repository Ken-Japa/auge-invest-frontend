"use client";
import { type FC, useState, useMemo, useEffect, lazy, ChangeEvent } from "react";

import { Container, Grid, Box, Pagination } from "@mui/material";
import { motion } from "framer-motion";

import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { ProgressiveLoad } from "@/components/Feedback/ProgressiveLoad";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { BlogContainer, BlogContent } from "./styled";
import { BlogPost } from "./constants/blogPosts";
import { BlogPageSkeleton } from "./components/Skeleton/BlogPageSkeleton";

const BlogHeader = lazy(() => import('./components/BlogHeader').then(mod => ({ default: mod.BlogHeader })));
const BlogSearch = lazy(() => import('./components/BlogSearch').then(mod => ({ default: mod.BlogSearch })));
const BlogCategories = lazy(() => import('./components/BlogCategories').then(mod => ({ default: mod.BlogCategories })));
const BlogCardList = lazy(() => import('./components/BlogCardList').then(mod => ({ default: mod.BlogCardList })));

interface BlogProps {
    posts: BlogPost[];
}

const Blog: FC<BlogProps> = ({ posts }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // Define quantos posts por página

    const IMAGE_PROPS = {
        src: "/assets/images/background/Blog.jpg",
        alt: "Imagem de Fundo Blog",
        fill: true,
        priority: true,
        fetchPriority: "high",
        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw",
        className: "object-cover object-center",
        quality: 70,
    } as const;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            setIsContentLoading(false);
        }
    }, [posts]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredPosts = useMemo(() => {
        const filtered = posts
            .filter(post => {
                const matchesSearch = (post.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                    (post.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategory === "all" || post.category?.includes(selectedCategory);
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

        // Lógica de paginação
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return filtered.slice(indexOfFirstPost, indexOfLastPost);
    }, [searchQuery, selectedCategory, posts, currentPage]);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        // Scroll to top of the blog list when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <BlogContainer>
            {!isContentLoading && (
                <div className="background-image">
                    <OptimizedImage
                        {...IMAGE_PROPS}
                    />
                </div>
            )}
            {isContentLoading ? (
                <BlogPageSkeleton postsPerPage={postsPerPage} />
            ) : (
                <BlogContent>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SuspenseWrapper>
                            <BlogHeader isLoading={isContentLoading} />
                        </SuspenseWrapper>

                        <Container maxWidth="lg" sx={{ py: 8 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={8}>
                                    <ProgressiveLoad>
                                        <Box mb={4}>
                                            <SuspenseWrapper>
                                                <BlogSearch
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                    isLoading={isContentLoading}
                                                />
                                            </SuspenseWrapper>
                                        </Box>
                                    </ProgressiveLoad>

                                    <SuspenseWrapper>

                                        <BlogCardList
                                            posts={filteredPosts}
                                            isLoading={isContentLoading}
                                        />

                                    </SuspenseWrapper>
                                    {totalPages > 1 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                                color="primary"
                                            />
                                        </Box>
                                    )}
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <ProgressiveLoad>
                                        <SuspenseWrapper>
                                            <BlogCategories
                                                selectedCategory={selectedCategory}
                                                onCategoryChange={setSelectedCategory}
                                                isLoading={isContentLoading}
                                                posts={posts}
                                            />
                                        </SuspenseWrapper>
                                    </ProgressiveLoad>
                                </Grid>
                            </Grid>
                        </Container>
                    </motion.div>
                </BlogContent>
            )}
        </BlogContainer>
    );
};

export default Blog;