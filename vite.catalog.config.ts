import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'catalog',
  build: {
    outDir: resolve(__dirname, 'catalog-dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src') + '/',
      'admin-ui': resolve(__dirname, 'src/index.ts'),
    },
  },
});
