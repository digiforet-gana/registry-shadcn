import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { type Plugin, defineConfig, loadEnv } from 'vite';

/*
 * 레지스트리 컴포넌트가 다른 컴포넌트를 import하는 경우
 * - 배포 파일에서는 @/components/ui 폴더 내 컴포넌트 사용
 * - 레지스트리 프로젝트에서는 src/registry 폴더 내 레지스트리 컴포넌트 사용
 */
const registryComponentResolver = (): Plugin => {
  const registryDir = path.resolve('src/registry');

  return {
    name: 'registry-component-resolver',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer || !path.resolve(importer.split('?')[0]).startsWith(registryDir + path.sep)) return null;

      /* alias 적용 전(@/...)과 적용 후(/src/...) 경로 모두 처리 */
      const name = source.match(/^(?:@|\/src)\/components\/ui\/([^/]+)$/)?.[1];
      if (!name) return null;

      const target = path.join(registryDir, name, `${name}.tsx`);

      return existsSync(target) ? target : null;
    },
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  /* 배포 경로 */
  base: loadEnv(mode, process.cwd(), '').BASE_PATH || '/',

  plugins: [registryComponentResolver(), react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],

  /* 경로 별칭 설정 */
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },

  server: {
    /* 로컬에서 IP 주소로 접속 가능하도록 설정 */
    host: '0.0.0.0',
  },
}));
