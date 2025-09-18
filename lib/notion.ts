import { Client } from '@notionhq/client';
import { cache } from 'react';

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

export const getDataSource = cache(async () => {
  try {
    const response = await notionClient.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        or: [
          {
            property: 'Post Status',
            select: {
              equals: 'Publish'
            }
          }
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
})

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
