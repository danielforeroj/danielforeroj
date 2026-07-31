/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// vite-react-ssg reads this config too. Every route in routes.tsx is
// prerendered to real HTML, then hydrated on the client.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  ssgOptions: {
    // flat: /blog becomes blog.html rather than blog/index.html, which is the
    // shape Vercel's cleanUrls maps back to the extensionless URL.
    dirStyle: 'flat',
    formatting: 'none',
    // Critical-CSS inlining is unnecessary here (styles come from the Tailwind
    // CDN plus two small stylesheets) and it rewrites the head we just built.
    beastiesOptions: false,
  },
});
