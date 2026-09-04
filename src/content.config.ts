import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(155),
      order: z.number(),
      outcome: z.string(),
      hero: image(),
      heroAlt: z.string(),
      heroCaption: z.string(),
      sources: z.array(z.string()).min(1),
      draft: z.boolean().default(false),
    }),
});

export const collections = { guides };
