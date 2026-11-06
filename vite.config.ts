import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  /* 배포 경로 */
  base: loadEnv(mode, process.cwd(), '').BASE_PATH || '/',

  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],

  /* 경로 별칭 설정 */
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },

  server: {
    /* 로컬에서 IP 주소로 접속 가능하도록 설정 */
    host: '0.0.0.0',
  },
}));
