"use client";

import { type FC } from "react";
import Link from "next/link";
import { Container, Box } from "@mui/material";
import { motion } from "framer-motion";

import { OptimizedImage } from "@/components/Utils/OptimizedImage";

import { PostContainer, PostContent } from "./styled";

import type { BlogPost as BlogPostType } from "../../constants/blogPosts";

import { BlogPostHeader } from "./components/BlogPostHeader";
import { ShareSection } from "./components/ShareSection";
import { RelatedPosts } from "./components/RelatedPosts";
import { BlogMarkdown } from "./components/BlogMarkdown";

interface BlogPostProps {
  post: BlogPostType;
  relatedPostsData: BlogPostType[];
}

const BlogPost: FC<BlogPostProps> = ({ post, relatedPostsData }) => {

  return (
    <PostContainer>
      <div className="absolute inset-0 h-full">
        <OptimizedImage
          src="/assets/images/background/BlogPost.jpg"
          alt="Blog Post Background"
          fill
          priority
          sizes="100vh"
          className="object-cover opacity-15"
          loadingClassName="scale-100 blur-sm"
          quality={85}
        />
      </div>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/75 backdrop-blur-sm rounded-lg p-8"
        >
          <BlogPostHeader post={post} />
          <PostContent>
            <BlogMarkdown content={post.content} />
          </PostContent>

          <ShareSection title={post.title} description={post.description} />
          {relatedPostsData.length > 0 && (
            <RelatedPosts posts={relatedPostsData} />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <Link
              href="/blog"
              className="text-[#0D95F9] hover:text-white transition-colors text-lg font-medium"
            >
              ← Voltar ao Blog
            </Link>
          </Box>
        </motion.div>
      </Container>
    </PostContainer>
  );
};

export default BlogPost;