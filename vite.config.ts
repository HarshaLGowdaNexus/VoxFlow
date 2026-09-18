import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig(() => {
  return {
    base: './', // important for electron production build
    plugins: [
      react(), 
      tailwindcss(),
      electron([
        {
          entry: 'electron/main.ts',
          vite: {
            build: {
              rollupOptions: {
                external: (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\\') && !id.startsWith('\0')
              }
            }
          }
        },
        {
          entry: 'electron/preload.ts',
          onstart(options) {
            options.reload();
          },
          vite: {
            build: {
              rollupOptions: {
                external: (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\\') && !id.startsWith('\0')
              }
            }
          }
        }
      ]),
      renderer()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
