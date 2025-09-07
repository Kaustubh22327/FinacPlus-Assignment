import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

const isDevelopment = process.env.NODE_ENV === 'development';
const MICROFRONTEND_URL = 'https://finac-plus-assignment-henna.vercel.app';
const REMOTE_ENTRY_URL = isDevelopment 
  ? 'http://localhost:3001/remoteEntry.js'
  : `${MICROFRONTEND_URL}/remoteEntry.js`;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'main_app',
      remotes: {
        musicLibrary: {
          type: 'module',
          name: 'musicLibrary',
          entry: REMOTE_ENTRY_URL,
          entryGlobalName: 'musicLibrary',
          shareScope: 'default'
        },
      },
      shared: {
        'react': {
          singleton: true
        },
        'react-dom': {
          singleton: true
        }
      }
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: []
    }
  },
  server: {
    port: 3000,
    cors: true,
    fs: {
      allow: ['..']
    }
  },
})