import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'out/renderer',
      assets: 'out/renderer',
      fallback: 'index.html',
      precompress: false,
      strict: false,
    }),
    files: {
      routes: 'src/renderer/routes',
      appTemplate: 'src/renderer/app.html',
      lib: 'src/renderer/lib',
      assets: 'src/renderer/static',
    },
    alias: {
      $lib: 'src/renderer/lib',
      $components: 'src/renderer/lib/components',
    },
    paths: {
      relative: true,
    },
  },
}
