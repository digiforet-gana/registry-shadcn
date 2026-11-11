import type { Playground } from './playground';

/*
 * src/registry/<name>/<name>.demo.tsx 파일을 컴포넌트 이름으로 매핑
 * 데모 파일이 playground.ts를 import하므로, 순환 참조를 피하기 위해 별도 파일로 분리
 * 데모마다 의존성(recharts 등)이 무거우므로 eager 대신 컴포넌트별 청크로 분리해 필요할 때만 불러옴
 */
const demoLoaders: Record<string, () => Promise<{ default: Playground }>> = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: Playground }>('/src/registry/*/*.demo.tsx')).map(([path, load]) => [
    path.split('/').at(-2),
    load,
  ]),
);

/* use()에 같은 Promise를 전달해야 하므로 컴포넌트별로 캐시 */
const cache = new Map<string, Promise<Playground | undefined>>();

export const loadPlayground = (name: string): Promise<Playground | undefined> => {
  let promise = cache.get(name);

  if (!promise) {
    const load = demoLoaders[name];
    promise = load ? load().then((module) => module.default) : Promise.resolve(undefined);
    cache.set(name, promise);
  }

  return promise;
};
