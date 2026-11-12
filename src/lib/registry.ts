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

/* 배포 URL로 설치하는 명령어 */
export const getInstallCommand = (name: string) => {
  const url = new URL(`${import.meta.env.BASE_URL}r/${name}.json`, window.location.origin);
  return `npx shadcn@latest add ${url.href}`;
};

/* 네임스페이스로 설치하는 명령어 */
export const getNamespaceInstallCommand = (name: string) => {
  const REGISTRY_NAMESPACE = '@digiforet';
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`;
};
