import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  /* 빌드 결과물은 검사 제외 */
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended, // JavaScript 기본 규칙
      tseslint.configs.recommended, // TypeScript 규칙
      reactHooks.configs.flat.recommended, // Hook 규칙 + React Compiler 규칙
      reactRefresh.configs.vite, // Fast Refresh가 동작하도록 컴포넌트 파일에서는 컴포넌트만 export
    ],
    languageOptions: {
      globals: globals.browser, // window, document 등 브라우저 전역 변수 인식
    },
  },

  /* shadcn 컴포넌트는 variants 등을 함께 export하므로 Fast Refresh 규칙 제외 */
  {
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/registry/**/*.{ts,tsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },

  /* shadcn 공식 코드는 수정하지 않으므로, effect 내 setState 규칙 제외 (Carousel 등, 직접 작성하는 demo 파일은 규칙 유지) */
  {
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/registry/**/*.{ts,tsx}'],
    ignores: ['src/registry/**/*.demo.tsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
]);
