// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://twoneworks.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  redirects: {
    '/1': '/lab/01-blog-keyword-volume/',
    '/2': '/lab/02-blog-keyword-recency/',
    '/3': '/lab/03-blog-adpost-highcpc/',
    '/lab/01': '/lab/01-blog-keyword-volume/',
    '/lab/02': '/lab/02-blog-keyword-recency/',
    '/lab/03': '/lab/03-blog-adpost-highcpc/',
  },
});
