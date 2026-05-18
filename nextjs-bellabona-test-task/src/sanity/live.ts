import { defineLive } from 'next-sanity/live';

import { client } from './client';

export const { sanityFetch } = defineLive({
  client,
  serverToken: process.env.SANITY_VIEWER_TOKEN,
  browserToken: process.env.SANITY_VIEWER_TOKEN,
});
