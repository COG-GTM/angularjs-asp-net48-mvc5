import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The ASP.NET MVC view (Views/Landing/Index.cshtml) references the built assets
// with fixed, unhashed names:
//   <link rel="stylesheet" href="~/Content/app/browser/styles.css" />
//   <script src="~/Content/app/browser/main.js"></script>
// To preserve how the SPA is served by MVC, the React build emits `main.js` and
// `styles.css` (no content hash) into `Content/app/browser/`, exactly like the
// previous Angular CLI build did.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // During `vite build` the assets are served by ASP.NET from /Content/app/browser/.
  // During `vite dev` serve from root for easy local verification.
  base: command === 'build' ? '/Content/app/browser/' : '/',
  build: {
    outDir: '../Content/app/browser',
    emptyOutDir: true,
    // Emit a self-contained IIFE bundle so the MVC view can load it with a plain
    // classic <script src="...main.js"> tag (no type="module"), preserving how
    // ASP.NET served the previous Angular bundle.
    modulePreload: false,
    // Keep CSS in a separate styles.css asset (instead of inlining it into the
    // JS bundle) so the MVC view's <link href=".../styles.css"> resolves, the
    // same way the Angular build emitted Content/app/browser/styles.css.
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'main.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  server: {
    port: 51267,
    host: true,
  },
}));
