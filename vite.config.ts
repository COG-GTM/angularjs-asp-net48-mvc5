import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The ASP.NET MVC host serves the build output from the `~/Content/app/browser`
// virtual path, so asset URLs are emitted with that prefix and the entry files
// use fixed names that `Views/Landing/Index.cshtml` references directly.
export default defineConfig({
  plugins: [react()],
  base: '/Content/app/browser/',
  build: {
    outDir: 'Content/app/browser',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((name) => name.endsWith('.css'))
            ? 'styles.css'
            : 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    port: 4200,
  },
});
