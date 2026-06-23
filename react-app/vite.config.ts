import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mirror the Angular dev server port (ng serve -> 4200) so the React port
// can be run side-by-side on a different port for visual comparison.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4300,
  },
});
