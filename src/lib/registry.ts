import registry from '../../registry.json';

export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
}

export const registryItems: RegistryItem[] = registry.items;

export const getRegistryItem = (name: string) => {
  return registryItems.find((item) => item.name === name);
};

/* 배포 위치(origin + base 경로)를 기준으로 설치 명령어 생성 */
export const getInstallCommand = (name: string) => {
  const url = new URL(`${import.meta.env.BASE_URL}r/${name}.json`, window.location.origin);

  return `npx shadcn@latest add ${url.href}`;
};
