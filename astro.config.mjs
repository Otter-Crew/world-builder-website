import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://world.ottercrew.group',
  output: 'static',
  vite: {
    css: { modules: { localsConvention: 'camelCaseOnly' } },
  },
});
