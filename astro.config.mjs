// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://twoneworks.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  redirects: {
    '/1': '/lab/01-blog-keyword-volume/',
    '/lab/01': '/lab/01-blog-keyword-volume/',
  },
});
