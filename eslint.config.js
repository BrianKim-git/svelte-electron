import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'

export default tseslint.config(
  // ── Ignore ──────────────────────────────────────────────────────────────
  {
    ignores: ['out/**', '.svelte-kit/**', 'node_modules/**'],
  },

  // ── Base ─────────────────────────────────────────────────────────────────
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // TypeScript 파일에서 no-undef 비활성화
  // (TypeScript 자체가 undefined 참조를 검사하므로 중복 + 전역 타입 오감지 발생)
  {
    files: ['**/*.ts', '**/*.svelte'],
    rules: {
      'no-undef': 'off',
    },
  },

  // ── Electron Main + Preload  (Node.js) ───────────────────────────────────
  {
    files: ['src/main/**/*.ts', 'src/preload/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // ── Renderer: TypeScript  (Browser) ──────────────────────────────────────
  {
    files: ['src/renderer/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // ── Renderer: Svelte  (Browser) ──────────────────────────────────────────
  ...svelte.configs['flat/recommended'],
  {
    files: ['src/renderer/**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: globals.browser,
    },
    rules: {
      // SvelteKit 클라이언트 컴포넌트에서 goto() 등은 resolve() 불필요
      'svelte/no-navigation-without-resolve': 'off',
    },
  },

  // ── Config files  (Node.js) ──────────────────────────────────────────────
  {
    files: [
      'electron.vite.config.ts',
      'vite.*.config.ts',
      'svelte.config.js',
      'prisma.config.ts',
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },
)
