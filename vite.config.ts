import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import vue2 from './packages/vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      exclude: ['sub/**'],
    }),
    vue2({
      include: ['sub/**/*.vue'],
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve('src') },
      { find: 'sub', replacement: resolve('sub') },
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        sub: resolve("sub/index.html"),
      }
    }
  }
})

function resolve(...paths: string[]) {
  return fileURLToPath(new URL(path.resolve(...paths), import.meta.url))
}