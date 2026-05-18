import { createDataAttribute } from 'next-sanity';

export function getSanityData(id?: string, type?: string) {
  if (!id || !type) {
    return () => undefined;
  }

  return createDataAttribute({
    id,
    type,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  });
}
