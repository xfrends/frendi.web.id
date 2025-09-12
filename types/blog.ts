import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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
    content?: BlockObjectResponse[];
};

export type NotionPage = PageObjectResponse;
export type NotionBlock = BlockObjectResponse;

export type BlogPostDetail = BlogPost & {
    content: BlockObjectResponse[];
};