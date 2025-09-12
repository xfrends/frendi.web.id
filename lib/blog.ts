import { BlogPost, BlogPostDetail, NotionPage } from '@/types/blog';
import { getBlocks, getDatabase, getPage, getPageIdBySlug } from './notion';
import { BlockObjectResponse, PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface DatabasePageProperties {
  Title: {
    id: string;
    type: 'title';
    title: Array<{
      plain_text: string;
    }>;
  };
  Slug: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Thumbnail: {
    id: string;
    type: 'files';
    files: Array<{
      file: {
        url: string;
      };
    }>;
  };
  CoverImage: {
    id: string;
    type: 'files';
    files: Array<{
      file: {
        url: string;
      };
    }>;
  };
  Summary: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Author: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Tags: {
    id: string;
    type: 'multi_select';
    multi_select: Array<{
      name: string;
    }>;
  };
  'Publication Date': {
    id: string;
    type: 'date';
    date: {
      start: string;
    };
  };
  'Post Status': {
    id: string;
    type: 'select';
    select: {
      name: string;
    };
  };
}

interface DatabasePage extends PageObjectResponse {
  properties: DatabasePageProperties;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const pages = await getDatabase();
  if (!Array.isArray(pages)) {
    console.error('Expected pages array but got:', typeof pages);
    return [];
  }
  return pages.map((page: any) => {
    const properties = page.properties;
    return {
      id: page.id,
      title: properties?.Title?.title?.[0]?.plain_text || 'Untitled',
      slug: properties?.Slug?.rich_text?.[0]?.plain_text || '',
      thumbnail: properties?.Thumbnail?.files?.[0]?.file?.url || '',
      coverImage: page?.cover?.type === 'external' ? page?.cover?.external?.url : page?.cover?.file?.url || '',
      description: properties?.Summary?.rich_text?.[0]?.plain_text || '',
      author: properties?.Author?.people?.[0]?.name || 'Anonymous',
      tags: properties?.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
      publishedAt: properties?.['Publication Date']?.date?.start || new Date().toISOString(),
    };
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {

  const pageId = await getPageIdBySlug(slug);
  if (!pageId) {
    return null;
  }

  const page = await getPage(pageId);
  if (!page) {
    return null;
  }

  const blocks = await getBlocks(page.id);

  const { properties } = page as unknown as { properties: DatabasePageProperties };

  return {
    id: page.id,
    title: properties?.Title?.title?.[0]?.plain_text || 'Untitled',
    slug: properties?.Slug?.rich_text?.[0]?.plain_text || '',
    thumbnail: properties?.Thumbnail?.files?.[0]?.file?.url || '',
    coverImage: page?.cover?.type === 'external' ? page?.cover?.external?.url : page?.cover?.file?.url || '',
    description: properties?.Summary?.rich_text?.[0]?.plain_text || '',
    author: properties?.Author?.people?.[0]?.name || 'Anonymous',
    tags: properties?.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
    publishedAt: properties?.['Publication Date']?.date?.start || new Date().toISOString(),
    content: blocks as BlockObjectResponse[],
  };
}

export async function fetchLatestPosts(count: number = 2): Promise<BlogPost[]> {
  const pages = await getDatabase();
  if (!Array.isArray(pages)) {
    console.error('Expected pages array but got:', typeof pages);
    return [];
  }
  const posts = pages.map((page: any) => {
    const properties = page.properties;
    console.debug('Thumbnail:', properties?.Thumbnail?.files?.[0]?.file?.url);
    return {
      id: page.id,
      title: properties?.Title?.title?.[0]?.plain_text || 'Untitled',
      slug: properties?.Slug?.rich_text?.[0]?.plain_text || '',
      thumbnail: properties?.Thumbnail?.files?.[0]?.file?.url || '',
      coverImage: page?.cover?.type === 'external' ? page?.cover?.external?.url : page?.cover?.file?.url || '',
      description: properties?.Summary?.rich_text?.[0]?.plain_text || '',
      author: properties?.Author?.people?.[0]?.name || 'Anonymous',
      tags: properties?.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
      publishedAt: properties?.['Publication Date']?.date?.start || new Date().toISOString(),
    };
  });

  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}