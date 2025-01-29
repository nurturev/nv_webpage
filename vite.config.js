import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        privacy_policy: path.resolve(__dirname, 'privacy-policy.html'),
      }
    }
  },
  server: {
    port: 3000, // Set your desired port
    open: true, // Automatically open the browser
  }})