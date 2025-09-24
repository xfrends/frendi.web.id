import { BlogPost, BlogPostDetail } from '@/types/blog';

const BLOG_API_URL = process.env.BLOG_API_URL ?? 'https://api.frendi.web.id/blogs.php';
const BLOG_API_KEY = process.env.BLOG_API_KEY ?? process.env.NEXT_PUBLIC_BLOG_API_KEY;
const DEFAULT_LIST_LIMIT = 20;

const ensureBlogApiKey = () => {
  if (!BLOG_API_KEY) {
    throw new Error('Missing BLOG_API_KEY environment variable');
  }
  return BLOG_API_KEY;
};

type BlogListItemResponse = {
  slug: string;
  title: string;
  thumbnail?: string | null;
  published_at?: string | null;
  meta_desc?: string | null;
  author_name?: string | null;
};

type BlogListResponse = {
  total_rows: number;
  total_pages: number;
  page: number;
  limit: number;
  data: BlogListItemResponse[];
};

type BlogDetailResponse = {
  title: string;
  slug: string;
  thumbnail?: string | null;
  cover?: string | null;
  user_id?: number | null;
  body: string;
  meta_title?: string | null;
  meta_desc?: string | null;
  published_at?: string | null;
  author_name?: string | null;
  author_email?: string | null;
};

type BlogApiErrorResponse = {
  error?: string;
};

const parseDate = (value?: string | null) => {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
};

const mapListItemToBlogPost = (item: BlogListItemResponse): BlogPost => {
  const normalizedSlug = item.slug?.trim().toLowerCase() ?? '';

  return {
    id: normalizedSlug,
    slug: normalizedSlug,
    title: item.title ?? 'Untitled',
    thumbnail: item.thumbnail ?? undefined,
    coverImage: undefined,
    description: item.meta_desc ?? '',
    author: item.author_name ?? 'Anonymous',
    tags: [],
    publishedAt: parseDate(item.published_at ?? undefined),
  };
};

const buildBlogApiUrl = (params?: { slug?: string; page?: number; limit?: number }) => {
  const url = new URL(BLOG_API_URL);
  if (params?.slug) {
    url.searchParams.set('slug', params.slug);
  }
  if (params?.page) {
    url.searchParams.set('page', params.page.toString());
  }
  if (params?.limit) {
    url.searchParams.set('limit', params.limit.toString());
  }
  return url;
};

const fetchFromBlogApi = async <T>(input: string | URL, options?: { cacheTags?: string[]; allowNotFound?: boolean }) => {
  const apiKey = ensureBlogApiKey();
  const response = await fetch(typeof input === 'string' ? input : input.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
    next: {
      revalidate: 60 * 10,
      tags: options?.cacheTags ?? ['blog:data'],
    },
  });

  if (response.status === 404 && options?.allowNotFound) {
    return null;
  }

  if (!response.ok) {
    let message = `Blog API request failed with status ${response.status}`;
    try {
      const payload = (await response.json()) as BlogApiErrorResponse;
      if (payload?.error) {
        message = payload.error;
      }
    } catch (cause) {
      console.warn('Failed to parse blog API error payload', cause);
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
};

const fetchBlogListPage = async ({ page = 1, limit = DEFAULT_LIST_LIMIT }: { page?: number; limit?: number } = {}) => {
  try {
    const url = buildBlogApiUrl({ page, limit });
    const payload = await fetchFromBlogApi<BlogListResponse>(url, {
      cacheTags: ['blog:list', `blog:list:${page}`, `blog:list:${page}:${limit}`],
    });

    const items = Array.isArray(payload?.data) ? payload.data.map(mapListItemToBlogPost) : [];

    return {
      items,
      pagination: {
        totalRows: payload?.total_rows ?? items.length,
        totalPages: payload?.total_pages ?? 1,
        page: payload?.page ?? page,
        limit: payload?.limit ?? limit,
      },
    };
  } catch (error) {
    console.error('Failed to fetch blog list:', error);
    return {
      items: [] as BlogPost[],
      pagination: {
        totalRows: 0,
        totalPages: 0,
        page,
        limit,
      },
    };
  }
};

export async function getAllPosts(options?: { page?: number; limit?: number }): Promise<BlogPost[]> {
  const { items } = await fetchBlogListPage(options);
  return items;
}

export async function getPostDetail(identifier: string): Promise<BlogPostDetail | null> {
  const slug = identifier?.trim().toLowerCase();

  if (!slug) {
    return null;
  }

  try {
    const url = buildBlogApiUrl({ slug });
    const data = await fetchFromBlogApi<BlogDetailResponse | null>(url, {
      cacheTags: ['blog:detail', `blog:detail:${slug}`],
      allowNotFound: true,
    });

    if (!data || !data.slug) {
      return null;
    }

    return {
      id: data.slug,
      slug: data.slug,
      title: data.title ?? 'Untitled',
      thumbnail: data.thumbnail ?? undefined,
      coverImage: data.cover ?? undefined,
      description: data.meta_desc ?? '',
      author: data.author_name ?? 'Anonymous',
      tags: [],
      publishedAt: parseDate(data.published_at ?? undefined),
      content: data.body ?? '',
      metaTitle: data.meta_title ?? undefined,
      metaDescription: data.meta_desc ?? undefined,
      authorEmail: data.author_email ?? undefined,
    };
  } catch (error) {
    console.error(`Failed to fetch blog post detail for slug ${slug}:`, error);
    return null;
  }
}

export async function fetchLatestPosts(count: number = 2): Promise<BlogPost[]> {
  const { items } = await fetchBlogListPage({ page: 1, limit: count });
  return items.slice(0, count);
}

export async function getBlogStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = new Set<string>();
  let page = 1;
  const limit = DEFAULT_LIST_LIMIT;

  while (true) {
    const { items, pagination } = await fetchBlogListPage({ page, limit });
    items.forEach((post) => {
      if (post.slug) {
        slugs.add(post.slug);
      }
    });

    if (pagination.totalPages <= page || pagination.totalPages === 0) {
      break;
    }

    page += 1;
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}
