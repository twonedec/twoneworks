import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const labCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    categoryBadge: z.string().optional().default("AI PROMPT"),
    tips: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  })
});

export const collections = {
  'lab': labCollection,
};
