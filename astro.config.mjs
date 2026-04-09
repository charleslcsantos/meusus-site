import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: netlify(),
  site: 'https://meusus.com.br',
  base: '/',
  vite: {
    define: {
      'import.meta.env.PUBLIC_API_BASE_URL': JSON.stringify('https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx')
    }
  }
});