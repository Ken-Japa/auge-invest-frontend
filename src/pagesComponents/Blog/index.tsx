"use client";

import { type FC, useState, useMemo, useEffect, lazy, ChangeEvent } from "react";

import { Container, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";

import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { ProgressiveLoad } from "@/components/Feedback/ProgressiveLoad";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { BlogContainer, BlogContent } from "./styled";
import { blogPosts } from "./constants/blogPosts";

const BlogHeader = lazy(() => import('./components/BlogHeader').then(mod => ({ default: mod.BlogHeader })));
const BlogSearch = lazy(() => import('./components/BlogSearch').then(mod => ({ default: mod.BlogSearch })));
const BlogCategories = lazy(() => import('./components/BlogCategories').then(mod => ({ default: mod.BlogCategories })));
const BlogCardList = lazy(() => import('./components/BlogCardList').then(mod => ({ default: mod.BlogCardList })));

const Blog: FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [imageLoaded, setImageLoaded] = useState(false);

    const IMAGE_PROPS = {
        src: "/assets/images/background/BlogHeader.jpg",
        alt: "Imagem de Fundo Blog",
        fill: true,
        priority: true,
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

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredPosts = useMemo(() =>
        blogPosts
            .filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategory === "all" || post.category.includes(selectedCategory);
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [searchQuery, selectedCategory]
    );

    return (
        <BlogContainer>
            <div className="absolute inset-0 w-full h-full background-image">
                <OptimizedImage
                    {...IMAGE_PROPS}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <BlogContent>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <SuspenseWrapper>
                        <BlogHeader isLoading={!imageLoaded} />
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
                                                isLoading={!imageLoaded}
                                            />
                                        </SuspenseWrapper>
                                    </Box>
                                </ProgressiveLoad>

                                <SuspenseWrapper>
                                    <BlogCardList
                                        posts={filteredPosts}
                                        isLoading={!imageLoaded}
                                    />
                                </SuspenseWrapper>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <ProgressiveLoad>
                                    <SuspenseWrapper>
                                        <BlogCategories
                                            selectedCategory={selectedCategory}
                                            onCategoryChange={setSelectedCategory}
                                            isLoading={!imageLoaded}
                                            posts={blogPosts} // Add this prop
                                        />
                                    </SuspenseWrapper>
                                </ProgressiveLoad>
                            </Grid>
                        </Grid>
                    </Container>
                </motion.div>
            </BlogContent>
        </BlogContainer>
    );
};

export default Blog;