import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogMarkdownProps {
    content: string | null;
}

export const BlogMarkdown = ({ content }: BlogMarkdownProps) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            table: ({ node, ...props }) => (
                <table className="w-full border-collapse mb-4" {...props} />
            ),
            thead: ({ node, ...props }) => (
                <thead className="bg-white/5" {...props} />
            ),
            th: ({ node, ...props }) => (
                <th className="border border-white/10 p-2 text-left" {...props} />
            ),
            td: ({ node, ...props }) => (
                <td className="border border-white/10 p-2" {...props} />
            ),
        }}
    >
        {content}
    </ReactMarkdown>
);