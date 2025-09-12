import { Client } from '@notionhq/client';
import { cache } from 'react';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY environment variable');
}

if (!process.env.NOTION_BLOG_DATABASE_ID) {
  throw new Error('Missing NOTION_BLOG_DATABASE_ID environment variable');
}

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY as string,
});

const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;

export const getDatabase = cache(async () => {
  try {

    const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2021-08-16',
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Post Status',
          select: {
            equals: 'Publish'
          }
        },
        sorts: [
          {
            property: 'Publication Date',
            direction: 'descending'
          }
        ]
      })
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error querying database:', error);
    return [];
  }
});

export const getPage = cache(async (pageId: string) => {
  try {
    const page = await notionClient.pages.retrieve({
      page_id: pageId,
    });
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
});

export const getBlocks = cache(async (blockId: string) => {
  try {
    const { results } = await notionClient.blocks.children.list({
      block_id: blockId,
    });
    return results;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
});

export const getPageIdBySlug = cache(async (slug: string) => {
  const pages = await getDatabase();
  if (!Array.isArray(pages)) {
    console.error('Expected pages array but got:', typeof pages);
    return null;
  }
  const page = pages.find((p: any) => {
    return p.properties?.Slug?.rich_text?.[0]?.plain_text === slug;
  });
  if (!page) {
    return null;
  }
  return page.id;
});