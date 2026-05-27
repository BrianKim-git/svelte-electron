import { defineConfig } from 'electron-vite'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { build as viteBuild } from 'vite'
import type { Plugin } from 'vite'

function buildRendererPlugin(): Plugin {
  let built = false
  return {
    name: 'build-renderer',
    apply: 'build',
    async buildStart() {
      if (built) return
      built = true
      await viteBuild({ configFile: 'vite.config.ts' })
    }
  }
}

export default defineConfig(({ command }) => ({
  main: {
    build: { externalizeDeps: true },
    plugins: command === 'build' ? [buildRendererPlugin()] : []
  },
  preload: {
    build: { externalizeDeps: true }
  },
  // build 시 renderer 는 buildRendererPlugin 이 처리
  ...(command === 'serve' && {
    renderer: {
      plugins: [sveltekit(), tailwindcss()]
    }
  })
}))
