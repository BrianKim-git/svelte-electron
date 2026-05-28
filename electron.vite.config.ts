import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import type { LibraryFormats } from 'vite'

export default defineConfig(() => ({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
        },
      },
    },
  },

  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/preload/index.ts'),
        formats: ['cjs'] as LibraryFormats[],
        fileName: () => 'index.js',
      },
    },
  },

  renderer: {
    root: 'src/renderer',
    plugins: [svelte(), tailwindcss()],
    resolve: {
      alias: {
        $lib: resolve(__dirname, 'src/renderer/lib'),
        $components: resolve(__dirname, 'src/renderer/lib/components'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html'),
        },
      },
    },
  },
}))
