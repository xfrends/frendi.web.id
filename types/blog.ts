export type BlogPost = {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    coverImage?: string;
    description: string;
    author: string;
    tags: string[];
    publishedAt: string;
    metaTitle?: string;
    metaDescription?: string;
    authorEmail?: string;
    createdAt?: string;
    updatedAt?: string;
    content?: string;
};

export type BlogPostDetail = BlogPost & {
    content: string;
};
