// Import Vite and React plugin
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export Vite configuration
export default defineConfig({
  // Use React plugin for JSX support
  plugins: [react()],
  // Server configuration
  server: {
    port: 5173, // Default Vite port
    open: false // Don't auto-open browser
  }
});