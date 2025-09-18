import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY environment variable');
}

if (!process.env.NOTION_BLOG_DATA_SOURCE_ID) {
  throw new Error('Missing NOTION_BLOG_DATA_SOURCE_ID environment variable');
}

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY as string,
});

const dataSourceId = process.env.NOTION_BLOG_DATA_SOURCE_ID as string;

export const getDataSource = unstable_cache(
  async () => {
    try {
      const response = await notionClient.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
          or: [
            {
              property: 'Post Status',
              select: {
                equals: 'Publish',
              },
            },
          ],
        },
        sorts: [
          {
            property: 'Publication Date',
            direction: 'descending',
          },
        ],
      });
      return response.results;
    } catch (error) {
      console.error('Error querying database:', error);
      return [];
    }
  },
  ['notion:getDataSource'],
  { revalidate: 60 * 60 * 24, tags: ['notion:dataSource'] }
);

const cachedGetPage = unstable_cache(
  async (pageId: string) => {
    try {
      const page = await notionClient.pages.retrieve({
        page_id: pageId,
      });
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },
  ['notion:getPage'],
  { revalidate: 60 * 60 * 24, tags: ['notion:page'] }
);

export const getPage = async (pageId: string) => cachedGetPage(pageId);

const cachedGetBlocks = unstable_cache(
  async (blockId: string) => {
    try {
      const { results } = await notionClient.blocks.children.list({
        block_id: blockId,
      });
      return results;
    } catch (error) {
      console.error('Error fetching blocks:', error);
      throw error;
    }
  },
  ['notion:getBlocks'],
  { revalidate: 60 * 60 * 24, tags: ['notion:blocks'] }
);

export const getBlocks = async (blockId: string) => cachedGetBlocks(blockId);
