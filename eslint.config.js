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

  // TypeScriptファイルでno-undefを無効化
  // (TypeScript自体がundefined参照をチェックするため、重複チェック＋グローバル型の誤検知が発生する)
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
      // SvelteKitのクライアントコンポーネントでgoto()などはresolve()不要
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
