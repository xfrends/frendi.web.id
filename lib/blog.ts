import { BlogPost, BlogPostDetail } from '@/types/blog';
import { getBlocks, getPage, getDataSource } from './notion';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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
    type: 'people';
    people: Array<{
      name: string;
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

interface DatabasePage extends Omit<PageObjectResponse, 'properties'> {
  properties: DatabasePageProperties & Record<string, unknown>;
}

const normalizeSlug = (slug?: string) => slug?.trim().toLowerCase() ?? '';

const formatNotionPageId = (value?: string) => {
  if (!value) return '';
  const compact = value.replace(/-/g, '');
  if (!/^[0-9a-f]{32}$/i.test(compact)) {
    return '';
  }
  return `${compact.slice(0, 8)}-${compact.slice(8, 12)}-${compact.slice(12, 16)}-${compact.slice(16, 20)}-${compact.slice(20)}`;
};

export async function getAllPosts(): Promise<BlogPost[]> {
  const pages = await getDataSource();

  if (!Array.isArray(pages)) {
    console.error('Expected pages array but got:', typeof pages);
    return [];
  }

  return pages.map((page: any) => {
    const properties = page.properties;
    return {
      id: page.id,
      title: properties?.Title?.title?.[0]?.plain_text || 'Untitled',
      slug: normalizeSlug(properties?.Slug?.rich_text?.[0]?.plain_text),
      thumbnail: properties?.Thumbnail?.files?.[0]?.file?.url || '',
      coverImage: page?.cover?.type === 'external' ? page?.cover?.external?.url : page?.cover?.file?.url || '',
      description: properties?.Summary?.rich_text?.[0]?.plain_text || '',
      author: properties?.Author?.people?.[0]?.name || 'Anonymous',
      tags: properties?.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
      publishedAt: properties?.['Publication Date']?.date?.start || new Date().toISOString(),
    };
  });
}

export async function getPostDetail(identifier: string): Promise<BlogPostDetail | null> {
  const candidateId = formatNotionPageId(identifier);
  const normalizedSlug = normalizeSlug(identifier);

  let page: PageObjectResponse | null = null;

  if (candidateId) {
    try {
      page = await getPage(candidateId) as PageObjectResponse;
    } catch (error) {
      console.warn(`Failed to fetch page by id ${candidateId}:`, error);
    }
  }

  if (!page) {
    const pages = await getDataSource();

    if (!Array.isArray(pages)) {
      console.error('Expected pages array but got:', typeof pages);
      return null;
    }

    const matchedPage = pages.find((candidate: any) => {
      const pageSlug = normalizeSlug(candidate?.properties?.Slug?.rich_text?.[0]?.plain_text);
      if (candidateId && candidate?.id === candidateId) {
        return true;
      }
      return normalizedSlug && pageSlug === normalizedSlug;
    });

    if (!matchedPage) {
      console.warn(`No blog post found for identifier: ${identifier}`);
      return null;
    }

    page = await getPage(matchedPage.id) as PageObjectResponse;
  }

  const pageId = page.id;
  const blocks = await getBlocks(pageId);
  if (!Array.isArray(blocks)) {
    console.error('Expected blocks array but got:', typeof blocks);
    return null;
  }

  const { properties } = page as unknown as { properties: DatabasePageProperties };

  return {
    id: pageId,
    title: properties?.Title?.title?.[0]?.plain_text || 'Untitled',
    slug: properties?.Slug?.rich_text?.[0]?.plain_text || '',
    thumbnail: properties?.Thumbnail?.files?.[0]?.file?.url || '',
    coverImage: (() => {
      const pageCover = page.cover;
      if (!pageCover) return '';
      if (pageCover.type === 'external') {
        return pageCover.external.url;
      }
      if (pageCover.type === 'file') {
        return pageCover.file.url;
      }
      return '';
    })(),
    description: properties?.Summary?.rich_text?.[0]?.plain_text || '',
    author: properties?.Author?.people?.[0]?.name || 'Anonymous',
    tags: properties?.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
    publishedAt: properties?.['Publication Date']?.date?.start || new Date().toISOString(),
    content: blocks as BlockObjectResponse[],
  };
}

export async function fetchLatestPosts(count: number = 2): Promise<BlogPost[]> {
  const pages = await getDataSource();
  if (!Array.isArray(pages)) {
    console.error('Expected pages array but got:', typeof pages);
    return [];
  }
  const posts = pages.map((page: any) => {
    const properties = page.properties;
    return {
      id: page.id,
      title: properties?.Title?.title?.[0]?.plain_text || 'Untitled',
      slug: normalizeSlug(properties?.Slug?.rich_text?.[0]?.plain_text),
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

export async function getBlogStaticParams(): Promise<Array<{ slug: string }>> {
  const pages = await getDataSource();

  if (!Array.isArray(pages)) {
    console.error('Expected pages array but got:', typeof pages);
    return [];
  }

  return pages
    .map((page: { id?: string }) => page?.id)
    .filter((id): id is string => Boolean(id))
    .map((id) => ({ slug: id }));
}
