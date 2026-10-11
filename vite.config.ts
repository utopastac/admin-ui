/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test/**', 'src/**/*.test.{ts,tsx}', 'src/index.ts'],
      thresholds: {
        lines: 70,
        functions: 70,
      },
    },
  },
  plugins: [
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
    }),
    {
      name: 'copy-llms-txt',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'llms.txt'),
          resolve(__dirname, 'dist/llms.txt'),
        );
      },
    },
  ],
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src') + '/',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
