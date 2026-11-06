import type { Playground } from './playground';

/*
 * src/registry/<name>/<name>.demo.tsx 파일을 모두 불러와 컴포넌트 이름으로 매핑
 * 데모 파일이 playground.ts를 import하므로, 순환 참조를 피하기 위해 별도 파일로 분리
 */
const demoModules = import.meta.glob<{ default: Playground }>('/src/registry/*/*.demo.tsx', { eager: true });

const playgrounds = Object.fromEntries(
  Object.entries(demoModules).map(([path, module]) => [path.split('/').at(-2), module.default]),
);

export const getPlayground = (name: string): Playground | undefined => playgrounds[name];
