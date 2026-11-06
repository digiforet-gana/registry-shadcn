import { useState } from 'react';
import { useParams } from 'react-router';
import { PlaygroundControls } from '@/components/playground/PlaygroundControls';
import { getPlayground } from '@/lib/demos';
import { type Playground, getDefaultValues, getUsageCode } from '@/lib/playground';
import { type RegistryItem, getInstallCommand, getRegistryItem } from '@/lib/registry';
import NotFoundPage from './NotFound';

const ComponentPage = () => {
  const { name = '' } = useParams();
  const item = getRegistryItem(name);

  /* registry.json에 등록되지 않은 컴포넌트인 경우 */
  if (!item) return <NotFoundPage />;

  /* 다른 컴포넌트로 이동 시 Props 상태가 초기화되도록 key 지정 */
  return <ComponentDetail key={item.name} item={item} playground={getPlayground(item.name)} />;
};

const ComponentDetail = ({ item, playground }: { item: RegistryItem; playground?: Playground }) => {
  const [values, setValues] = useState(() => (playground ? getDefaultValues(playground.controls) : {}));

  const handleChangeValue = (key: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{item.title ?? item.name}</h1>
        {item.description && <p className="text-muted-foreground">{item.description}</p>}
      </section>

      {/* 미리보기 + Props 컨트롤 (플레이그라운드) */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Playground</h2>

        {playground ? (
          <div className="grid overflow-hidden rounded-lg border lg:grid-cols-[1fr_16rem]">
            <div className="flex min-h-80 items-center justify-center p-8">{playground.render(values)}</div>
            <div className="border-t p-4 lg:border-t-0 lg:border-l">
              <p className="mb-4 text-sm font-semibold">Props</p>
              <PlaygroundControls controls={playground.controls} values={values} onChange={handleChangeValue} />
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            플레이그라운드가 없습니다.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{getInstallCommand(item.name)}</code>
        </pre>
      </section>

      {playground && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            <code>{getUsageCode(playground, values)}</code>
          </pre>
        </section>
      )}
    </div>
  );
};

export default ComponentPage;
