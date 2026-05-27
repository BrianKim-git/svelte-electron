// SvelteKit renderer 전용 빌드 config
// buildRendererPlugin(electron.vite.config.ts)이 viteBuild({ configFile }) 로 참조한다
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [sveltekit(), tailwindcss()]
}
